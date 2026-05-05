interface Case {
  title: string;
  standard: string;
  healthv: string;
  why: string;
}

// All copy is verbatim from the marketing brief. Do not paraphrase — the
// clinical claims are calibrated for legal defensibility.
const CASES: Case[] = [
  {
    title: 'Cardiovascular Risk Mosaic',
    standard: 'Statin if LDL >190, otherwise watch.',
    healthv:
      'Invitae detects LDLR (Familial Hypercholesterolemia) + 3×4 reveals APOE ε4 and SLCO1B1 statin sensitivity + NutrEval shows oxidized LDL, low CoQ10, low omega-3.',
    why: 'Aggressive LDL target <55 (FH + APOE ε4 stack). Avoid simvastatin (myopathy risk per SLCO1B1). Choose rosuvastatin + omega-3 + CoQ10 + methylated B vitamins. Standard care misses all three layers.',
  },
  {
    title: 'Treatment-Resistant Anxiety',
    standard: 'Increase your SSRI dose.',
    healthv:
      '3×4 reveals slow COMT (Met/Met) + MTHFR variant. NutrEval shows low magnesium, B6 functional deficiency, low GABA precursors, omega-6:3 ratio of 18:1.',
    why: 'Slow COMT carriers metabolize stimulants and estrogen differently. SSRIs can’t compensate for missing neurotransmitter substrates. Targeted intervention often reduces medication need.',
  },
  {
    title: 'Persistent Fatigue Despite "Normal Labs"',
    standard: 'Your TSH is normal. You’re stressed. Get more sleep.',
    healthv:
      '3×4 reveals DIO2 Thr92Ala homozygous (poor T4-to-T3 conversion). NutrEval shows mitochondrial dysfunction, low CoQ10, low carnitine, functional selenium deficiency.',
    why: '12-15% of people have DIO2 variants causing tissue-level T3 deficiency despite normal TSH. Selenium + zinc + mitochondrial support restores energy. Standard thyroid screening misses this entirely.',
  },
  {
    title: 'Cognitive Decline Prevention',
    standard: 'Normal aging. We’ll watch.',
    healthv:
      '3×4 reveals APOE ε4/ε4 (8-15x Alzheimer’s risk) + MTHFR variant. NutrEval shows low DHA, elevated homocysteine, functional folate deficiency despite folic acid supplementation.',
    why: 'APOE ε4/ε4 carriers must intervene at 50, not 65. Patient can’t process folic acid (MTHFR) — needs methylfolate. Aggressive cardiovascular optimization + DHA + methylation support measurably alters cognitive trajectory.',
  },
  {
    title: 'BRCA+ with Hormonal Symptoms',
    standard: 'Annual mammogram. We’ll watch.',
    healthv:
      'Invitae confirms BRCA1 pathogenic variant. 3×4 reveals slow COMT (impaired estrogen clearance) + CYP1B1 variant. NutrEval shows unfavorable estrogen metabolite ratios.',
    why: 'Standard surveillance schedule is wrong for BRCA1. Annual breast MRI from 25 (not 40), 6-month TVUS + CA-125 from 30. Estrogen metabolism is modifiable contributor — DIM, calcium d-glucarate, sulforaphane add measurable protection.',
  },
  {
    title: 'Pre-Diabetic Executive',
    standard: 'Lose weight. See me in 6 months. Then metformin.',
    healthv:
      '3×4 reveals TCF7L2 (2x diabetes risk) + FTO + PPARG variants. NutrEval shows low chromium, magnesium deficiency, elevated TMAO precursors, low CoQ10.',
    why: 'Genetic predisposition + cellular insulin resistance + dysbiosis = multi-modal intervention without immediate medication. Berberine + chromium + magnesium + CoQ10 + Mediterranean diet + 16:8 eating + strength training. HbA1c typically drops in 90 days.',
  },
  {
    title: 'Multi-System Inflammation',
    standard: 'GI prescribes PPI. Derm prescribes steroid cream. Psychiatrist prescribes SSRI.',
    healthv:
      '3×4 reveals high-inflammatory genotype (TNF-α, GSTM1 null), HLA-DQ2 positive (gluten susceptibility). NutrEval shows Candida overgrowth, dysbiosis, functional zinc deficiency.',
    why: 'One root cause, three "diagnoses." Antifungal + dietary intervention + targeted nutrient repletion addresses gut-brain-skin axis simultaneously. Three specialists miss what integrated testing reveals.',
  },
  {
    title: 'Cancer Surveillance Optimization',
    standard: 'Colonoscopy at 50.',
    healthv:
      'Invitae detects MSH6 variant (Lynch syndrome). 3×4 reveals GSTM1 null + GSTP1 variant (impaired Phase II detox). NutrEval shows low glutathione precursors, oxidative stress, low selenium.',
    why: 'MSH6 changes surveillance to every 2-3 years starting at 25-30, not 50. Add endoscopy every 3-5 years. Genetic detox impairment is modifiable — NAC, sulforaphane, selenium add protection on top of surveillance.',
  },
  {
    title: 'Athletic Plateau Optimization',
    standard: 'Lift less. You’re aging.',
    healthv:
      '3×4 reveals ACTN3 RR (sprint phenotype) + COL5A1 injury risk + ACE DD. NutrEval shows depleted BCAAs, low glutamine, oxidative damage, functional zinc deficiency.',
    why: 'Power phenotype demands different recovery nutrition than endurance. Oxidative debt is exceeding antioxidant capacity. Collagen variant needs structural support. Genotype-specific protocol restores performance.',
  },
  {
    title: 'Healthy Executive Baseline',
    standard: 'Everything looks fine.',
    healthv:
      'Invitae rules out major hereditary risks. 3×4 reveals slow CYP1A2 caffeine metabolism. NutrEval shows borderline-but-suboptimal vitamin D, omega-3, magnesium, mild oxidative stress.',
    why: '"Normal" ≠ "optimal." Pre-symptomatic intervention is the entire value proposition of precision longevity medicine. Slow CYP1A2 explains afternoon energy dip — cap caffeine at 200mg before 10am.',
  },
];

