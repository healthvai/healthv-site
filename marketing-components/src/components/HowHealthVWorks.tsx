import { ChevronDown } from 'lucide-react';

const STANDARD_STEPS: string[] = [
  'Patient symptom or annual visit',
  'Single complaint or routine labs',
  'One data point reviewed (TSH, LDL, HbA1c)',
  'Standard guideline applied',
  'Treat symptom with prescription',
];

const HEALTHV_STEPS: string[] = [
  'Comprehensive data integration across hundreds of biomarkers',
  'Continuous monitoring: Genetics + Labs + Wearables + Symptoms',
  'Multi-factor pattern analysis identifies root causes',
  'Personalized intervention based on YOUR genetic and biochemical profile',
  'Multiple modalities: nutrition, supplements, lifestyle, medications when needed',
];

const COMPARISON_ROWS: { dim: string; standard: string; healthv: string }[] = [
  { dim: 'Approach', standard: 'Reactive (treat what’s broken)', healthv: 'Proactive (optimize for healthspan)' },
  { dim: 'Visit length', standard: '15 minutes', healthv: '60-90 minute initial, ongoing platform' },
  { dim: 'Decision basis', standard: 'Generic guidelines', healthv: 'Genotype + phenotype matched protocols' },
  { dim: 'Treatment', standard: 'Prescription-first', healthv: 'Multi-modal: nutrition, supplements, lifestyle, medications' },
  { dim: 'Data points used', standard: '5-10 lab values', healthv: '100+ across genetics, labs, wearables, symptoms' },
  { dim: 'Between visits', standard: 'You see doctor when sick', healthv: 'Continuous data review' },
];

type Tone = 'muted' | 'brand';

interface WorkflowProps {
  title: string;
  subtitle: string;
  steps: string[];
  footer: string;
  tone: Tone;
}

function Workflow({ title, subtitle, steps, footer, tone }: WorkflowProps) {
  const headerColor = tone === 'brand' ? 'text-brand-600' : 'text-slate-600';
  const cardBorder = tone === 'brand' ? 'border-brand-200 hover:border-brand-400' : 'border-slate-200 hover:border-slate-300';
  const numberColor = tone === 'brand' ? 'text-brand-500' : 'text-slate-400';
  return (
    <div>
      <header className="mb-6">
        <h3 className={`text-xl sm:text-2xl font-bold ${headerColor}`}>{title}</h3>
        <p className="text-sm text-slate-500 italic mt-1">{subtitle}</p>
      </header>
      <ol className="flex flex-col gap-2" aria-label={`${title} workflow`}>
        {steps.map((step, i) => (
          <li key={i} className="flex flex-col items-stretch">
            <div className={`bg-white border ${cardBorder} rounded-xl px-5 py-4 shadow-sm transition-shadow hover:shadow-md`}>
              <div className="flex items-start gap-3">
                <span className={`text-sm font-bold ${numberColor} tabular-nums flex-shrink-0 leading-relaxed`}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-sm sm:text-base text-slate-800 leading-relaxed">{step}</p>
              </div>
            </div>
            {i < steps.length - 1 && (
              <div className="flex justify-center py-2" aria-hidden="true">
                <ChevronDown className="w-5 h-5 text-slate-400" />
              </div>
            )}
          </li>
        ))}
      </ol>
      <p className="text-sm font-semibold text-slate-700 mt-6 text-center px-2">{footer}</p>
    </div>
  );
}

interface ComparisonRow { dim: string; standard: string; healthv: string }
function ComparisonTable({ rows }: { rows: ComparisonRow[] }) {
  return (
    <div className="mt-16">
      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 text-center mb-8">Side-by-Side Comparison</h3>

      {/* Desktop / tablet table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <caption className="sr-only">Comparison of Standard Care versus HealthV.ai across six dimensions</caption>
          <thead>
            <tr className="border-b-2 border-slate-200">
              <th scope="col" className="text-left py-4 px-4 font-bold text-slate-700 text-sm uppercase tracking-wide w-1/4">Dimension</th>
              <th scope="col" className="text-left py-4 px-4 font-bold text-slate-600 text-sm uppercase tracking-wide">Standard Care</th>
              <th scope="col" className="text-left py-4 px-4 font-bold text-brand-600 text-sm uppercase tracking-wide">HealthV.ai</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.dim} className={i % 2 === 0 ? 'bg-slate-50' : ''}>
                <th scope="row" className="py-4 px-4 font-semibold text-slate-900 align-top">{row.dim}</th>
                <td className="py-4 px-4 text-slate-600 align-top">{row.standard}</td>
                <td className="py-4 px-4 text-slate-800 align-top">{row.healthv}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden grid grid-cols-1 gap-4">
        {rows.map((row) => (
          <div key={row.dim} className="border border-slate-200 rounded-xl p-5 bg-white shadow-sm">
            <h4 className="font-bold text-slate-900 mb-3 text-base">{row.dim}</h4>
            <div className="space-y-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Standard Care</p>
                <p className="text-sm text-slate-700 leading-relaxed">{row.standard}</p>
              </div>
              <div className="border-t border-slate-100 pt-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-brand-600 mb-1">HealthV.ai</p>
                <p className="text-sm text-slate-800 leading-relaxed">{row.healthv}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function HowHealthVWorks() {
  return (
    <section
      id="how-healthv-works"
      aria-labelledby="how-healthv-works-title"
      className="py-16 sm:py-24 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12 sm:mb-16">
          <h2 id="how-healthv-works-title" className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            How HealthV.ai Works
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            The difference between treating symptoms and optimizing for healthspan
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
          <Workflow
            title="Standard Care"
            subtitle="Reactive. Generic. Single-factor."
            steps={STANDARD_STEPS}
            footer="Result: 15-minute visit, generic care plan"
            tone="muted"
          />
          <Workflow
            title="HealthV.ai"
            subtitle="Proactive. Personalized. Multi-modal."
            steps={HEALTHV_STEPS}
            footer="Result: Optimized for your specific biology, not the average patient"
            tone="brand"
          />
        </div>

        <ComparisonTable rows={COMPARISON_ROWS} />
      </div>
    </section>
  );
}
