import React, { useState } from 'react';
import { Calculator, RotateCcw, Info } from 'lucide-react';
import * as PK from '../data/pkFormulas';
import type { PKResult } from '../data/pkFormulas';

// Light theme version

type CalcType = 'crcl' | 'halflife' | 'vd' | 'clearance' | 'loading' | 'maintenance' | 'steadystate' | 'ibw';

interface CalcOption {
  id: CalcType;
  label: string;
  description: string;
  fields: { key: string; label: string; unit: string; placeholder: string }[];
  extras?: { key: string; label: string; type: 'checkbox' }[];
}

const calculators: CalcOption[] = [
  {
    id: 'crcl',
    label: 'Creatinine Clearance (CrCl)',
    description: 'Cockcroft-Gault equation — estimates renal function for drug dosing',
    fields: [
      { key: 'age', label: 'Age', unit: 'years', placeholder: '65' },
      { key: 'weight', label: 'Weight', unit: 'kg', placeholder: '70' },
      { key: 'scr', label: 'Serum Creatinine', unit: 'mg/dL', placeholder: '1.2' },
    ],
    extras: [{ key: 'female', label: 'Female patient (× 0.85)', type: 'checkbox' }],
  },
  {
    id: 'halflife',
    label: 'Half-Life ↔ ke',
    description: 'Convert between elimination half-life and rate constant',
    fields: [
      { key: 'value', label: 'Known Value', unit: 'hr or hr⁻¹', placeholder: '6' },
    ],
    extras: [{ key: 'fromKe', label: 'Input is ke (calculate t½)', type: 'checkbox' }],
  },
  {
    id: 'vd',
    label: 'Volume of Distribution (Vd)',
    description: 'Apparent volume relating dose to plasma concentration',
    fields: [
      { key: 'dose', label: 'Dose (IV bolus)', unit: 'mg', placeholder: '500' },
      { key: 'c0', label: 'Initial Plasma Conc (C₀)', unit: 'mg/L', placeholder: '10' },
    ],
  },
  {
    id: 'clearance',
    label: 'Total Body Clearance',
    description: 'From Dose/AUC or ke × Vd',
    fields: [
      { key: 'dose', label: 'Dose', unit: 'mg', placeholder: '500' },
      { key: 'auc', label: 'AUC', unit: 'mg·hr/L', placeholder: '50' },
    ],
  },
  {
    id: 'loading',
    label: 'Loading Dose',
    description: 'Dose to immediately reach target concentration',
    fields: [
      { key: 'target', label: 'Target Css', unit: 'mg/L', placeholder: '15' },
      { key: 'vd', label: 'Vd', unit: 'L', placeholder: '35' },
      { key: 'f', label: 'Bioavailability (F)', unit: '0-1', placeholder: '1' },
    ],
  },
  {
    id: 'maintenance',
    label: 'Maintenance Dose',
    description: 'Dose to maintain steady-state concentration',
    fields: [
      { key: 'target', label: 'Target Css', unit: 'mg/L', placeholder: '15' },
      { key: 'cl', label: 'Clearance', unit: 'L/hr', placeholder: '5' },
      { key: 'tau', label: 'Dosing Interval (τ)', unit: 'hours', placeholder: '8' },
      { key: 'f', label: 'Bioavailability (F)', unit: '0-1', placeholder: '1' },
    ],
  },
  {
    id: 'steadystate',
    label: 'Steady-State Concentration',
    description: 'Average Css from dose, clearance, and interval',
    fields: [
      { key: 'dose', label: 'Dose', unit: 'mg', placeholder: '500' },
      { key: 'f', label: 'Bioavailability (F)', unit: '0-1', placeholder: '0.85' },
      { key: 'cl', label: 'Clearance', unit: 'L/hr', placeholder: '5' },
      { key: 'tau', label: 'Dosing Interval (τ)', unit: 'hours', placeholder: '12' },
    ],
  },
  {
    id: 'ibw',
    label: 'Ideal Body Weight (IBW)',
    description: 'Devine formula — used for aminoglycoside and vancomycin dosing',
    fields: [
      { key: 'height', label: 'Height', unit: 'cm', placeholder: '170' },
    ],
    extras: [{ key: 'female', label: 'Female patient', type: 'checkbox' }],
  },
];

