// ============================================================
// Pharmacokinetic Calculation Engine
// ============================================================

export interface PKResult {
  label: string;
  value: number;
  unit: string;
  formula: string;
  explanation: string;
}

// Cockcroft-Gault: CrCl estimation
export function calculateCrCl(
  age: number,
  weight: number, // kg (actual or adjusted)
  serumCr: number, // mg/dL
  isFemale: boolean
): PKResult {
  const base = ((140 - age) * weight) / (72 * serumCr);
  const result = isFemale ? base * 0.85 : base;
  return {
    label: 'Creatinine Clearance (CrCl)',
    value: Math.round(result * 100) / 100,
    unit: 'mL/min',
    formula: 'CrCl = [(140 − age) × weight] / (72 × SCr)' + (isFemale ? ' × 0.85' : ''),
    explanation: `Estimated GFR using Cockcroft-Gault equation. ${
      result >= 90 ? 'Normal renal function.' :
      result >= 60 ? 'Mild impairment (Stage 2 CKD). Some drugs may need adjustment.' :
      result >= 30 ? 'Moderate impairment (Stage 3 CKD). Many drugs need dose reduction.' :
      result >= 15 ? 'Severe impairment (Stage 4 CKD). Significant dose adjustments needed.' :
      'Kidney failure (Stage 5 CKD). Dialysis-dependent dosing required.'
    }`,
  };
}

// Half-life from elimination rate constant
export function calculateHalfLife(ke: number): PKResult {
  const t12 = 0.693 / ke;
  return {
    label: 'Elimination Half-Life (t½)',
    value: Math.round(t12 * 100) / 100,
    unit: 'hours',
    formula: 't½ = 0.693 / ke',
    explanation: `Time for plasma concentration to decrease by 50%. Drug reaches steady state in ~${Math.round(t12 * 5 * 10) / 10} hours (5 × t½). After 5 half-lives, ~97% of the drug is eliminated.`,
  };
}

// Elimination rate constant from half-life
export function calculateKe(halfLife: number): PKResult {
  const ke = 0.693 / halfLife;
  return {
    label: 'Elimination Rate Constant (ke)',
    value: Math.round(ke * 10000) / 10000,
    unit: 'hr⁻¹',
    formula: 'ke = 0.693 / t½',
    explanation: `Fraction of drug eliminated per hour. ${Math.round(ke * 100)}% of the drug is cleared each hour.`,
  };
}

// Volume of Distribution
export function calculateVd(dose: number, plasmaConc: number): PKResult {
  const vd = dose / plasmaConc;
  return {
    label: 'Volume of Distribution (Vd)',
    value: Math.round(vd * 100) / 100,
    unit: 'L',
    formula: 'Vd = Dose / C₀ (initial plasma concentration)',
    explanation: `${
      vd < 10 ? 'Low Vd — drug stays mainly in plasma (e.g., warfarin, aspirin). Highly protein-bound.' :
      vd < 40 ? 'Moderate Vd — drug distributes into extracellular fluid.' :
      'High Vd — drug extensively distributes into tissues (e.g., digoxin, amiodarone). Lipophilic.'
    }`,
  };
}

// Clearance
export function calculateClearance(dose: number, auc: number): PKResult {
  const cl = dose / auc;
  return {
    label: 'Total Body Clearance (CL)',
    value: Math.round(cl * 100) / 100,
    unit: 'L/hr',
    formula: 'CL = Dose / AUC',
    explanation: 'Volume of plasma completely cleared of drug per unit time. CL = ke × Vd.',
  };
}

// Clearance from ke and Vd
export function calculateClearanceFromKeVd(ke: number, vd: number): PKResult {
  const cl = ke * vd;
  return {
    label: 'Total Body Clearance (CL)',
    value: Math.round(cl * 100) / 100,
    unit: 'L/hr',
    formula: 'CL = ke × Vd',
    explanation: 'Volume of plasma completely cleared of drug per unit time.',
  };
}

