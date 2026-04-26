# 💊 PharmaCalc Pro

**The All-in-One Pharmacology Study Workstation for Pharmacy Students**

Stop bouncing between 5 different websites. PK calculators, drug interactions with mechanistic reasoning, suffix-based classification, dose adjustments, and comparison tables — all in one place.

---

## 🚀 Features

### 1. Drug Stem Explorer
Type any drug name (e.g., `metoprolol`) or suffix (e.g., `-olol`) and instantly see its class, mechanism of action, related drugs, and high-yield exam points. Covers 18+ stem patterns across all major drug families.

### 2. PK Calculator
8 pharmacokinetic calculators with full formula display and clinical interpretation:
- **Creatinine Clearance (CrCl)** — Cockcroft-Gault equation
- **Half-Life ↔ ke** — Convert between elimination half-life and rate constant
- **Volume of Distribution (Vd)** — Apparent volume relating dose to concentration
- **Total Body Clearance** — From Dose/AUC or ke × Vd
- **Loading Dose** — Immediately achieve target concentration
- **Maintenance Dose** — Maintain steady-state concentration
- **Steady-State Concentration** — Average Css from dose, clearance, and interval
- **Ideal Body Weight (IBW)** — Devine formula for dosing calculations

### 3. PK Curve Visualizer
Interactive concentration-time graphs with drug presets (Vancomycin, Gentamicin, Digoxin, Theophylline):
- **Single-dose elimination** — Exponential decay with half-life markers
- **Multi-dose accumulation** — Sawtooth pattern showing steady-state approach
- **Therapeutic window** overlay (min/max reference lines)
- Real-time parameter adjustment with instant graph updates

### 4. Drug Interaction Reasoning Engine
18 high-yield drug-drug interactions with full mechanistic reasoning — not just "yes they interact" but **why**:
- CYP enzyme involvement (CYP3A4, CYP2C9, CYP2C19, CYP2D6)
- Pharmacodynamic mechanisms
- Clinical effects and consequences
- Management strategies and alternatives
- Filter by severity (Major / Moderate / Minor)

### 5. Renal Dose Adjuster
Calculate a patient's CrCl, select a drug, and see the exact dose adjustment highlighted:
- 8 commonly-tested drugs with complete dosing tables
- Renal, hepatic, and dialysis dosing guidelines
- Auto-highlights the matching row based on calculated CrCl
- Clinical pearls for each drug

### 6. Drug Comparison Tables
Side-by-side comparison of drugs within the same class:
- **Statins** — Potency, CYP metabolism, hydrophilicity, dose timing
- **ACE Inhibitors vs ARBs** — Mechanism, cough, angioedema, prodrug status
- **Beta-Blockers** — Selectivity, ISA, lipophilicity, HF-approved agents
- **Oral Anticoagulants** — Warfarin vs DOACs with reversal agents
- **Diabetes Medications** — Mechanism, hypo risk, weight effects, CV benefits

### 7. Quick Reference
Three essential reference tables:
- **CYP450 Enzymes** — Substrates, inhibitors, inducers, and mnemonics for CYP3A4, CYP2D6, CYP2C9, CYP2C19, CYP1A2
- **High-Alert Drugs** — Categories, risks, and monitoring parameters
- **Key Equations** — Every pharmacokinetic and clinical formula in one place

---

## 🛠️ Tech Stack

- **React 18** + **TypeScript**
- **Vite** — Fast build tooling
- **Tailwind CSS** — Utility-first styling
- **Recharts** — Interactive concentration-time graphs
- **Lucide React** — Clean icon set

---

## 📦 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/elysianpharmcode/PharmaCalc.git
cd PharmaCalc

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
PharmaCalc/
├── src/
│   ├── components/
│   │   ├── LandingPage.tsx          # Marketing landing page
│   │   ├── Dashboard.tsx            # App shell with tab navigation
│   │   ├── DrugSuffixExplorer.tsx   # Suffix → Class → Mechanism search
│   │   ├── PKCalculator.tsx         # 8 pharmacokinetic calculators
│   │   ├── PKCurveVisualizer.tsx    # Concentration-time graphs
│   │   ├── InteractionChecker.tsx   # Drug interaction reasoning engine
│   │   ├── DoseAdjuster.tsx         # Renal dose adjustment tool
│   │   ├── DrugComparison.tsx       # Within-class comparison tables
│   │   └── QuickReference.tsx       # CYP450, high-alert drugs, equations
│   ├── data/
│   │   ├── drugDatabase.ts          # Drug suffix/stem reference data
│   │   ├── drugInteractions.ts      # Interaction database with mechanisms
│   │   ├── drugComparisons.ts       # Within-class comparison data
│   │   └── pkFormulas.ts            # Pharmacokinetic calculation engine
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 🎨 Design

The UI follows a clean, professional design system:
- **Navy** (`#043873`) — Headers, hero sections, dark panels
- **Blue** (`#4F9CF9`) — Buttons, active states, interactive elements
- **Gold** (`#FFE492`) — Accents, highlights, clinical pearls
- **White** (`#FFFFFF`) — Content areas, cards
- **Inter** font family throughout

---

## ⚠️ Disclaimer

**PharmaCalc Pro is for educational use only.** It is not a substitute for clinical judgment, official drug references, or professional medical advice. Always verify drug information with authoritative sources (e.g., Lexicomp, Micromedex, package inserts) before making clinical decisions.

---

## 📄 License

MIT License — free to use, modify, and distribute.

---

Built with ❤️ for pharmacy students everywhere.
