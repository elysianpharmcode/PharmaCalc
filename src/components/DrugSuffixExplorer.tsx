import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, ChevronUp, Lightbulb, Tag } from 'lucide-react';
import { drugSuffixes } from '../data/drugDatabase';

export function DrugSuffixExplorer() {
  const [search, setSearch] = useState('');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [mode, setMode] = useState<'suffix' | 'drug'>('suffix');

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return drugSuffixes;
    return drugSuffixes.filter((s) => {
      if (mode === 'suffix') {
        return s.suffix.toLowerCase().includes(q) || s.drugClass.toLowerCase().includes(q);
      }
      return (
        s.examples.some((e) => e.toLowerCase().includes(q)) ||
        s.suffix.toLowerCase().includes(q) ||
        s.drugClass.toLowerCase().includes(q) ||
        s.mechanism.toLowerCase().includes(q)
      );
    });
  }, [search, mode]);

  const tagColors = [
    'bg-blue/10 text-blue border-blue/20',
    'bg-navy/10 text-navy border-navy/20',
    'bg-purple-500/10 text-purple-600 border-purple-500/20',
    'bg-amber-500/10 text-amber-600 border-amber-500/20',
    'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
    'bg-rose-500/10 text-rose-600 border-rose-500/20',
  ];

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="bg-navy rounded-2xl p-6">
        <div className="flex items-start gap-3">
          <Lightbulb className="text-gold mt-1 shrink-0" size={20} />
          <div>
            <h2 className="text-lg font-semibold text-white mb-1">Drug Stem Explorer</h2>
            <p className="text-sm text-white/70">
              Type a drug name like <span className="text-gold font-mono">metoprolol</span> and instantly see its class, mechanism, and related drugs.
              Or search by suffix like <span className="text-gold font-mono">-olol</span> to explore an entire drug family.
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={mode === 'suffix' ? 'Search by suffix (e.g., -olol, -pril, -statin)...' : 'Search by drug name (e.g., metoprolol, lisinopril)...'}
            className="input-field pl-10"
            aria-label="Search drugs or suffixes"
          />
        </div>
        <div className="flex gap-2">
          <button onClick={() => setMode('suffix')} className={mode === 'suffix' ? 'btn-primary' : 'btn-secondary'}>By Suffix</button>
          <button onClick={() => setMode('drug')} className={mode === 'drug' ? 'btn-primary' : 'btn-secondary'}>By Drug Name</button>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="card text-center py-12 text-gray-400">
            <Tag size={32} className="mx-auto mb-3 opacity-50" />
            <p>No matches found. Try a different search term.</p>
          </div>
        )}
        {filtered.map((item, idx) => {
          const isExpanded = expandedIndex === idx;
          return (
            <div key={item.suffix} className="card hover:border-blue-200 hover:shadow-md transition-all">
              <button onClick={() => setExpandedIndex(isExpanded ? null : idx)} className="w-full text-left" aria-expanded={isExpanded}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className={`badge border ${tagColors[idx % tagColors.length]} font-mono text-sm px-3 py-1`}>{item.suffix}</span>
                    <span className="font-semibold text-dark">{item.drugClass}</span>
                  </div>
                  {isExpanded ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
                </div>
                <p className="text-sm text-gray-500 mt-2">{item.mechanism}</p>
              </button>

              {isExpanded && (
                <div className="mt-4 pt-4 border-t border-gray-100 space-y-4">
                  <div>
                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Example Drugs</h4>
                    <div className="flex flex-wrap gap-2">
                      {item.examples.map((drug) => (
                        <span key={drug} className="bg-blue-50 text-navy px-3 py-1 rounded-lg text-sm border border-blue-100 font-medium">{drug}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">High-Yield Points</h4>
                    <ul className="space-y-1.5">
                      {item.keyPoints.map((point, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="text-blue mt-0.5">▸</span>{point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