// Loading Dose
export function calculateLoadingDose(targetConc: number, vd: number, bioavailability: number = 1): PKResult {
  const ld = (targetConc * vd) / bioavailability;
  return {
    label: 'Loading Dose',
    value: Math.round(ld * 100) / 100,
    unit: 'mg',
    formula: `LD = (Css × Vd) / F${bioavailability < 1 ? ` (F = ${bioavailability})` : ''}`,
    explanation: 'Dose needed to immediately achieve target steady-state concentration. Used when rapid therapeutic effect is needed (e.g., digoxin, phenytoin, amiodarone).',
  };
}

// Maintenance Dose
export function calculateMaintenanceDose(
  targetConc: number,
  clearance: number,
  dosingInterval: number,
  bioavailability: number = 1
): PKResult {
  const md = (targetConc * clearance * dosingInterval) / bioavailability;
  return {
    label: 'Maintenance Dose',
    value: Math.round(md * 100) / 100,
    unit: 'mg',
    formula: `MD = (Css × CL × τ) / F${bioavailability < 1 ? ` (F = ${bioavailability})` : ''}`,
    explanation: `Dose to maintain target concentration at steady state. Given every ${dosingInterval} hours (τ = dosing interval).`,
  };
}

// Steady-State Concentration
export function calculateSteadyState(dose: number, bioavailability: number, clearance: number, dosingInterval: number): PKResult {
  const css = (dose * bioavailability) / (clearance * dosingInterval);
  return {
    label: 'Steady-State Concentration (Css)',
    value: Math.round(css * 100) / 100,
    unit: 'mg/L',
    formula: 'Css = (Dose × F) / (CL × τ)',
    explanation: `Average plasma concentration at steady state. Reached after ~5 half-lives of repeated dosing.`,
  };
}

// Time to reach fraction of steady state
export function timeToSteadyState(halfLife: number, fraction: number = 0.9): PKResult {
  const ke = 0.693 / halfLife;
  const time = -Math.log(1 - fraction) / ke;
  return {
    label: `Time to ${Math.round(fraction * 100)}% Steady State`,
    value: Math.round(time * 100) / 100,
    unit: 'hours',
    formula: `t = −ln(1 − f) / ke  where f = ${fraction}`,
    explanation: `Takes ${Math.round(time / halfLife * 10) / 10} half-lives to reach ${Math.round(fraction * 100)}% of steady state.`,
  };
}

// AUC (trapezoidal for single dose, IV bolus)
export function calculateAUC(dose: number, clearance: number): PKResult {
  const auc = dose / clearance;
  return {
    label: 'Area Under the Curve (AUC)',
    value: Math.round(auc * 100) / 100,
    unit: 'mg·hr/L',
    formula: 'AUC = Dose / CL',
    explanation: 'Total drug exposure over time. Used to compare bioavailability and calculate clearance.',
  };
}

// Adjusted Body Weight (for obese patients)
export function calculateABW(actualWeight: number, idealWeight: number): PKResult {
  const abw = idealWeight + 0.4 * (actualWeight - idealWeight);
  return {
    label: 'Adjusted Body Weight (ABW)',
    value: Math.round(abw * 10) / 10,
    unit: 'kg',
    formula: 'ABW = IBW + 0.4 × (ABW − IBW)',
    explanation: 'Used for aminoglycoside and vancomycin dosing in obese patients (actual weight >120% of IBW).',
  };
}

// Ideal Body Weight (Devine formula)
export function calculateIBW(heightCm: number, isFemale: boolean): PKResult {
  const heightInches = heightCm / 2.54;
  const ibw = isFemale
    ? 45.5 + 2.3 * (heightInches - 60)
    : 50 + 2.3 * (heightInches - 60);
  return {
    label: 'Ideal Body Weight (IBW)',
    value: Math.round(ibw * 10) / 10,
    unit: 'kg',
    formula: isFemale
      ? 'IBW = 45.5 + 2.3 × (height in inches − 60)'
      : 'IBW = 50 + 2.3 × (height in inches − 60)',
    explanation: 'Devine formula. Used as basis for many drug dosing calculations, especially aminoglycosides and chemotherapy.',
  };
}
