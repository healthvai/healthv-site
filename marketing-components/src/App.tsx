import { HowHealthVWorks } from './components/HowHealthVWorks';
import { IntegrationCases } from './components/IntegrationCases';

// Demo page — mounts both marketing-section components in sequence so they
// can be inspected at every viewport. Each component is independently
// importable; this page just hosts them for verification.
export function App() {
  return (
    <main>
      <HowHealthVWorks />
      <IntegrationCases />
    </main>
  );
}
