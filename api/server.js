const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3456;
const DATA_DIR = '/var/www/healthv/api/data';

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', c => body += c);
    req.on('end', () => {
      try { resolve(JSON.parse(body)); }
      catch (e) { reject(e); }
    });
  });
}

function saveSubmission(type, data) {
  const file = path.join(DATA_DIR, `${type}.jsonl`);
  const entry = JSON.stringify({ ...data, timestamp: new Date().toISOString() });
  fs.appendFileSync(file, entry + '\n');
}

function getSubmissionCount(type) {
  const file = path.join(DATA_DIR, `${type}.jsonl`);
  if (!fs.existsSync(file)) return 0;
  return fs.readFileSync(file, 'utf8').trim().split('\n').filter(Boolean).length;
}

const server = http.createServer(async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Health check
  if (req.url === '/api/health' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'ok',
      waitlist_count: getSubmissionCount('waitlist'),
      provider_count: getSubmissionCount('provider')
    }));
    return;
  }

  if (req.method !== 'POST') {
    res.writeHead(405, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }

  try {
    const data = await parseBody(req);

    if (req.url === '/api/waitlist') {
      if (!data.email) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end('{"error":"email required"}');
        return;
      }
      saveSubmission('waitlist', {
        email: data.email,
        source: data.source || 'website'
      });
      console.log(`[waitlist] ${data.email}`);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end('{"status":"ok"}');

    } else if (req.url === '/api/provider') {
      if (!data.email) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end('{"error":"email required"}');
        return;
      }
      saveSubmission('provider', {
        name: data.name || '',
        email: data.email,
        practice: data.practice || '',
        message: data.message || ''
      });
      console.log(`[provider] ${data.name} <${data.email}>`);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end('{"status":"ok"}');

    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end('{"error":"not found"}');
    }
  } catch (err) {
    console.error('Error:', err.message);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end('{"error":"internal"}');
  }
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`HealthV API running on http://127.0.0.1:${PORT}`);
});