const DISCLAIMER =
  'These are illustrative examples of integrated data analysis at HealthV.ai. ' +
  'Individual care plans are determined through clinical evaluation by Dr. Misra ' +
  'based on each patient’s specific situation. HealthV.ai’s platform supports ' +
  'clinical decision-making; it does not replace physician judgment. Genetic testing ' +
  'is one of many tools used in personalized care.';

export function IntegrationCases() {
  return (
    <section
      id="integration-cases"
      aria-labelledby="integration-cases-title"
      className="py-16 sm:py-24 bg-slate-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12 sm:mb-16">
          <h2 id="integration-cases-title" className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            Where Integration Changes Outcomes
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            10 examples of how multi-source data analysis leads to fundamentally different — and better — clinical decisions.
          </p>
        </header>

        {/* Desktop / tablet table */}
        <div className="hidden md:block overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full border-collapse">
            <caption className="sr-only">10 case examples comparing Standard Care to HealthV.ai integration outcomes</caption>
            <thead>
              <tr className="bg-slate-100 border-b-2 border-slate-200">
                <th scope="col" className="text-left py-4 px-5 font-bold text-slate-700 text-sm uppercase tracking-wide w-[18%]">Case</th>
                <th scope="col" className="text-left py-4 px-5 font-bold text-slate-600 text-sm uppercase tracking-wide w-[22%]">Standard Care</th>
                <th scope="col" className="text-left py-4 px-5 font-bold text-brand-600 text-sm uppercase tracking-wide w-[30%]">HealthV.ai Integration</th>
                <th scope="col" className="text-left py-4 px-5 font-bold text-slate-700 text-sm uppercase tracking-wide w-[30%]">Why It Matters</th>
              </tr>
            </thead>
            <tbody>
              {CASES.map((c, i) => (
                <tr key={c.title} className={`${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'} border-t border-slate-200 align-top`}>
                  <th scope="row" className="py-5 px-5 font-bold text-brand-700 text-sm leading-snug">{c.title}</th>
                  <td className="py-5 px-5 text-slate-600 text-sm leading-relaxed italic">{c.standard}</td>
                  <td className="py-5 px-5 text-slate-800 text-sm leading-relaxed">{c.healthv}</td>
                  <td className="py-5 px-5 text-slate-700 text-sm leading-relaxed">{c.why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden grid grid-cols-1 gap-5">
          {CASES.map((c) => (
            <article
              key={c.title}
              className="border border-slate-200 rounded-xl p-5 bg-white shadow-sm"
            >
              <h3 className="font-bold text-brand-700 text-lg leading-snug mb-4">{c.title}</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Standard Care</p>
                  <p className="text-sm text-slate-700 italic leading-relaxed">{c.standard}</p>
                </div>
                <div className="border-t border-slate-100 pt-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-brand-600 mb-1">HealthV.ai Integration</p>
                  <p className="text-sm text-slate-800 leading-relaxed">{c.healthv}</p>
                </div>
                <div className="border-t border-slate-100 pt-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Why It Matters</p>
                  <p className="text-sm text-slate-700 leading-relaxed">{c.why}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Legally required disclaimer */}
        <p className="mt-10 sm:mt-12 text-xs sm:text-sm text-slate-500 leading-relaxed max-w-4xl mx-auto text-center italic">
          {DISCLAIMER}
        </p>
      </div>
    </section>
  );
}
