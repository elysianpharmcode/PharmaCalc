import React, { useState } from 'react';
import { BookOpen, Zap, AlertTriangle, Beaker } from 'lucide-react';

type RefTab = 'cyp' | 'highAlert' | 'equations';

const cypData = [
  {
    enzyme: 'CYP3A4',
    importance: 'Metabolizes ~50% of all drugs',
    substrates: ['Simvastatin', 'Atorvastatin', 'Cyclosporine', 'Midazolam', 'Nifedipine', 'Tacrolimus', 'Fentanyl'],
    inhibitors: ['Ketoconazole', 'Itraconazole', 'Erythromycin', 'Clarithromycin', 'Ritonavir', 'Grapefruit juice', 'Diltiazem'],
    inducers: ['Rifampin', 'Carbamazepine', 'Phenytoin', 'Phenobarbital', 'St. John\'s Wort', 'Efavirenz'],
    mnemonic: 'Inhibitors: "Grapefruit CRACK ED" — Grapefruit, Cimetidine, Ritonavir, Azole antifungals, Clarithromycin/erythromycin, Ketoconazole, Erythromycin, Diltiazem',
  },
  {
    enzyme: 'CYP2D6',
    importance: 'Metabolizes ~25% of drugs. Highly polymorphic (poor → ultra-rapid metabolizers)',
    substrates: ['Codeine → Morphine', 'Tramadol', 'Metoprolol', 'Tamoxifen → Endoxifen', 'Fluoxetine', 'Risperidone', 'Dextromethorphan'],
    inhibitors: ['Fluoxetine', 'Paroxetine', 'Bupropion', 'Quinidine', 'Terbinafine', 'Duloxetine'],
    inducers: ['Dexamethasone (weak)', 'Rifampin (minimal)'],
    mnemonic: 'Key concept: Codeine is a PRODRUG — poor metabolizers get no pain relief, ultra-rapid metabolizers get toxicity',
  },
  {
    enzyme: 'CYP2C9',
    importance: 'Metabolizes warfarin (S-enantiomer), phenytoin, NSAIDs',
    substrates: ['Warfarin (S)', 'Phenytoin', 'Losartan', 'Celecoxib', 'Glipizide', 'Ibuprofen'],
    inhibitors: ['Fluconazole', 'Amiodarone', 'Metronidazole', 'Sulfamethoxazole', 'Valproic acid'],
    inducers: ['Rifampin', 'Carbamazepine', 'Phenobarbital'],
    mnemonic: 'Warfarin + Fluconazole = classic exam question. S-warfarin is 5× more potent than R-warfarin.',
  },
  {
    enzyme: 'CYP2C19',
    importance: 'Activates clopidogrel (prodrug). Metabolizes PPIs.',
    substrates: ['Clopidogrel (prodrug)', 'Omeprazole', 'Diazepam', 'Phenytoin (minor)', 'Voriconazole'],
    inhibitors: ['Omeprazole', 'Esomeprazole', 'Fluoxetine', 'Fluvoxamine', 'Ticlopidine'],
    inducers: ['Rifampin', 'Carbamazepine'],
    mnemonic: 'Clopidogrel + Omeprazole = reduced antiplatelet effect. Use pantoprazole instead.',
  },
  {
    enzyme: 'CYP1A2',
    importance: 'Metabolizes theophylline, caffeine, clozapine',
    substrates: ['Theophylline', 'Caffeine', 'Clozapine', 'Olanzapine', 'Tizanidine', 'Melatonin'],
    inhibitors: ['Ciprofloxacin', 'Fluvoxamine', 'Cimetidine'],
    inducers: ['Smoking (PAHs)', 'Charbroiled foods', 'Rifampin', 'Omeprazole (weak)'],
    mnemonic: 'SMOKING induces CYP1A2. Patients who quit smoking may need dose reduction of clozapine/theophylline.',
  },
];