export function PKCalculator() {
  const [selectedCalc, setSelectedCalc] = useState<CalcType>('crcl');
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const [results, setResults] = useState<PKResult[]>([]);

  const calc = calculators.find((c) => c.id === selectedCalc)!;

  const handleReset = () => {
    setInputs({});
    setChecks({});
    setResults([]);
  };

  const handleCalculate = () => {
    const v = (key: string) => parseFloat(inputs[key] || '0');
    const newResults: PKResult[] = [];

    switch (selectedCalc) {
      case 'crcl': {
        const crcl = PK.calculateCrCl(v('age'), v('weight'), v('scr'), !!checks['female']);
        newResults.push(crcl);
        // Also show IBW if weight seems high
        break;
      }
      case 'halflife': {
        if (checks['fromKe']) {
          newResults.push(PK.calculateHalfLife(v('value')));
        } else {
          newResults.push(PK.calculateKe(v('value')));
          newResults.push(PK.timeToSteadyState(v('value'), 0.9));
          newResults.push(PK.timeToSteadyState(v('value'), 0.97));
        }
        break;
      }
      case 'vd': {
        newResults.push(PK.calculateVd(v('dose'), v('c0')));
        break;
      }
      case 'clearance': {
        newResults.push(PK.calculateClearance(v('dose'), v('auc')));
        break;
      }
      case 'loading': {
        const f = v('f') || 1;
        newResults.push(PK.calculateLoadingDose(v('target'), v('vd'), f));
        break;
      }
      case 'maintenance': {
        const f = v('f') || 1;
        newResults.push(PK.calculateMaintenanceDose(v('target'), v('cl'), v('tau'), f));
        break;
      }
      case 'steadystate': {
        newResults.push(PK.calculateSteadyState(v('dose'), v('f') || 1, v('cl'), v('tau')));
        break;
      }
      case 'ibw': {
        const ibw = PK.calculateIBW(v('height'), !!checks['female']);
        newResults.push(ibw);
        break;
      }
    }

    setResults(newResults);
  };

  return (
    <div className="space-y-6">
      {/* Calculator Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {calculators.map((c) => (
          <button
            key={c.id}
            onClick={() => { setSelectedCalc(c.id); handleReset(); }}
            className={`text-left p-3 rounded-xl border transition-all ${
              selectedCalc === c.id
                ? 'bg-blue text-white border-blue shadow-sm'
                : 'bg-white border-gray-200 text-gray-500 hover:border-blue-200'
            }`}
          >
            <div className="text-sm font-medium">{c.label}</div>
          </button>
        ))}
      </div>

      {/* Calculator Card */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-dark flex items-center gap-2">
              <Calculator size={18} className="text-blue" />
              {calc.label}
            </h3>
            <p className="text-sm text-gray-500 mt-0.5">{calc.description}</p>
          </div>
          <button onClick={handleReset} className="btn-secondary text-sm !px-3 !py-2 flex items-center gap-1.5" aria-label="Reset calculator">
            <RotateCcw size={14} /> Reset
          </button>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {calc.fields.map((field) => (
            <div key={field.key}>
              <label className="block text-sm text-gray-500 mb-1.5">
                {field.label} <span className="text-gray-400">({field.unit})</span>
              </label>
              <input
                type="number"
                step="any"
                value={inputs[field.key] || ''}
                onChange={(e) => setInputs({ ...inputs, [field.key]: e.target.value })}
                placeholder={field.placeholder}
                className="input-field"
              />
            </div>
          ))}
        </div>

        {/* Checkboxes */}
        {calc.extras && (
          <div className="flex flex-wrap gap-4 mb-4">
            {calc.extras.map((extra) => (
              <label key={extra.key} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!checks[extra.key]}
                  onChange={(e) => setChecks({ ...checks, [extra.key]: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-300 bg-white text-blue focus:ring-blue"
                />
                {extra.label}
              </label>
            ))}
          </div>
        )}

        <button onClick={handleCalculate} className="btn-primary w-full sm:w-auto">
          Calculate
        </button>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-3">
          {results.map((r, i) => (
            <div key={i} className="bg-navy rounded-2xl p-6 text-white">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-white">{r.label}</h4>
                <span className="text-2xl font-bold text-gold">
                  {r.value} <span className="text-sm font-normal text-white/60">{r.unit}</span>
                </span>
              </div>
              <div className="bg-white/10 rounded-lg p-3 mb-2 font-mono text-sm text-white/80">
                {r.formula}
              </div>
              <div className="flex items-start gap-2 text-sm text-white/60">
                <Info size={14} className="mt-0.5 shrink-0 text-gold" />
                <p>{r.explanation}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
