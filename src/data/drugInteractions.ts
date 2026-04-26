// ============================================================
// Drug-Drug Interaction Database with Mechanistic Reasoning
// ============================================================

export interface Interaction {
  drug1: string;
  drug2: string;
  severity: 'major' | 'moderate' | 'minor';
  mechanism: string;
  clinicalEffect: string;
  management: string;
  cypInvolved?: string;
}

export const drugInteractions: Interaction[] = [
  // --- CYP-mediated interactions ---
  {
    drug1: 'Simvastatin',
    drug2: 'Erythromycin',
    severity: 'major',
    mechanism: 'Erythromycin inhibits CYP3A4, which metabolizes simvastatin. This dramatically increases simvastatin plasma levels.',
    clinicalEffect: 'Increased risk of myopathy and rhabdomyolysis due to elevated statin levels.',
    management: 'Avoid combination. Switch to pravastatin or rosuvastatin (not CYP3A4 dependent). If unavoidable, limit simvastatin to 10mg/day.',
    cypInvolved: 'CYP3A4',
  },
  {
    drug1: 'Warfarin',
    drug2: 'Fluconazole',
    severity: 'major',
    mechanism: 'Fluconazole inhibits CYP2C9 (primary) and CYP3A4, both involved in warfarin metabolism. S-warfarin (more potent enantiomer) is a CYP2C9 substrate.',
    clinicalEffect: 'Significantly elevated INR → increased bleeding risk.',
    management: 'Reduce warfarin dose by 25-50% when starting fluconazole. Monitor INR closely (every 2-3 days initially).',
    cypInvolved: 'CYP2C9, CYP3A4',
  },
  {
    drug1: 'Clopidogrel',
    drug2: 'Omeprazole',
    severity: 'major',
    mechanism: 'Omeprazole inhibits CYP2C19, which is required to convert clopidogrel (prodrug) to its active metabolite.',
    clinicalEffect: 'Reduced antiplatelet effect → increased risk of cardiovascular events (MI, stent thrombosis).',
    management: 'Use pantoprazole instead (weaker CYP2C19 inhibition). Alternatively, use an H2 blocker like famotidine.',
    cypInvolved: 'CYP2C19',
  },
  {
    drug1: 'Methotrexate',
    drug2: 'NSAIDs',
    severity: 'major',
    mechanism: 'NSAIDs reduce renal blood flow (via prostaglandin inhibition) → decreased methotrexate renal clearance. Also, competition for tubular secretion.',
    clinicalEffect: 'Methotrexate toxicity: pancytopenia, mucositis, nephrotoxicity, hepatotoxicity.',
    management: 'Avoid NSAIDs with high-dose methotrexate. With low-dose MTX, use with caution and monitor CBC/renal function.',
  },
  {
    drug1: 'Lithium',
    drug2: 'ACE Inhibitors',
    severity: 'major',
    mechanism: 'ACE inhibitors reduce GFR and increase proximal tubular reabsorption of lithium (sodium depletion → lithium retention).',
    clinicalEffect: 'Lithium toxicity: tremor, ataxia, confusion, seizures, cardiac arrhythmias.',
    management: 'Monitor lithium levels closely when starting/stopping ACE inhibitors. May need 50-75% lithium dose reduction.',
  },
  {
    drug1: 'Digoxin',
    drug2: 'Amiodarone',
    severity: 'major',
    mechanism: 'Amiodarone inhibits P-glycoprotein (P-gp) and reduces renal/non-renal clearance of digoxin.',
    clinicalEffect: 'Digoxin toxicity: nausea, visual changes (yellow halos), arrhythmias (bidirectional VT).',
    management: 'Reduce digoxin dose by 50% when starting amiodarone. Monitor digoxin levels and ECG.',
  },
  {
    drug1: 'Fluoxetine',
    drug2: 'Tramadol',
    severity: 'major',
    mechanism: 'Both increase serotonin. Fluoxetine also inhibits CYP2D6, reducing tramadol conversion to active metabolite (O-desmethyltramadol).',
    clinicalEffect: 'Serotonin syndrome risk (hyperthermia, clonus, agitation). Also reduced analgesic effect.',
    management: 'Avoid combination. If needed, use lowest doses and monitor for serotonin syndrome symptoms.',
    cypInvolved: 'CYP2D6',
  },
  // --- Pharmacodynamic interactions ---
  {
    drug1: 'Sildenafil',
    drug2: 'Nitroglycerin',
    severity: 'major',
    mechanism: 'Both increase cGMP-mediated vasodilation through different mechanisms (PDE5 inhibition + NO donation). Synergistic hypotensive effect.',
    clinicalEffect: 'Severe, potentially fatal hypotension.',
    management: 'ABSOLUTE CONTRAINDICATION. Wait ≥24h after sildenafil (≥48h after tadalafil) before giving nitrates.',
  },
  {
    drug1: 'Spironolactone',
    drug2: 'Lisinopril',
    severity: 'moderate',
    mechanism: 'Both reduce potassium excretion. Spironolactone blocks aldosterone; ACE inhibitors reduce aldosterone secretion.',
    clinicalEffect: 'Hyperkalemia → cardiac arrhythmias, muscle weakness.',
    management: 'Monitor K⁺ and renal function closely. Avoid if K⁺ >5.0 mEq/L or CrCl <30 mL/min. Used together in heart failure with careful monitoring.',
  },
  {
    drug1: 'Ciprofloxacin',
    drug2: 'Calcium Carbonate',
    severity: 'moderate',
    mechanism: 'Divalent cations (Ca²⁺, Mg²⁺, Fe²⁺, Al³⁺) chelate fluoroquinolones in the GI tract, forming insoluble complexes.',
    clinicalEffect: 'Dramatically reduced ciprofloxacin absorption → treatment failure.',
    management: 'Take ciprofloxacin 2h before or 6h after calcium-containing products.',
  },
  {
    drug1: 'Warfarin',
    drug2: 'Vitamin K',
    severity: 'moderate',
    mechanism: 'Vitamin K is the substrate for the enzyme (VKORC1) that warfarin inhibits. Increased vitamin K intake overcomes warfarin blockade.',
    clinicalEffect: 'Decreased INR → reduced anticoagulation → increased clotting risk.',
    management: 'Maintain consistent vitamin K intake. Do not suddenly increase green leafy vegetables. Educate patient on dietary consistency.',
  },
  {
    drug1: 'Metformin',
    drug2: 'IV Contrast Dye',
    severity: 'moderate',
    mechanism: 'Iodinated contrast can cause acute kidney injury. Impaired renal function → metformin accumulation.',
    clinicalEffect: 'Lactic acidosis (rare but potentially fatal).',
    management: 'Hold metformin on day of and 48h after contrast. Restart after confirming stable renal function (eGFR >30).',
  },
  {
    drug1: 'Phenytoin',
    drug2: 'Valproic Acid',
    severity: 'major',
    mechanism: 'Valproic acid displaces phenytoin from albumin binding sites AND inhibits CYP2C9 metabolism of phenytoin.',
    clinicalEffect: 'Increased free phenytoin levels → toxicity (nystagmus, ataxia, confusion) even with "normal" total levels.',
    management: 'Monitor FREE phenytoin levels (not total). Adjust phenytoin dose based on free levels. Consider alternative anticonvulsant.',
    cypInvolved: 'CYP2C9',
  },
  {
    drug1: 'Carbamazepine',
    drug2: 'Oral Contraceptives',
    severity: 'major',
    mechanism: 'Carbamazepine is a potent CYP3A4 inducer. Ethinyl estradiol and progestins are CYP3A4 substrates.',
    clinicalEffect: 'Reduced contraceptive efficacy → unintended pregnancy.',
    management: 'Use non-hormonal contraception or high-dose OCP (≥50mcg ethinyl estradiol). Consider IUD or depot medroxyprogesterone.',
    cypInvolved: 'CYP3A4',
  },
  {
    drug1: 'Gentamicin',
    drug2: 'Furosemide',
    severity: 'moderate',
    mechanism: 'Both are ototoxic and nephrotoxic. Furosemide may also increase aminoglycoside concentrations in the inner ear.',
    clinicalEffect: 'Increased risk of irreversible hearing loss and acute kidney injury.',
    management: 'Avoid combination when possible. If necessary, monitor drug levels, audiometry, and renal function closely.',
  },
  {
    drug1: 'SSRIs',
    drug2: 'MAOIs',
    severity: 'major',
    mechanism: 'MAOIs prevent serotonin breakdown; SSRIs prevent serotonin reuptake. Combined effect → massive serotonin excess.',
    clinicalEffect: 'Serotonin syndrome: hyperthermia, rigidity, myoclonus, autonomic instability → potentially fatal.',
    management: 'ABSOLUTE CONTRAINDICATION. Require 14-day washout between MAOIs and most SSRIs (5 weeks for fluoxetine due to long half-life).',
  },
  {
    drug1: 'Potassium Supplements',
    drug2: 'Spironolactone',
    severity: 'major',
    mechanism: 'Spironolactone is a potassium-sparing diuretic (blocks aldosterone). Adding exogenous potassium compounds the retention.',
    clinicalEffect: 'Severe hyperkalemia → cardiac arrest.',
    management: 'Generally avoid combination. If K⁺ supplementation needed, use lowest dose and monitor K⁺ levels frequently.',
  },
];
