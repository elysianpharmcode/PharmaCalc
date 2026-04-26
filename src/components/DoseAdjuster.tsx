import React, { useState } from 'react';
import { FlaskConical, AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { calculateCrCl } from '../data/pkFormulas';

interface DoseRule {
  drug: string;
  normalDose: string;
  renalAdjustments: { range: string; dose: string; note: string }[];
  hepaticNote: string;
  dialysis: string;
  keyInfo: string;
}

const doseRules: DoseRule[] = [
  {
    drug: 'Metformin',
    normalDose: '500-1000mg BID',
    renalAdjustments: [
      { range: 'eGFR ≥ 45', dose: 'No adjustment needed', note: 'Monitor renal function annually' },
      { range: 'eGFR 30-44', dose: 'Max 1000mg/day', note: 'Do not initiate; may continue with monitoring' },
      { range: 'eGFR < 30', dose: 'CONTRAINDICATED', note: 'Risk of lactic acidosis' },
    ],
    hepaticNote: 'Avoid in hepatic impairment (lactic acidosis risk due to impaired lactate clearance)',
    dialysis: 'Dialyzable. Contraindicated in dialysis patients.',
    keyInfo: 'Hold 48h before and after iodinated contrast. Restart after confirming stable renal function.',
  },
  {
    drug: 'Gabapentin',
    normalDose: '300-600mg TID',
    renalAdjustments: [
      { range: 'CrCl ≥ 60', dose: '300-600mg TID', note: 'Normal dosing' },
      { range: 'CrCl 30-59', dose: '200-300mg BID', note: 'Reduce frequency' },
      { range: 'CrCl 15-29', dose: '200-300mg daily', note: 'Once daily dosing' },
      { range: 'CrCl < 15', dose: '100-300mg daily', note: 'Significantly reduced' },
    ],
    hepaticNote: 'No hepatic adjustment needed (not hepatically metabolized)',
    dialysis: 'Supplemental dose after hemodialysis (125-350mg)',
    keyInfo: '100% renally eliminated unchanged. Dose is directly proportional to CrCl.',
  },
  {
    drug: 'Vancomycin',
    normalDose: '15-20mg/kg IV q8-12h',
    renalAdjustments: [
      { range: 'CrCl > 70', dose: '15-20mg/kg q8-12h', note: 'Target trough 15-20 mcg/mL (serious infections)' },
      { range: 'CrCl 40-70', dose: '15-20mg/kg q12-24h', note: 'Extend interval' },
      { range: 'CrCl 20-39', dose: '15-20mg/kg q24-48h', note: 'Monitor levels closely' },
      { range: 'CrCl < 20', dose: '15-20mg/kg, then re-dose by levels', note: 'Level-guided dosing essential' },
    ],
    hepaticNote: 'No hepatic adjustment needed (renally eliminated)',
    dialysis: 'Not removed by conventional HD. Removed by high-flux HD — re-dose based on levels.',
    keyInfo: 'AUC/MIC-guided dosing now preferred over trough-only monitoring. Nephrotoxicity and ototoxicity risk.',
  },
  {
    drug: 'Ciprofloxacin',
    normalDose: '250-750mg PO BID or 200-400mg IV q12h',
    renalAdjustments: [
      { range: 'CrCl > 30', dose: 'No adjustment', note: 'Normal dosing' },
      { range: 'CrCl 5-29', dose: '250-500mg q18-24h (PO)', note: 'Reduce dose or extend interval' },
    ],
    hepaticNote: 'Use with caution in severe hepatic impairment',
    dialysis: 'Partially removed by HD. Give dose after dialysis.',
    keyInfo: 'Chelation with divalent cations. Tendon rupture risk. QT prolongation.',
  },
  {
    drug: 'Lisinopril',
    normalDose: '10-40mg daily',
    renalAdjustments: [
      { range: 'CrCl > 30', dose: 'No adjustment', note: 'Start low, titrate to effect' },
      { range: 'CrCl 10-30', dose: 'Start 2.5-5mg daily', note: '50% dose reduction' },
      { range: 'CrCl < 10', dose: 'Start 2.5mg daily', note: 'Use with extreme caution' },
    ],
    hepaticNote: 'No hepatic adjustment (not hepatically metabolized)',
    dialysis: 'Removed by hemodialysis. Dose after dialysis.',
    keyInfo: 'Monitor K⁺ and SCr. Contraindicated in pregnancy. Angioedema risk.',
  },
  {
    drug: 'Amoxicillin',
    normalDose: '250-500mg TID or 875mg BID',
    renalAdjustments: [
      { range: 'CrCl > 30', dose: 'No adjustment', note: 'Normal dosing' },
      { range: 'CrCl 10-30', dose: '250-500mg q12h', note: 'Extend interval' },
      { range: 'CrCl < 10', dose: '250-500mg q24h', note: 'Once daily' },
    ],
    hepaticNote: 'No hepatic adjustment needed',
    dialysis: 'Removed by HD. Give supplemental dose after dialysis.',
    keyInfo: 'Penicillin allergy cross-reactivity. Rash with EBV/mono.',
  },
  {
    drug: 'Enoxaparin',
    normalDose: '1mg/kg SC q12h (treatment) or 40mg SC daily (prophylaxis)',
    renalAdjustments: [
      { range: 'CrCl ≥ 30', dose: 'No adjustment', note: 'Standard dosing' },
      { range: 'CrCl < 30', dose: '1mg/kg SC q24h (treatment) or 30mg SC daily (prophylaxis)', note: 'Significant accumulation risk' },
    ],
    hepaticNote: 'Use with caution (increased bleeding risk)',
    dialysis: 'Not recommended in dialysis patients. Use unfractionated heparin instead.',
    keyInfo: 'Monitor anti-Xa levels in renal impairment, obesity, and pregnancy. Not fully reversible with protamine.',
  },
  {
    drug: 'Digoxin',
    normalDose: '0.125-0.25mg daily',
    renalAdjustments: [
      { range: 'CrCl > 50', dose: '0.125-0.25mg daily', note: 'Normal dosing' },
      { range: 'CrCl 10-50', dose: '0.0625-0.125mg daily', note: 'Reduce dose, monitor levels' },
      { range: 'CrCl < 10', dose: '0.0625mg daily or every other day', note: 'High toxicity risk' },
    ],
    hepaticNote: 'No significant hepatic adjustment (primarily renal elimination)',
    dialysis: 'Not removed by HD (large Vd). No supplemental dose needed.',
    keyInfo: 'Narrow therapeutic index (0.5-2.0 ng/mL). Toxicity: visual changes, arrhythmias, GI symptoms. Hypokalemia increases toxicity.',
  },
];

export function DoseAdjuster() {
  const [selectedDrug, setSelectedDrug] = useState<string>(doseRules[0].drug);
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [scr, setScr] = useState('');
  const [isFemale, setIsFemale] = useState(false);
  const [calculatedCrCl, setCalculatedCrCl] = useState<number | null>(null);

  const rule = doseRules.find((r) => r.drug === selectedDrug)!;

  const handleCalculateCrCl = () => {
    const a = parseFloat(age);
    const w = parseFloat(weight);
    const s = parseFloat(scr);
    if (a && w && s) {
      const result = calculateCrCl(a, w, s, isFemale);
      setCalculatedCrCl(result.value);
    }
  };

  const getMatchingAdjustment = () => {
    if (calculatedCrCl === null) return null;
    // Simple heuristic matching based on the CrCl value
    for (const adj of rule.renalAdjustments) {
      const range = adj.range.toLowerCase();
      // Parse ranges like "CrCl 30-59", "eGFR ≥ 45", "CrCl < 30"
      const geMatch = range.match(/[≥>]\s*(\d+)/);
      const ltMatch = range.match(/<\s*(\d+)/);
      const rangeMatch = range.match(/(\d+)\s*[-–]\s*(\d+)/);

      if (rangeMatch) {
        const low = parseInt(rangeMatch[1]);
        const high = parseInt(rangeMatch[2]);
        if (calculatedCrCl >= low && calculatedCrCl <= high) return adj;
      } else if (geMatch && !rangeMatch) {
        if (calculatedCrCl >= parseInt(geMatch[1])) return adj;
      } else if (ltMatch && !rangeMatch) {
        if (calculatedCrCl < parseInt(ltMatch[1])) return adj;
      }
    }
    return null;
  };

  const matchedAdj = getMatchingAdjustment();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-navy rounded-2xl p-6">
        <div className="flex items-start gap-3">
          <FlaskConical className="text-gold mt-0.5 shrink-0" size={20} />
          <div>
            <h2 className="text-lg font-semibold text-white mb-1">Renal Dose Adjustment Tool</h2>
            <p className="text-sm text-white/70">
              Enter patient parameters to calculate CrCl, then see drug-specific dose adjustments.
              Select a drug to view its complete renal, hepatic, and dialysis dosing guidelines.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: CrCl Calculator */}
        <div className="card lg:col-span-1">
          <h3 className="font-semibold text-dark mb-4">Patient Parameters</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-500 mb-1">Age (years)</label>
              <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="65" className="input-field" />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Weight (kg)</label>
              <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="70" className="input-field" />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Serum Creatinine (mg/dL)</label>
              <input type="number" step="0.1" value={scr} onChange={(e) => setScr(e.target.value)} placeholder="1.2" className="input-field" />
            </div>
            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                checked={isFemale}
                onChange={(e) => setIsFemale(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 bg-white text-blue focus:ring-blue"
              />
              Female patient
            </label>
            <button onClick={handleCalculateCrCl} className="btn-primary w-full">
              Calculate CrCl
            </button>

            {calculatedCrCl !== null && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
                <p className="text-xs text-gray-500">Estimated CrCl</p>
                <p className="text-2xl font-bold text-navy">{calculatedCrCl} <span className="text-sm font-normal">mL/min</span></p>
                <p className="text-xs text-gray-400 mt-1">
                  {calculatedCrCl >= 90 ? 'Normal' : calculatedCrCl >= 60 ? 'Mild impairment' : calculatedCrCl >= 30 ? 'Moderate impairment' : calculatedCrCl >= 15 ? 'Severe impairment' : 'Kidney failure'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right: Drug Dose Info */}
        <div className="lg:col-span-2 space-y-4">
          {/* Drug Selector */}
          <div className="flex flex-wrap gap-2">
            {doseRules.map((r) => (
              <button
                key={r.drug}
                onClick={() => setSelectedDrug(r.drug)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all border ${
                  selectedDrug === r.drug
                    ? 'bg-blue text-white border-blue'
                    : 'bg-white text-gray-500 border-gray-200 hover:border-blue-200'
                }`}
              >
                {r.drug}
              </button>
            ))}
          </div>

          {/* Normal Dose */}
          <div className="card">
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Normal Dose</h4>
            <p className="text-lg text-white font-mono">{rule.normalDose}</p>
          </div>

          {/* Renal Adjustments Table */}
          <div className="card">
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Renal Dose Adjustments</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left py-2 px-3 text-gray-500 font-medium">Renal Function</th>
                    <th className="text-left py-2 px-3 text-gray-500 font-medium">Adjusted Dose</th>
                    <th className="text-left py-2 px-3 text-gray-500 font-medium">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {rule.renalAdjustments.map((adj, i) => {
                    const isMatch = matchedAdj === adj;
                    return (
                      <tr
                        key={i}
                        className={`border-b border-gray-800/50 ${isMatch ? 'bg-emerald-900/20' : ''}`}
                      >
                        <td className="py-2.5 px-3 text-gray-300 font-mono text-xs">
                          {isMatch && <CheckCircle2 size={14} className="inline mr-1.5 text-emerald-400" />}
                          {adj.range}
                        </td>
                        <td className={`py-2.5 px-3 font-medium ${adj.dose.includes('CONTRAINDICATED') ? 'text-red-400' : 'text-white'}`}>
                          {adj.dose}
                        </td>
                        <td className="py-2.5 px-3 text-gray-500">{adj.note}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Hepatic & Dialysis */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="card">
              <h4 className="text-sm font-semibold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <AlertCircle size={14} /> Hepatic Impairment
              </h4>
              <p className="text-sm text-gray-300">{rule.hepaticNote}</p>
            </div>
            <div className="card">
              <h4 className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Info size={14} /> Dialysis
              </h4>
              <p className="text-sm text-gray-300">{rule.dialysis}</p>
            </div>
          </div>

          {/* Key Info */}
          <div className="card bg-gray-800/50 border-gray-700">
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Clinical Pearl</h4>
            <p className="text-sm text-gray-300">{rule.keyInfo}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
