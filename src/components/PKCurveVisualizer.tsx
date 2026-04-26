import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingDown, Info, Sliders } from 'lucide-react';

interface CurveParams {
  dose: number;
  vd: number;
  halfLife: number;
  bioavailability: number;
  dosingInterval: number;
  numDoses: number;
  therapeuticMin: number;
  therapeuticMax: number;
}

const presets: { label: string; params: CurveParams }[] = [
  {
    label: 'Vancomycin IV',
    params: { dose: 1000, vd: 50, halfLife: 6, bioavailability: 1, dosingInterval: 12, numDoses: 8, therapeuticMin: 10, therapeuticMax: 20 },
  },
  {
    label: 'Gentamicin IV',
    params: { dose: 350, vd: 17.5, halfLife: 2.5, bioavailability: 1, dosingInterval: 8, numDoses: 10, therapeuticMin: 1, therapeuticMax: 10 },
  },
  {
    label: 'Digoxin PO',
    params: { dose: 0.25, vd: 500, halfLife: 36, bioavailability: 0.7, dosingInterval: 24, numDoses: 10, therapeuticMin: 0.0005, therapeuticMax: 0.002 },
  },
  {
    label: 'Theophylline PO',
    params: { dose: 300, vd: 35, halfLife: 8, bioavailability: 0.96, dosingInterval: 12, numDoses: 8, therapeuticMin: 5, therapeuticMax: 15 },
  },
  {
    label: 'Custom',
    params: { dose: 500, vd: 35, halfLife: 6, bioavailability: 1, dosingInterval: 8, numDoses: 8, therapeuticMin: 5, therapeuticMax: 20 },
  },
];

function generateCurveData(p: CurveParams) {
  const ke = 0.693 / p.halfLife;
  const points: { time: number; concentration: number }[] = [];
  const totalTime = p.dosingInterval * p.numDoses;
  const step = totalTime / 400;

  for (let t = 0; t <= totalTime; t += step) {
    let conc = 0;
    for (let n = 0; n < p.numDoses; n++) {
      const doseTime = n * p.dosingInterval;
      if (t >= doseTime) {
        const timeSinceDose = t - doseTime;
        const c0 = (p.dose * p.bioavailability) / p.vd;
        conc += c0 * Math.exp(-ke * timeSinceDose);
      }
    }
    points.push({ time: Math.round(t * 100) / 100, concentration: Math.round(conc * 1000) / 1000 });
  }
  return points;
}

function generateSingleDoseCurve(p: CurveParams) {
  const ke = 0.693 / p.halfLife;
  const points: { time: number; concentration: number; halfConc: number }[] = [];
  const totalTime = p.halfLife * 6;
  const step = totalTime / 200;
  const c0 = (p.dose * p.bioavailability) / p.vd;

  for (let t = 0; t <= totalTime; t += step) {
    const conc = c0 * Math.exp(-ke * t);
    points.push({
      time: Math.round(t * 100) / 100,
      concentration: Math.round(conc * 1000) / 1000,
      halfConc: Math.round((c0 / 2) * 1000) / 1000,
    });
  }
  return { points, c0: Math.round(c0 * 1000) / 1000 };
}