const highAlertDrugs = [
  { category: 'Anticoagulants', drugs: ['Warfarin', 'Heparin', 'Enoxaparin', 'Rivaroxaban', 'Apixaban'], risk: 'Bleeding', monitoring: 'INR (warfarin), aPTT (heparin), anti-Xa (LMWH), CBC' },
  { category: 'Insulins', drugs: ['Regular', 'NPH', 'Glargine', 'Lispro', 'Aspart'], risk: 'Hypoglycemia', monitoring: 'Blood glucose, HbA1c, signs of hypoglycemia' },
  { category: 'Opioids', drugs: ['Morphine', 'Fentanyl', 'Hydromorphone', 'Oxycodone', 'Methadone'], risk: 'Respiratory depression', monitoring: 'Respiratory rate, sedation level, pain scores' },
  { category: 'Chemotherapy', drugs: ['Methotrexate', 'Cyclophosphamide', 'Doxorubicin', 'Cisplatin'], risk: 'Myelosuppression, organ toxicity', monitoring: 'CBC, renal/hepatic function, specific organ monitoring' },
  { category: 'Narrow Therapeutic Index', drugs: ['Digoxin', 'Lithium', 'Phenytoin', 'Theophylline', 'Aminoglycosides', 'Vancomycin'], risk: 'Toxicity at slightly supratherapeutic levels', monitoring: 'Drug levels, organ function, clinical signs of toxicity' },
  { category: 'Potassium (IV)', drugs: ['KCl concentrate'], risk: 'Fatal cardiac arrhythmia', monitoring: 'K⁺ levels, ECG, infusion rate (≤10 mEq/hr peripheral, ≤20 mEq/hr central)' },
];

const keyEquations = [
  { name: 'Cockcroft-Gault', formula: 'CrCl = [(140 − age) × weight] / (72 × SCr) × 0.85 if female', use: 'Estimate renal function for drug dosing' },
  { name: 'Half-Life', formula: 't½ = 0.693 / ke', use: 'Time for 50% drug elimination' },
  { name: 'Elimination Rate Constant', formula: 'ke = 0.693 / t½', use: 'Fraction eliminated per unit time' },
  { name: 'Volume of Distribution', formula: 'Vd = Dose / C₀', use: 'Apparent volume relating dose to concentration' },
  { name: 'Clearance', formula: 'CL = Dose / AUC = ke × Vd', use: 'Volume of plasma cleared per unit time' },
  { name: 'Loading Dose', formula: 'LD = (Css × Vd) / F', use: 'Immediately achieve target concentration' },
  { name: 'Maintenance Dose', formula: 'MD = (Css × CL × τ) / F', use: 'Maintain steady-state concentration' },
  { name: 'Steady-State Concentration', formula: 'Css = (Dose × F) / (CL × τ)', use: 'Average concentration at steady state' },
  { name: 'Time to Steady State', formula: '~5 × t½ (97% of Css)', use: 'When to expect therapeutic levels' },
  { name: 'Ideal Body Weight (Male)', formula: 'IBW = 50 + 2.3 × (height in inches − 60)', use: 'Dosing basis for aminoglycosides, etc.' },
  { name: 'Ideal Body Weight (Female)', formula: 'IBW = 45.5 + 2.3 × (height in inches − 60)', use: 'Dosing basis for aminoglycosides, etc.' },
  { name: 'Adjusted Body Weight', formula: 'ABW = IBW + 0.4 × (TBW − IBW)', use: 'Obese patient dosing (>120% IBW)' },
  { name: 'Anion Gap', formula: 'AG = Na⁺ − (Cl⁻ + HCO₃⁻)', use: 'Normal: 8-12. Elevated in DKA, lactic acidosis, toxins' },
  { name: 'Corrected Phenytoin (low albumin)', formula: 'Corrected = Measured / (0.2 × albumin + 0.1)', use: 'Adjust for hypoalbuminemia' },
];

