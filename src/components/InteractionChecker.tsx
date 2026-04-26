import React, { useState, useMemo } from 'react';
import { AlertTriangle, Search, Shield, ShieldAlert, ShieldCheck, Zap, ArrowRight } from 'lucide-react';
import { drugInteractions, type Interaction } from '../data/drugInteractions';

const severityConfig = {
  major: { color: 'text-red-600', bg: 'bg-red-50 border-red-200', icon: ShieldAlert, label: 'Major' },
  moderate: { color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200', icon: Shield, label: 'Moderate' },
  minor: { color: 'text-blue-600', bg: 'bg-blue-50 border-blue-200', icon: ShieldCheck, label: 'Minor' },
};

export function InteractionChecker() {
  const [search, setSearch] = useState('');
  const [severityFilter, setSeverityFilter] = useState<'all' | 'major' | 'moderate' | 'minor'>('all');

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return drugInteractions.filter((i) => {
      const matchesSeverity = severityFilter === 'all' || i.severity === severityFilter;
      if (!q) return matchesSeverity;
      const matchesSearch =
        i.drug1.toLowerCase().includes(q) ||
        i.drug2.toLowerCase().includes(q) ||
        i.mechanism.toLowerCase().includes(q) ||
        (i.cypInvolved?.toLowerCase().includes(q) ?? false);
      return matchesSeverity && matchesSearch;
    });
  }, [search, severityFilter]);

  // Get all unique drugs for the "quick pick" feature
  const allDrugs = useMemo(() => {
    const set = new Set<string>();
    drugInteractions.forEach((i) => { set.add(i.drug1); set.add(i.drug2); });
    return Array.from(set).sort();
  }, []);

  return (
    <div className="space-y-6">
      {/* Info Banner */}
      <div className="bg-navy rounded-2xl p-6">
        <div className="flex items-start gap-3">
          <Zap className="text-gold mt-0.5 shrink-0" size={20} />
          <div>
            <h2 className="text-lg font-semibold text-white mb-1">Drug Interaction Reasoning Engine</h2>
            <p className="text-sm text-white/70">
              Unlike simple interaction checkers, this tool explains <span className="text-gold">why</span> drugs interact — the CYP enzymes involved,
              the pharmacodynamic mechanisms, and what to do about it. Search by drug name or CYP enzyme.
            </p>
          </div>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by drug name, mechanism, or CYP enzyme (e.g., warfarin, CYP3A4)..."
            className="input-field pl-10"
            aria-label="Search drug interactions"
          />
        </div>
        <div className="flex gap-2">
          {(['all', 'major', 'moderate', 'minor'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSeverityFilter(s)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                severityFilter === s
                  ? s === 'all' ? 'bg-blue text-white'
                    : `${severityConfig[s].bg} ${severityConfig[s].color} border`
                  : 'bg-white text-gray-500 border border-gray-200 hover:border-gray-300'
              }`}
            >
              {s === 'all' ? 'All' : severityConfig[s].label}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Drug Picks */}
      <div>
        <p className="text-xs text-gray-500 mb-2">Quick search:</p>
        <div className="flex flex-wrap gap-1.5">
          {allDrugs.slice(0, 16).map((drug) => (
            <button
              key={drug}
              onClick={() => setSearch(drug)}
              className="text-xs bg-gray-50 hover:bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md border border-gray-200 transition-colors"
            >
              {drug}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        {filtered.length === 0 && (
          <div className="card text-center py-12 text-gray-400">
            <AlertTriangle size={32} className="mx-auto mb-3 opacity-50" />
            <p>No interactions found for this search.</p>
          </div>
        )}
        {filtered.map((interaction, idx) => (
          <InteractionCard key={idx} interaction={interaction} searchTerm={search} />
        ))}
      </div>
    </div>
  );
}

function InteractionCard({ interaction, searchTerm }: { interaction: Interaction; searchTerm: string }) {
  const [expanded, setExpanded] = useState(false);
  const config = severityConfig[interaction.severity];
  const Icon = config.icon;

  return (
    <div className={`card border ${expanded ? config.bg : 'hover:border-blue-200 hover:shadow-md'} transition-all`}>
      <button onClick={() => setExpanded(!expanded)} className="w-full text-left">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-wrap">
            <Icon size={18} className={config.color} />
            <span className="font-semibold text-dark">{interaction.drug1}</span>
            <ArrowRight size={14} className="text-gray-300" />
            <span className="font-semibold text-dark">{interaction.drug2}</span>
            <span className={`badge border ${config.bg} ${config.color}`}>
              {config.label}
            </span>
            {interaction.cypInvolved && (
              <span className="badge bg-purple-50 text-purple-600 border border-purple-200">
                {interaction.cypInvolved}
              </span>
            )}
          </div>
        </div>
      </button>

      {expanded && (
        <div className="mt-4 pt-4 border-t border-gray-100 space-y-4">
          <Section title="Mechanism (Why?)" color="text-blue-400">
            {interaction.mechanism}
          </Section>
          <Section title="Clinical Effect (What happens?)" color="text-amber-400">
            {interaction.clinicalEffect}
          </Section>
          <Section title="Management (What to do?)" color="text-emerald-400">
            {interaction.management}
          </Section>
        </div>
      )}
    </div>
  );
}

function Section({ title, color, children }: { title: string; color: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className={`text-xs font-semibold uppercase tracking-wider mb-1.5 ${color}`}>{title}</h4>
      <p className="text-sm text-gray-600 leading-relaxed">{children}</p>
    </div>
  );
}
