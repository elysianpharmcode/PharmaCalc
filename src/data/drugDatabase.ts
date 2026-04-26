// ============================================================
// PharmaCalc Pro — Comprehensive Drug Database
// ============================================================

export interface Drug {
  name: string;
  genericName: string;
  brandNames: string[];
  class: string;
  subclass: string;
  suffix: string;
  mechanism: string;
  indications: string[];
  sideEffects: string[];
  contraindications: string[];
  cypMetabolism: string[];
  renalDose: boolean;
  hepaticDose: boolean;
  halfLife: string;
  bioavailability: string;
  proteinBinding: string;
  volumeOfDistribution: string;
  elimination: string;
}

export interface DrugInteraction {
  drug1: string;
  drug2: string;
  severity: 'major' | 'moderate' | 'minor';
  mechanism: string;
  clinicalEffect: string;
  management: string;
}

export interface DrugSuffix {
  suffix: string;
  drugClass: string;
  mechanism: string;
  examples: string[];
  keyPoints: string[];
}

// ---- Drug Suffix / Stem Reference ----
export const drugSuffixes: DrugSuffix[] = [
  {
    suffix: '-olol',
    drugClass: 'Beta-Blockers',
    mechanism: 'Block β-adrenergic receptors → ↓ heart rate, ↓ contractility, ↓ BP',
    examples: ['Metoprolol', 'Atenolol', 'Propranolol', 'Carvedilol', 'Bisoprolol'],
    keyPoints: ['Cardioselective (β1): atenolol, metoprolol, bisoprolol', 'Non-selective (β1+β2): propranolol, carvedilol', 'Avoid abrupt withdrawal → rebound tachycardia'],
  },
  {
    suffix: '-pril',
    drugClass: 'ACE Inhibitors',
    mechanism: 'Inhibit angiotensin-converting enzyme → ↓ angiotensin II → vasodilation, ↓ aldosterone',
    examples: ['Lisinopril', 'Enalapril', 'Ramipril', 'Captopril', 'Benazepril'],
    keyPoints: ['Dry cough (bradykinin accumulation)', 'Hyperkalemia risk', 'Contraindicated in pregnancy', 'Angioedema risk'],
  },
  {
    suffix: '-sartan',
    drugClass: 'ARBs (Angiotensin II Receptor Blockers)',
    mechanism: 'Block AT1 receptors → prevent angiotensin II effects → vasodilation',
    examples: ['Losartan', 'Valsartan', 'Irbesartan', 'Candesartan', 'Telmisartan'],
    keyPoints: ['No dry cough (unlike ACE inhibitors)', 'Also contraindicated in pregnancy', 'Hyperkalemia risk remains'],
  },
  {
    suffix: '-statin',
    drugClass: 'HMG-CoA Reductase Inhibitors',
    mechanism: 'Inhibit HMG-CoA reductase → ↓ cholesterol synthesis in liver → ↑ LDL receptor expression',
    examples: ['Atorvastatin', 'Rosuvastatin', 'Simvastatin', 'Pravastatin', 'Lovastatin'],
    keyPoints: ['Myopathy/rhabdomyolysis risk', 'Monitor LFTs', 'Take simvastatin/lovastatin in evening (peak cholesterol synthesis at night)', 'CYP3A4 interactions (simvastatin, lovastatin, atorvastatin)'],
  },
  {
    suffix: '-prazole',
    drugClass: 'Proton Pump Inhibitors (PPIs)',
    mechanism: 'Irreversibly inhibit H+/K+ ATPase (proton pump) in gastric parietal cells → ↓ acid secretion',
    examples: ['Omeprazole', 'Esomeprazole', 'Lansoprazole', 'Pantoprazole', 'Rabeprazole'],
    keyPoints: ['Take 30 min before meals', 'Long-term: ↑ risk of C. diff, fractures, Mg²⁺ deficiency', 'Omeprazole inhibits CYP2C19 (clopidogrel interaction)'],
  },
  {
    suffix: '-tidine',
    drugClass: 'H2 Receptor Antagonists',
    mechanism: 'Block histamine H2 receptors on parietal cells → ↓ acid secretion',
    examples: ['Famotidine', 'Ranitidine', 'Cimetidine', 'Nizatidine'],
    keyPoints: ['Less potent than PPIs', 'Cimetidine: CYP inhibitor, anti-androgenic effects', 'Ranitidine withdrawn (NDMA contamination)'],
  },
  {
    suffix: '-dipine',
    drugClass: 'Dihydropyridine Calcium Channel Blockers',
    mechanism: 'Block L-type Ca²⁺ channels in vascular smooth muscle → vasodilation → ↓ BP',
    examples: ['Amlodipine', 'Nifedipine', 'Felodipine', 'Nicardipine', 'Clevidipine'],
    keyPoints: ['Peripheral vasodilation (not cardiac)', 'Reflex tachycardia possible', 'Ankle edema common', 'Grapefruit interaction (CYP3A4)'],
  },
  {
    suffix: '-azepam / -zolam',
    drugClass: 'Benzodiazepines',
    mechanism: 'Enhance GABA-A receptor activity → ↑ Cl⁻ influx → CNS depression',
    examples: ['Diazepam', 'Lorazepam', 'Alprazolam', 'Midazolam', 'Clonazepam'],
    keyPoints: ['LOT: Lorazepam, Oxazepam, Temazepam — no active metabolites (safe in liver disease)', 'Flumazenil = reversal agent', 'Dependence and withdrawal risk'],
  },
  {
    suffix: '-cillin',
    drugClass: 'Penicillins',
    mechanism: 'Inhibit transpeptidase (PBP) → block cell wall cross-linking → bactericidal',
    examples: ['Amoxicillin', 'Ampicillin', 'Piperacillin', 'Nafcillin', 'Oxacillin'],
    keyPoints: ['β-lactam ring', 'Cross-reactivity with cephalosporins (~1-2%)', 'Amoxicillin: most common oral penicillin', 'Piperacillin-tazobactam: broad-spectrum + β-lactamase inhibitor'],
  },
  {
    suffix: '-mycin / -micin',
    drugClass: 'Aminoglycosides / Macrolides',
    mechanism: 'Aminoglycosides: bind 30S ribosome → bactericidal. Macrolides: bind 50S ribosome → bacteriostatic',
    examples: ['Gentamicin', 'Tobramycin', 'Azithromycin', 'Erythromycin', 'Clarithromycin'],
    keyPoints: ['-micin = aminoglycosides (gentamicin, tobramycin): nephrotoxic + ototoxic', '-mycin = macrolides (azithromycin): QT prolongation, GI upset', 'Aminoglycosides: concentration-dependent killing'],
  },
  {
    suffix: '-floxacin',
    drugClass: 'Fluoroquinolones',
    mechanism: 'Inhibit DNA gyrase (gram−) and topoisomerase IV (gram+) → block DNA replication',
    examples: ['Ciprofloxacin', 'Levofloxacin', 'Moxifloxacin', 'Ofloxacin'],
    keyPoints: ['Tendon rupture risk (especially with corticosteroids)', 'QT prolongation', 'Avoid in children (cartilage damage)', 'Chelation with divalent cations (Ca²⁺, Mg²⁺, Fe²⁺)'],
  },
  {
    suffix: '-gliptin',
    drugClass: 'DPP-4 Inhibitors',
    mechanism: 'Inhibit dipeptidyl peptidase-4 → ↑ incretin levels → ↑ insulin, ↓ glucagon (glucose-dependent)',
    examples: ['Sitagliptin', 'Saxagliptin', 'Linagliptin', 'Alogliptin'],
    keyPoints: ['Weight-neutral', 'Low hypoglycemia risk', 'Linagliptin: no renal dose adjustment needed', 'Pancreatitis risk (rare)'],
  },
  {
    suffix: '-flozin',
    drugClass: 'SGLT2 Inhibitors',
    mechanism: 'Inhibit sodium-glucose co-transporter 2 in proximal tubule → ↑ glucosuria → ↓ blood glucose',
    examples: ['Empagliflozin', 'Dapagliflozin', 'Canagliflozin', 'Ertugliflozin'],
    keyPoints: ['Cardiovascular and renal benefits', 'UTI/genital mycotic infection risk', 'Euglycemic DKA risk', 'Weight loss effect'],
  },
  {
    suffix: '-mab',
    drugClass: 'Monoclonal Antibodies',
    mechanism: 'Engineered antibodies targeting specific antigens (varies by drug)',
    examples: ['Adalimumab', 'Infliximab', 'Trastuzumab', 'Rituximab', 'Pembrolizumab'],
    keyPoints: ['-ximab = chimeric, -zumab = humanized, -umab = fully human', 'Infusion reactions common', 'Immunosuppression risk', 'Often require cold-chain storage'],
  },
  {
    suffix: '-pam / -lam',
    drugClass: 'Benzodiazepines (alternate stems)',
    mechanism: 'Positive allosteric modulators of GABA-A receptors',
    examples: ['Clonazepam', 'Alprazolam', 'Triazolam'],
    keyPoints: ['Short-acting: triazolam, midazolam', 'Long-acting: diazepam, chlordiazepoxide', 'Schedule IV controlled substances'],
  },
  {
    suffix: '-setron',
    drugClass: '5-HT3 Receptor Antagonists',
    mechanism: 'Block serotonin 5-HT3 receptors in CTZ and vagal afferents → antiemetic',
    examples: ['Ondansetron', 'Granisetron', 'Palonosetron', 'Dolasetron'],
    keyPoints: ['First-line for chemotherapy-induced nausea', 'QT prolongation risk', 'Constipation and headache common', 'Palonosetron: longest half-life (~40h)'],
  },
  {
    suffix: '-afil',
    drugClass: 'PDE5 Inhibitors',
    mechanism: 'Inhibit phosphodiesterase-5 → ↑ cGMP → smooth muscle relaxation → vasodilation',
    examples: ['Sildenafil', 'Tadalafil', 'Vardenafil', 'Avanafil'],
    keyPoints: ['Contraindicated with nitrates (severe hypotension)', 'Tadalafil: longest duration (~36h)', 'Sildenafil also used for pulmonary arterial hypertension', 'Visual disturbances possible'],
  },
  {
    suffix: '-oxetine',
    drugClass: 'SNRIs / SSRIs',
    mechanism: 'Inhibit reuptake of serotonin (and norepinephrine for SNRIs)',
    examples: ['Fluoxetine', 'Paroxetine', 'Duloxetine', 'Venlafaxine'],
    keyPoints: ['Fluoxetine: longest half-life SSRI, strong CYP2D6 inhibitor', 'Paroxetine: most anticholinergic SSRI, weight gain', 'Duloxetine: also for neuropathic pain, fibromyalgia', 'Serotonin syndrome risk with MAOIs'],
  },
];