export function PKCurveVisualizer() {
  const [mode, setMode] = useState<'single' | 'multiple'>('multiple');
  const [selectedPreset, setSelectedPreset] = useState(0);
  const [params, setParams] = useState<CurveParams>(presets[0].params);

  const multiDoseData = useMemo(() => generateCurveData(params), [params]);
  const singleDoseResult = useMemo(() => generateSingleDoseCurve(params), [params]);

  const ke = 0.693 / params.halfLife;
  const css = (params.dose * params.bioavailability) / (params.vd * ke * params.dosingInterval) * (1 / (1 - Math.exp(-ke * params.dosingInterval))) * ke * params.dosingInterval;
  const cssAvg = (params.dose * params.bioavailability) / (params.vd * ke * params.dosingInterval);
  const timeToSS = params.halfLife * 5;

  const handlePreset = (idx: number) => {
    setSelectedPreset(idx);
    setParams(presets[idx].params);
  };

  const updateParam = (key: keyof CurveParams, value: string) => {
    const num = parseFloat(value);
    if (!isNaN(num) && num > 0) {
      setParams((prev) => ({ ...prev, [key]: num }));
      setSelectedPreset(presets.length - 1); // switch to "Custom"
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-navy rounded-2xl p-6">
        <div className="flex items-start gap-3">
          <TrendingDown className="text-gold mt-0.5 shrink-0" size={20} />
          <div>
            <h2 className="text-lg font-semibold text-white mb-1">Concentration-Time Curve Visualizer</h2>
            <p className="text-sm text-white/70">
              See how drug concentrations change over time. Visualize single-dose elimination, multi-dose accumulation,
              and how steady state is reached. Adjust parameters to see the effect in real time.
            </p>
          </div>
        </div>
      </div>

      {/* Mode Toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setMode('multiple')}
          className={mode === 'multiple' ? 'btn-primary' : 'btn-secondary'}
        >
          Multi-Dose (Steady State)
        </button>
        <button
          onClick={() => setMode('single')}
          className={mode === 'single' ? 'btn-primary' : 'btn-secondary'}
        >
          Single Dose (Elimination)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Controls */}
        <div className="card lg:col-span-1 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Sliders size={16} className="text-blue" />
            <h3 className="font-semibold text-dark text-sm">Parameters</h3>
          </div>

          {/* Presets */}
          <div>
            <label className="block text-xs text-gray-500 mb-1.5">Drug Preset</label>
            <div className="flex flex-wrap gap-1.5">
              {presets.map((p, i) => (
                <button
                  key={p.label}
                  onClick={() => handlePreset(i)}
                  className={`text-xs px-2.5 py-1 rounded-md border transition-all ${
                    selectedPreset === i
                      ? 'bg-cyan-600/20 text-cyan-400 border-cyan-600/30'
                      : 'bg-gray-800 text-gray-400 border-gray-700 hover:border-gray-600'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1">Dose (mg)</label>
            <input type="number" value={params.dose} onChange={(e) => updateParam('dose', e.target.value)} className="input-field text-sm" />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Vd (L)</label>
            <input type="number" value={params.vd} onChange={(e) => updateParam('vd', e.target.value)} className="input-field text-sm" />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Half-Life (hr)</label>
            <input type="number" value={params.halfLife} onChange={(e) => updateParam('halfLife', e.target.value)} className="input-field text-sm" />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Bioavailability (F)</label>
            <input type="number" step="0.05" value={params.bioavailability} onChange={(e) => updateParam('bioavailability', e.target.value)} className="input-field text-sm" />
          </div>
          {mode === 'multiple' && (
            <>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Dosing Interval τ (hr)</label>
                <input type="number" value={params.dosingInterval} onChange={(e) => updateParam('dosingInterval', e.target.value)} className="input-field text-sm" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Number of Doses</label>
                <input type="number" value={params.numDoses} onChange={(e) => updateParam('numDoses', e.target.value)} className="input-field text-sm" />
              </div>
            </>
          )}
        </div>

        {/* Chart */}
        <div className="card lg:col-span-3">
          <h3 className="font-semibold text-dark mb-4">
            {mode === 'multiple' ? 'Multi-Dose Concentration vs Time' : 'Single-Dose Elimination Curve'}
          </h3>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              {mode === 'multiple' ? (
                <AreaChart data={multiDoseData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                  <defs>
                    <linearGradient id="concGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis dataKey="time" stroke="#6b7280" tick={{ fontSize: 11 }} label={{ value: 'Time (hr)', position: 'insideBottom', offset: -2, style: { fill: '#6b7280', fontSize: 11 } }} />
                  <YAxis stroke="#6b7280" tick={{ fontSize: 11 }} label={{ value: 'Conc (mg/L)', angle: -90, position: 'insideLeft', style: { fill: '#6b7280', fontSize: 11 } }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '8px', fontSize: '12px' }}
                    labelStyle={{ color: '#9ca3af' }}
                    formatter={(value: number) => [`${value} mg/L`, 'Concentration']}
                    labelFormatter={(label) => `Time: ${label} hr`}
                  />
                  <ReferenceLine y={params.therapeuticMin} stroke="#22c55e" strokeDasharray="5 5" label={{ value: 'Min therapeutic', position: 'right', style: { fill: '#22c55e', fontSize: 10 } }} />
                  <ReferenceLine y={params.therapeuticMax} stroke="#ef4444" strokeDasharray="5 5" label={{ value: 'Max therapeutic', position: 'right', style: { fill: '#ef4444', fontSize: 10 } }} />
                  <Area type="monotone" dataKey="concentration" stroke="#06b6d4" fill="url(#concGradient)" strokeWidth={2} dot={false} />
                </AreaChart>
              ) : (
                <LineChart data={singleDoseResult.points} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis dataKey="time" stroke="#6b7280" tick={{ fontSize: 11 }} label={{ value: 'Time (hr)', position: 'insideBottom', offset: -2, style: { fill: '#6b7280', fontSize: 11 } }} />
                  <YAxis stroke="#6b7280" tick={{ fontSize: 11 }} label={{ value: 'Conc (mg/L)', angle: -90, position: 'insideLeft', style: { fill: '#6b7280', fontSize: 11 } }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '8px', fontSize: '12px' }}
                    labelStyle={{ color: '#9ca3af' }}
                    formatter={(value: number) => [`${value} mg/L`, 'Concentration']}
                    labelFormatter={(label) => `Time: ${label} hr`}
                  />
                  <ReferenceLine y={singleDoseResult.c0 / 2} stroke="#f59e0b" strokeDasharray="5 5" label={{ value: '½ C₀', position: 'right', style: { fill: '#f59e0b', fontSize: 10 } }} />
                  <ReferenceLine x={params.halfLife} stroke="#f59e0b" strokeDasharray="5 5" label={{ value: `t½ = ${params.halfLife}h`, position: 'top', style: { fill: '#f59e0b', fontSize: 10 } }} />
                  <Line type="monotone" dataKey="concentration" stroke="#06b6d4" strokeWidth={2} dot={false} />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>

          {/* Key Insights */}
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Stat label="C₀ (peak after 1st dose)" value={`${Math.round((params.dose * params.bioavailability / params.vd) * 100) / 100}`} unit="mg/L" />
            <Stat label="ke" value={`${Math.round(ke * 10000) / 10000}`} unit="hr⁻¹" />
            <Stat label="Avg Css" value={`${Math.round(cssAvg * 100) / 100}`} unit="mg/L" />
            <Stat label="Time to Steady State" value={`${Math.round(timeToSS)}`} unit="hr (~5 × t½)" />
          </div>
        </div>
      </div>

      {/* Educational Notes */}
      <div className="card bg-gray-50 border-gray-200">
        <div className="flex items-start gap-2">
          <Info size={16} className="text-blue mt-0.5 shrink-0" />
          <div className="text-sm text-gray-600 space-y-1">
            {mode === 'multiple' ? (
              <>
                <p><span className="text-dark font-medium">Accumulation:</span> With repeated dosing, each new dose adds to the remaining drug from previous doses. The "sawtooth" pattern shows peak (Cmax) and trough (Cmin) concentrations.</p>
                <p><span className="text-dark font-medium">Steady State:</span> Reached after ~5 half-lives. At steady state, the amount of drug administered per interval equals the amount eliminated per interval.</p>
                <p><span className="text-dark font-medium">Therapeutic Window:</span> The green and red dashed lines show the therapeutic range. Concentrations above the max risk toxicity; below the min risk treatment failure.</p>
              </>
            ) : (
              <>
                <p><span className="text-dark font-medium">First-Order Elimination:</span> Most drugs follow first-order kinetics — a constant <em>fraction</em> is eliminated per unit time. The curve is exponential.</p>
                <p><span className="text-dark font-medium">Half-Life:</span> The yellow dashed lines mark where concentration drops to 50% of C₀. After 5 half-lives, ~97% of the drug is eliminated.</p>
                <p><span className="text-dark font-medium">Clinical Relevance:</span> Half-life determines dosing frequency. Short t½ → more frequent dosing. Long t½ → once-daily or less frequent dosing.</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div className="bg-navy rounded-lg p-3 text-center">
      <p className="text-xs text-white/60 mb-1">{label}</p>
      <p className="text-lg font-bold text-gold">{value}</p>
      <p className="text-xs text-white/50">{unit}</p>
    </div>
  );
}