export function QuickReference() {
  const [tab, setTab] = useState<RefTab>('cyp');

  return (
    <div className="space-y-6">
      {/* Tab Selector */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setTab('cyp')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
            tab === 'cyp' ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-600/30' : 'btn-secondary'
          }`}
        >
          <Beaker size={16} /> CYP450 Enzymes
        </button>
        <button
          onClick={() => setTab('highAlert')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
            tab === 'highAlert' ? 'bg-red-600/20 text-red-400 border border-red-600/30' : 'btn-secondary'
          }`}
        >
          <AlertTriangle size={16} /> High-Alert Drugs
        </button>
        <button
          onClick={() => setTab('equations')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
            tab === 'equations' ? 'bg-blue-600/20 text-blue-400 border border-blue-600/30' : 'btn-secondary'
          }`}
        >
          <BookOpen size={16} /> Key Equations
        </button>
      </div>

      {/* CYP450 Reference */}
      {tab === 'cyp' && (
        <div className="space-y-4">
          <div className="card bg-gradient-to-br from-emerald-900/20 to-gray-900 border-emerald-800/30">
            <div className="flex items-start gap-3">
              <Zap className="text-emerald-400 mt-0.5 shrink-0" size={20} />
              <p className="text-sm text-gray-400">
                CYP450 enzymes are responsible for metabolizing most drugs. Understanding substrates, inhibitors, and inducers
                is essential for predicting drug interactions. <span className="text-emerald-400">Inhibitors ↑ substrate levels. Inducers ↓ substrate levels.</span>
              </p>
            </div>
          </div>

          {cypData.map((cyp) => (
            <div key={cyp.enzyme} className="card">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-white">{cyp.enzyme}</h3>
                <span className="text-xs text-gray-500">{cyp.importance}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <h4 className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">Substrates</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {cyp.substrates.map((s) => (
                      <span key={s} className="text-xs bg-blue-500/10 text-blue-300 px-2 py-0.5 rounded border border-blue-500/20">{s}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-2">Inhibitors (↑ levels)</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {cyp.inhibitors.map((s) => (
                      <span key={s} className="text-xs bg-red-500/10 text-red-300 px-2 py-0.5 rounded border border-red-500/20">{s}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">Inducers (↓ levels)</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {cyp.inducers.map((s) => (
                      <span key={s} className="text-xs bg-amber-500/10 text-amber-300 px-2 py-0.5 rounded border border-amber-500/20">{s}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-3 text-sm text-gray-400">
                <span className="text-emerald-400 font-medium">💡 </span>{cyp.mnemonic}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* High-Alert Drugs */}
      {tab === 'highAlert' && (
        <div className="space-y-4">
          <div className="card bg-gradient-to-br from-red-900/20 to-gray-900 border-red-800/30">
            <div className="flex items-start gap-3">
              <AlertTriangle className="text-red-400 mt-0.5 shrink-0" size={20} />
              <p className="text-sm text-gray-400">
                High-alert medications have a heightened risk of causing significant patient harm when used in error.
                These require <span className="text-red-400">extra safeguards</span> — independent double-checks, dose limits, and enhanced monitoring.
              </p>
            </div>
          </div>

          {highAlertDrugs.map((cat) => (
            <div key={cat.category} className="card">
              <h3 className="font-semibold text-white mb-3">{cat.category}</h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {cat.drugs.map((d) => (
                  <span key={d} className="text-sm bg-red-500/10 text-red-300 px-3 py-1 rounded-lg border border-red-500/20">{d}</span>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-gray-800/50 rounded-lg p-3">
                  <h4 className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-1">Primary Risk</h4>
                  <p className="text-sm text-gray-300">{cat.risk}</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-3">
                  <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">Monitoring</h4>
                  <p className="text-sm text-gray-300">{cat.monitoring}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Key Equations */}
      {tab === 'equations' && (
        <div className="space-y-4">
          <div className="card bg-gradient-to-br from-blue-900/20 to-gray-900 border-blue-800/30">
            <div className="flex items-start gap-3">
              <BookOpen className="text-blue-400 mt-0.5 shrink-0" size={20} />
              <p className="text-sm text-gray-400">
                Essential pharmacokinetic and clinical equations. These are the formulas you'll use on exams and in practice.
                Use the <span className="text-blue-400">PK Calculator</span> tab to compute these interactively.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-3 px-4 text-gray-500 font-medium">Equation</th>
                  <th className="text-left py-3 px-4 text-gray-500 font-medium">Formula</th>
                  <th className="text-left py-3 px-4 text-gray-500 font-medium">When to Use</th>
                </tr>
              </thead>
              <tbody>
                {keyEquations.map((eq, i) => (
                  <tr key={i} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                    <td className="py-3 px-4 text-white font-medium">{eq.name}</td>
                    <td className="py-3 px-4 font-mono text-emerald-400 text-xs">{eq.formula}</td>
                    <td className="py-3 px-4 text-gray-400">{eq.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
