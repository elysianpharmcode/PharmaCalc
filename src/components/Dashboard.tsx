import React, { useState } from 'react';
import {
  Pill, Calculator, GitBranch, BookOpen, FlaskConical,
  Search, TrendingDown, ArrowLeftRight, ArrowLeft
} from 'lucide-react';
import { DrugSuffixExplorer } from './DrugSuffixExplorer';
import { PKCalculator } from './PKCalculator';
import { PKCurveVisualizer } from './PKCurveVisualizer';
import { InteractionChecker } from './InteractionChecker';
import { DoseAdjuster } from './DoseAdjuster';
import { DrugComparison } from './DrugComparison';
import { QuickReference } from './QuickReference';

type Tab = 'suffix' | 'pk' | 'curves' | 'interactions' | 'dose' | 'compare' | 'reference';

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'suffix', label: 'Drug Stems', icon: <Search size={18} /> },
  { id: 'pk', label: 'PK Calculator', icon: <Calculator size={18} /> },
  { id: 'curves', label: 'PK Curves', icon: <TrendingDown size={18} /> },
  { id: 'interactions', label: 'Interactions', icon: <GitBranch size={18} /> },
  { id: 'dose', label: 'Dose Adjust', icon: <FlaskConical size={18} /> },
  { id: 'compare', label: 'Compare', icon: <ArrowLeftRight size={18} /> },
  { id: 'reference', label: 'Quick Ref', icon: <BookOpen size={18} /> },
];

interface Props {
  onBack: () => void;
}

export function Dashboard({ onBack }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('suffix');

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-inter">
      {/* Header */}
      <header className="bg-navy sticky top-0 z-50">
        <div className="max-w-[1480px] mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <button
                onClick={onBack}
                className="text-white/60 hover:text-white transition-colors p-1"
                aria-label="Back to home"
              >
                <ArrowLeft size={20} />
              </button>
              <div className="bg-blue/20 p-1.5 rounded-lg">
                <Pill className="text-white" size={18} />
              </div>
              <span className="text-white font-bold text-lg">PharmaCalc Pro</span>
            </div>
            <span className="hidden sm:inline text-xs text-white/40 bg-white/5 px-3 py-1 rounded-full border border-white/10">
              For educational use only
            </span>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-16 z-40 shadow-sm">
        <div className="max-w-[1480px] mx-auto px-4 sm:px-6">
          <div className="flex gap-1 overflow-x-auto py-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue text-white shadow-sm'
                    : 'text-gray-500 hover:text-dark hover:bg-gray-100'
                }`}
                aria-selected={activeTab === tab.id}
                role="tab"
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-[1480px] mx-auto w-full px-4 sm:px-6 py-6">
        {activeTab === 'suffix' && <DrugSuffixExplorer />}
        {activeTab === 'pk' && <PKCalculator />}
        {activeTab === 'curves' && <PKCurveVisualizer />}
        {activeTab === 'interactions' && <InteractionChecker />}
        {activeTab === 'dose' && <DoseAdjuster />}
        {activeTab === 'compare' && <DrugComparison />}
        {activeTab === 'reference' && <QuickReference />}
      </main>

      {/* Footer */}
      <footer className="bg-navy py-4 text-center text-xs text-white/40">
        PharmaCalc Pro — Built for pharmacy students. Not a substitute for clinical judgment.
      </footer>
    </div>
  );
}
