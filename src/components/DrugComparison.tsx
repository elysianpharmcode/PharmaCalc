import React, { useState } from 'react';
import { ArrowLeftRight, Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';
import { drugComparisons } from '../data/drugComparisons';

export function DrugComparison() {
  const [selectedGroup, setSelectedGroup] = useState(0);
  const [expandedPearl, setExpandedPearl] = useState(true);

  const group = drugComparisons[selectedGroup];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-navy rounded-2xl p-6">
        <div className="flex items-start gap-3">
          <ArrowLeftRight className="text-gold mt-0.5 shrink-0" size={20} />
          <div>
            <h2 className="text-lg font-semibold text-white mb-1">Drug Comparison Tables</h2>
            <p className="text-sm text-white/70">
              Side-by-side comparison of drugs within the same class. See exactly what makes each drug unique —
              the differences that show up on exams and matter in practice.
            </p>
          </div>
        </div>
      </div>

      {/* Class Selector */}
      <div className="flex flex-wrap gap-2">
        {drugComparisons.map((g, i) => (
          <button
            key={g.className}
            onClick={() => setSelectedGroup(i)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all border ${
              selectedGroup === i
                ? 'bg-blue text-white border-blue'
                : 'bg-white text-gray-500 border-gray-200 hover:border-blue-200'
            }`}
          >
            {g.className.split('(')[0].trim()}
          </button>
        ))}
      </div>

      {/* Comparison Table */}
      <div className="card overflow-hidden p-0">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-semibold text-dark">{group.className}</h3>
          <p className="text-sm text-gray-500 mt-0.5">{group.description}</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left py-3 px-4 text-gray-500 font-semibold sticky left-0 bg-gray-50 z-10 min-w-[120px]">Drug</th>
                {group.properties.map((prop) => (
                  <th key={prop} className="text-left py-3 px-4 text-gray-500 font-medium min-w-[150px]">{prop}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {group.drugs.map((drug, i) => (
                <tr key={drug.name} className={`border-b border-gray-50 hover:bg-blue-50/50 ${i % 2 === 0 ? '' : 'bg-gray-50/50'}`}>
                  <td className="py-3 px-4 font-semibold text-dark sticky left-0 bg-white z-10 border-r border-gray-100">
                    {drug.name}
                  </td>
                  {group.properties.map((prop) => {
                    const value = drug.properties[prop] || '—';
                    const isHighlight = value.includes('YES') || value.includes('Highest') || value.includes('specific');
                    const isWarning = value.includes('high)') || value.includes('Weight gain') || value.includes('CONTRAINDICATED');
                    return (
                      <td key={prop} className={`py-3 px-4 ${isHighlight ? 'text-emerald-600 font-medium' : isWarning ? 'text-amber-600' : 'text-gray-600'}`}>
                        {value}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Clinical Pearl */}
      <div className="bg-gold/20 border border-gold rounded-xl p-5">
        <button onClick={() => setExpandedPearl(!expandedPearl)} className="w-full flex items-center justify-between text-left">
          <div className="flex items-center gap-2">
            <Lightbulb size={16} className="text-amber-600" />
            <span className="font-semibold text-amber-700 text-sm">Clinical Pearl</span>
          </div>
          {expandedPearl ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
        </button>
        {expandedPearl && (
          <p className="text-sm text-gray-700 mt-3 leading-relaxed">{group.clinicalPearl}</p>
        )}
      </div>
    </div>
  );
}
