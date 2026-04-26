// ============================================================
// Drug Comparison Data — Within-Class Comparisons
// ============================================================

export interface ComparableDrug {
  name: string;
  properties: Record<string, string>;
}

export interface DrugComparisonGroup {
  className: string;
  description: string;
  properties: string[]; // column headers
  drugs: ComparableDrug[];
  clinicalPearl: string;
}

export const drugComparisons: DrugComparisonGroup[] = [
  {
    className: 'Statins (HMG-CoA Reductase Inhibitors)',
    description: 'Compare potency, metabolism, and key differences between statins',
    properties: ['Potency', 'CYP Metabolism', 'Hydrophilic?', 'Half-Life', 'Dose Timing', 'Key Difference'],
    drugs: [
      { name: 'Atorvastatin', properties: { 'Potency': 'High', 'CYP Metabolism': 'CYP3A4', 'Hydrophilic?': 'No (lipophilic)', 'Half-Life': '14 hr', 'Dose Timing': 'Any time', 'Key Difference': 'Long t½ → any time dosing. Most prescribed statin.' } },
      { name: 'Rosuvastatin', properties: { 'Potency': 'Highest', 'CYP Metabolism': 'Minimal CYP (CYP2C9 minor)', 'Hydrophilic?': 'Yes', 'Half-Life': '19 hr', 'Dose Timing': 'Any time', 'Key Difference': 'Most potent. Fewest CYP interactions. Preferred in polypharmacy.' } },
      { name: 'Simvastatin', properties: { 'Potency': 'Moderate', 'CYP Metabolism': 'CYP3A4', 'Hydrophilic?': 'No (lipophilic)', 'Half-Life': '2 hr', 'Dose Timing': 'Evening', 'Key Difference': 'Short t½ → must take in evening. Many CYP3A4 interactions. Max 20mg with amiodarone/amlodipine.' } },
      { name: 'Pravastatin', properties: { 'Potency': 'Low', 'CYP Metabolism': 'Not CYP metabolized', 'Hydrophilic?': 'Yes', 'Half-Life': '1.5 hr', 'Dose Timing': 'Any time', 'Key Difference': 'No CYP interactions at all. Safest with interacting drugs. Lower potency.' } },
      { name: 'Lovastatin', properties: { 'Potency': 'Low', 'CYP Metabolism': 'CYP3A4', 'Hydrophilic?': 'No (lipophilic)', 'Half-Life': '2 hr', 'Dose Timing': 'With evening meal', 'Key Difference': 'Prodrug. Must take with food for absorption. Similar interaction profile to simvastatin.' } },
    ],
    clinicalPearl: 'When a patient has CYP3A4 interactions (azole antifungals, macrolides, HIV protease inhibitors), switch to pravastatin or rosuvastatin. Simvastatin has the most dose restrictions due to interactions.',
  },
  {
    className: 'ACE Inhibitors vs ARBs',
    description: 'Head-to-head comparison of RAAS blockers',
    properties: ['Mechanism', 'Dry Cough?', 'Angioedema Risk', 'Prodrug?', 'Renal Elimination', 'Key Difference'],
    drugs: [
      { name: 'Lisinopril', properties: { 'Mechanism': 'ACE inhibitor', 'Dry Cough?': 'Yes (10-15%)', 'Angioedema Risk': 'Higher', 'Prodrug?': 'No (active)', 'Renal Elimination': 'Yes (100%)', 'Key Difference': 'Not a prodrug (unlike most ACEi). 100% renal elimination. No hepatic metabolism.' } },
      { name: 'Enalapril', properties: { 'Mechanism': 'ACE inhibitor', 'Dry Cough?': 'Yes (10-15%)', 'Angioedema Risk': 'Higher', 'Prodrug?': 'Yes → Enalaprilat', 'Renal Elimination': 'Yes', 'Key Difference': 'Prodrug converted in liver. IV form available (enalaprilat). BID dosing.' } },
      { name: 'Ramipril', properties: { 'Mechanism': 'ACE inhibitor', 'Dry Cough?': 'Yes (10-15%)', 'Angioedema Risk': 'Higher', 'Prodrug?': 'Yes → Ramiprilat', 'Renal Elimination': 'Yes', 'Key Difference': 'HOPE trial: CV benefit in high-risk patients. Tissue-penetrating.' } },
      { name: 'Losartan', properties: { 'Mechanism': 'ARB (AT1 blocker)', 'Dry Cough?': 'No', 'Angioedema Risk': 'Lower', 'Prodrug?': 'Yes → EXP3174', 'Renal Elimination': 'Partial', 'Key Difference': 'Uricosuric effect (lowers uric acid). CYP2C9 substrate. Least potent ARB.' } },
      { name: 'Valsartan', properties: { 'Mechanism': 'ARB (AT1 blocker)', 'Dry Cough?': 'No', 'Angioedema Risk': 'Lower', 'Prodrug?': 'No', 'Renal Elimination': 'Minimal', 'Key Difference': 'Not a prodrug. Primarily hepatic elimination. Used in heart failure (VALHEFT).' } },
      { name: 'Telmisartan', properties: { 'Mechanism': 'ARB (AT1 blocker)', 'Dry Cough?': 'No', 'Angioedema Risk': 'Lower', 'Prodrug?': 'No', 'Renal Elimination': 'Minimal', 'Key Difference': 'Longest half-life ARB (24h). PPARγ agonist activity. Purely hepatic elimination.' } },
    ],
    clinicalPearl: 'ACEi → cough? Switch to ARB. Both contraindicated in pregnancy. Never combine ACEi + ARB (ONTARGET trial: more harm, no benefit). Both cause hyperkalemia — monitor K⁺.',
  },
  {
    className: 'Beta-Blockers',
    description: 'Selectivity, ISA, and clinical differences',
    properties: ['Selectivity', 'ISA', 'Lipophilic?', 'Half-Life', 'Key Indication', 'Key Difference'],
    drugs: [
      { name: 'Metoprolol', properties: { 'Selectivity': 'β1-selective', 'ISA': 'No', 'Lipophilic?': 'Yes', 'Half-Life': '3-7 hr', 'Key Indication': 'HTN, HF, post-MI', 'Key Difference': 'Succinate (ER) for HF. Tartrate (IR) for acute. CYP2D6 substrate.' } },
      { name: 'Atenolol', properties: { 'Selectivity': 'β1-selective', 'ISA': 'No', 'Lipophilic?': 'No (hydrophilic)', 'Half-Life': '6-7 hr', 'Key Indication': 'HTN', 'Key Difference': 'Hydrophilic → less CNS effects. Renally eliminated. Not first-line for HF.' } },
      { name: 'Propranolol', properties: { 'Selectivity': 'Non-selective (β1+β2)', 'ISA': 'No', 'Lipophilic?': 'Yes', 'Half-Life': '3-6 hr', 'Key Indication': 'Migraine, tremor, anxiety, thyroid storm', 'Key Difference': 'Non-selective → can worsen asthma/COPD. Crosses BBB → CNS effects. Masks hypoglycemia symptoms.' } },
      { name: 'Carvedilol', properties: { 'Selectivity': 'Non-selective + α1 block', 'ISA': 'No', 'Lipophilic?': 'Yes', 'Half-Life': '6-10 hr', 'Key Indication': 'Heart failure, HTN', 'Key Difference': 'α1 blockade → additional vasodilation. Take with food. Evidence-based for HF (COPERNICUS).' } },
      { name: 'Bisoprolol', properties: { 'Selectivity': 'β1-selective (most selective)', 'ISA': 'No', 'Lipophilic?': 'Intermediate', 'Half-Life': '10-12 hr', 'Key Indication': 'Heart failure, HTN', 'Key Difference': 'Most β1-selective. Long t½ → once daily. CIBIS-II trial for HF.' } },
      { name: 'Pindolol', properties: { 'Selectivity': 'Non-selective', 'ISA': 'Yes', 'Lipophilic?': 'Intermediate', 'Half-Life': '3-4 hr', 'Key Indication': 'HTN', 'Key Difference': 'ISA = partial agonist activity. Less bradycardia. NOT for post-MI or HF.' } },
    ],
    clinicalPearl: 'HF-approved beta-blockers: metoprolol succinate, carvedilol, bisoprolol (only these 3). β1-selective safer in asthma/COPD/diabetes but selectivity is lost at high doses. Never stop abruptly → rebound tachycardia.',
  },
  {
    className: 'Oral Anticoagulants',
    description: 'Warfarin vs DOACs — mechanism, monitoring, reversal',
    properties: ['Mechanism', 'Monitoring', 'Reversal Agent', 'Renal Dose Adj?', 'Food Interactions', 'Key Difference'],
    drugs: [
      { name: 'Warfarin', properties: { 'Mechanism': 'Vitamin K antagonist (II, VII, IX, X)', 'Monitoring': 'INR (target 2-3)', 'Reversal Agent': 'Vitamin K, FFP, PCC (4-factor)', 'Renal Dose Adj?': 'No', 'Food Interactions': 'Vitamin K foods, cranberry, alcohol', 'Key Difference': 'Narrow TI. Many drug/food interactions. CYP2C9/VKORC1 pharmacogenomics. Cheap.' } },
      { name: 'Rivaroxaban', properties: { 'Mechanism': 'Direct Factor Xa inhibitor', 'Monitoring': 'None routine (anti-Xa if needed)', 'Reversal Agent': 'Andexanet alfa', 'Renal Dose Adj?': 'Yes (avoid CrCl <15)', 'Food Interactions': 'Take ≥15mg dose with food', 'Key Difference': 'Once daily (most indications). Must take with food for absorption of higher doses.' } },
      { name: 'Apixaban', properties: { 'Mechanism': 'Direct Factor Xa inhibitor', 'Monitoring': 'None routine', 'Reversal Agent': 'Andexanet alfa', 'Renal Dose Adj?': 'Yes (2.5mg BID if ≥2 of: age≥80, wt≤60kg, SCr≥1.5)', 'Food Interactions': 'None significant', 'Key Difference': 'Least renal elimination of DOACs (27%). Preferred in CKD. BID dosing.' } },
      { name: 'Dabigatran', properties: { 'Mechanism': 'Direct thrombin (IIa) inhibitor', 'Monitoring': 'None routine (dTT if needed)', 'Reversal Agent': 'Idarucizumab (specific)', 'Renal Dose Adj?': 'Yes (avoid CrCl <30)', 'Food Interactions': 'None significant', 'Key Difference': 'Only DOAC with specific reversal agent. Most renal elimination (80%). GI side effects. Keep in original bottle (moisture-sensitive).' } },
    ],
    clinicalPearl: 'DOACs preferred over warfarin for non-valvular AFib (fewer interactions, no monitoring). Warfarin still required for mechanical heart valves. Apixaban preferred in elderly/CKD. Dabigatran is the only one with a specific reversal agent (idarucizumab).',
  },
  {
    className: 'Diabetes Medications (Oral)',
    description: 'Mechanism, weight effects, and hypoglycemia risk',
    properties: ['Mechanism', 'Hypo Risk?', 'Weight Effect', 'CV Benefit?', 'Key Side Effect', 'Key Difference'],
    drugs: [
      { name: 'Metformin', properties: { 'Mechanism': '↓ hepatic glucose output, ↑ insulin sensitivity', 'Hypo Risk?': 'No (alone)', 'Weight Effect': 'Neutral/slight loss', 'CV Benefit?': 'Yes', 'Key Side Effect': 'GI (diarrhea, nausea). Lactic acidosis (rare).', 'Key Difference': 'First-line for T2DM. Contraindicated eGFR <30. Hold for contrast.' } },
      { name: 'Glipizide', properties: { 'Mechanism': 'Sulfonylurea → closes K⁺ channels → ↑ insulin secretion', 'Hypo Risk?': 'YES (high)', 'Weight Effect': 'Weight gain', 'CV Benefit?': 'No', 'Key Side Effect': 'Hypoglycemia, weight gain', 'Key Difference': 'Shorter-acting SU. Preferred in elderly (vs glyburide). Take 30 min before meals.' } },
      { name: 'Empagliflozin', properties: { 'Mechanism': 'SGLT2 inhibitor → ↑ glucosuria', 'Hypo Risk?': 'No (alone)', 'Weight Effect': 'Weight loss', 'CV Benefit?': 'YES (EMPA-REG)', 'Key Side Effect': 'UTI, genital mycotic infections, euglycemic DKA', 'Key Difference': 'CV and renal benefits. Weight loss. Now used in HF even without diabetes.' } },
      { name: 'Sitagliptin', properties: { 'Mechanism': 'DPP-4 inhibitor → ↑ incretins', 'Hypo Risk?': 'No (alone)', 'Weight Effect': 'Neutral', 'CV Benefit?': 'Neutral', 'Key Side Effect': 'Nasopharyngitis, pancreatitis (rare)', 'Key Difference': 'Weight-neutral. Well-tolerated. Dose adjust for renal impairment (except linagliptin).' } },
      { name: 'Pioglitazone', properties: { 'Mechanism': 'PPARγ agonist → ↑ insulin sensitivity', 'Hypo Risk?': 'No (alone)', 'Weight Effect': 'Weight gain', 'CV Benefit?': 'Possible', 'Key Side Effect': 'Edema, weight gain, fractures, bladder cancer risk', 'Key Difference': 'Contraindicated in HF (fluid retention). Takes weeks for full effect. Beneficial in NAFLD.' } },
    ],
    clinicalPearl: 'ADA guidelines: Metformin first-line → add SGLT2i or GLP-1 RA if CV/renal disease → add other agents as needed. SGLT2 inhibitors have revolutionized treatment with CV + renal + weight benefits.',
  },
];
