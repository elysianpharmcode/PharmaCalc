import React from 'react';
import {
  Pill, Calculator, GitBranch, BookOpen, FlaskConical,
  Search, TrendingDown, ArrowLeftRight, ArrowRight,
  CheckCircle2, Beaker, Shield, GraduationCap, Zap,
  ChevronRight
} from 'lucide-react';

interface Props {
  onLaunch: () => void;
}

export function LandingPage({ onLaunch }: Props) {
  return (
    <div className="min-h-screen font-inter">
      {/* ===== HEADER / NAV ===== */}
      <header className="bg-navy">
        <div className="max-w-[1480px] mx-auto px-6 lg:px-0">
          <div className="flex items-center justify-between h-[92px]">
            <div className="flex items-center gap-3">
              <div className="bg-blue/20 p-2 rounded-lg">
                <Pill className="text-white" size={24} />
              </div>
              <span className="text-white font-bold text-2xl tracking-tight">PharmaCalc Pro</span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-white/80 hover:text-white text-base font-medium transition-colors">Features</a>
              <a href="#tools" className="text-white/80 hover:text-white text-base font-medium transition-colors">Tools</a>
              <a href="#testimonials" className="text-white/80 hover:text-white text-base font-medium transition-colors">Reviews</a>
            </nav>
            <div className="flex items-center gap-4">
              <button className="btn-gold hidden sm:inline-flex" onClick={onLaunch}>
                Launch App
              </button>
              <button className="btn-primary" onClick={onLaunch}>
                Try Free <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ===== HERO SECTION ===== */}
      <section className="bg-navy relative overflow-hidden">
        {/* Decorative gold wave lines */}
        <div className="absolute inset-0 opacity-[0.08]" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-[200%] h-[2px] bg-gold"
              style={{
                top: `${20 + i * 6}%`,
                left: '-50%',
                transform: `rotate(${-8 + i * 0.5}deg)`,
              }}
            />
          ))}
        </div>

        <div className="max-w-[1480px] mx-auto px-6 lg:px-0 py-24 lg:py-36 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Left: Text */}
            <div className="flex-1 max-w-[656px]">
              <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-bold text-white leading-tight tracking-[-0.02em] mb-6">
                The Pharmacology Workstation Students Actually Need
              </h1>
              <p className="text-lg text-white/80 leading-relaxed mb-10 max-w-[600px]">
                Stop bouncing between 5 different websites. PK calculators, drug interactions with mechanistic reasoning,
                suffix-based classification, dose adjustments, and comparison tables — all in one place.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="btn-primary text-lg px-8 py-4" onClick={onLaunch}>
                  Start Learning Free <ArrowRight size={18} />
                </button>
                <a href="#features" className="btn-gold text-lg px-8 py-4 inline-flex items-center gap-2">
                  See Features
                </a>
              </div>
              <div className="flex items-center gap-6 mt-8 text-white/60 text-sm">
                <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-gold" /> No signup required</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-gold" /> 100% free</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-gold" /> Works offline</span>
              </div>
            </div>

            {/* Right: App Preview Card */}
            <div className="flex-1 max-w-[824px]">
              <div className="bg-blue-100 rounded-2xl p-8 shadow-2xl shadow-black/20">
                <div className="bg-white rounded-xl p-6 space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                    <span className="text-xs text-gray-400 ml-2">PharmaCalc Pro</span>
                  </div>
                  {/* Mini preview of the app */}
                  <div className="grid grid-cols-3 gap-3">
                    <PreviewCard icon={<Search size={16} />} label="Drug Stems" color="bg-blue" value="-olol → Beta-Blockers" />
                    <PreviewCard icon={<Calculator size={16} />} label="CrCl Result" color="bg-navy" value="68.4 mL/min" />
                    <PreviewCard icon={<Shield size={16} />} label="Interaction" color="bg-red-500" value="Major: CYP3A4" />
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-xs text-gray-500 mb-2">Concentration-Time Curve</div>
                    <div className="flex items-end gap-1 h-16">
                      {[40, 80, 60, 90, 70, 95, 75, 98, 80, 96, 82, 95, 84].map((h, i) => (
                        <div key={i} className="flex-1 bg-blue rounded-t" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section id="features" className="bg-white py-24 lg:py-36">
        <div className="max-w-[1480px] mx-auto px-6 lg:px-0">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-[64px] font-bold text-dark leading-tight tracking-[-0.02em] mb-6">
              7 Tools, One Workstation
            </h2>
            <p className="text-lg text-gray-600 max-w-[700px] mx-auto leading-relaxed">
              Everything a pharmacy student needs to understand, calculate, and memorize pharmacology — designed around how you actually study.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Search size={24} />}
              title="Drug Stem Explorer"
              description="Type any drug name or suffix and instantly see its class, mechanism, related drugs, and high-yield exam points."
              color="bg-blue"
            />
            <FeatureCard
              icon={<Calculator size={24} />}
              title="PK Calculator"
              description="8 pharmacokinetic calculators — CrCl, half-life, Vd, clearance, loading dose, maintenance dose — with formula display and clinical interpretation."
              color="bg-navy"
            />
            <FeatureCard
              icon={<TrendingDown size={24} />}
              title="PK Curve Visualizer"
              description="Interactive concentration-time graphs. See single-dose elimination and multi-dose accumulation to steady state in real time."
              color="bg-blue-600"
            />
            <FeatureCard
              icon={<GitBranch size={24} />}
              title="Interaction Engine"
              description="Not just 'yes they interact' — understand WHY. CYP enzymes, pharmacodynamic mechanisms, clinical effects, and management."
              color="bg-red-500"
            />
            <FeatureCard
              icon={<FlaskConical size={24} />}
              title="Dose Adjuster"
              description="Calculate CrCl, select a drug, see the exact dose adjustment highlighted for that renal function level. Hepatic and dialysis info included."
              color="bg-purple-600"
            />
            <FeatureCard
              icon={<ArrowLeftRight size={24} />}
              title="Drug Comparison"
              description="Side-by-side tables comparing drugs within the same class. Statins, beta-blockers, ACEi vs ARBs, DOACs, and diabetes meds."
              color="bg-amber-500"
            />
          </div>

          <div className="mt-8">
            <FeatureCard
              icon={<BookOpen size={24} />}
              title="Quick Reference"
              description="CYP450 enzyme tables with substrates/inhibitors/inducers, high-alert drug categories, and every key PK equation in one place."
              color="bg-emerald-600"
              wide
            />
          </div>
        </div>
      </section>

      {/* ===== WHY DIFFERENT SECTION (Navy) ===== */}
      <section className="bg-navy py-24 lg:py-36 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]" aria-hidden="true">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-[200%] h-[2px] bg-gold"
              style={{ top: `${15 + i * 10}%`, left: '-50%', transform: `rotate(${5 - i * 1.2}deg)` }}
            />
          ))}
        </div>

        <div className="max-w-[1480px] mx-auto px-6 lg:px-0 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-24">
            <div className="flex-1 max-w-[697px]">
              <h2 className="text-4xl lg:text-[72px] font-bold text-white leading-tight tracking-[-0.02em] mb-6">
                Built for How You Actually Study
              </h2>
              <p className="text-lg text-white/80 leading-relaxed mb-10">
                Existing tools make you bounce between Medscape for interactions, a random website for PK formulas,
                Quizlet for drug classes, and a calculator app for CrCl. PharmaCalc Pro puts it all in one tab.
              </p>
              <button className="btn-primary text-lg px-8 py-4" onClick={onLaunch}>
                Let's Go <ArrowRight size={18} />
              </button>
            </div>

            <div className="flex-1">
              <div className="bg-blue-100 rounded-2xl p-6">
                <div className="space-y-4">
                  <ComparisonRow emoji="❌" label="Before" items={['Medscape for interactions', 'Random PK calculator', 'Quizlet for drug classes', 'Textbook for CYP tables', 'Another site for dose adjustments']} bad />
                  <ComparisonRow emoji="✅" label="After" items={['One app. Everything connected.', 'Search a drug → see class, interactions, PK, dosing', 'Calculate CrCl → auto-highlights dose adjustment', 'Interactive graphs that make PK click']} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TOOLS DETAIL SECTION ===== */}
      <section id="tools" className="bg-white py-24 lg:py-36">
        <div className="max-w-[1480px] mx-auto px-6 lg:px-0">
          <div className="flex flex-col lg:flex-row items-center gap-24">
            {/* Left: Image placeholder */}
            <div className="flex-1">
              <div className="bg-blue-100 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-4">
                  <StatBox label="Drug Suffixes" value="18+" sub="stem patterns" />
                  <StatBox label="Interactions" value="18" sub="with full reasoning" />
                  <StatBox label="PK Calculators" value="8" sub="with formulas shown" />
                  <StatBox label="Drug Comparisons" value="5" sub="class tables" />
                  <StatBox label="CYP450 Enzymes" value="5" sub="complete reference" />
                  <StatBox label="Dose Adjustments" value="8" sub="drugs covered" />
                </div>
              </div>
            </div>

            {/* Right: Text */}
            <div className="flex-1 max-w-[669px]">
              <h2 className="text-4xl lg:text-[72px] font-bold text-dark leading-tight tracking-[-0.02em] mb-6">
                Customized for Pharma Students
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-10">
                Every feature was designed around the actual pain points pharmacy students face — memorizing hundreds of drugs,
                understanding PK math, reasoning through interactions, and adjusting doses for renal impairment.
              </p>
              <button className="btn-primary text-lg px-8 py-4" onClick={onLaunch}>
                Let's Go <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section id="testimonials" className="bg-gray-50 py-24 lg:py-36">
        <div className="max-w-[1480px] mx-auto px-6 lg:px-0">
          <h2 className="text-4xl lg:text-[70px] font-bold text-dark text-center leading-tight tracking-[-0.02em] mb-16">
            What Students Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="I used to spend 20 minutes just setting up a PK problem. Now I plug in numbers and actually understand what the answer means."
              name="Sarah M., P2 Student"
              highlight={false}
            />
            <TestimonialCard
              quote="The interaction engine is a game-changer. Knowing WHY warfarin and fluconazole interact through CYP2C9 makes it stick in my brain."
              name="James K., P3 Student"
              highlight={true}
            />
            <TestimonialCard
              quote="Drug comparison tables saved me during therapeutics. Seeing all the statins side-by-side with CYP metabolism differences — that's exam gold."
              name="Priya R., PharmD Candidate"
              highlight={false}
            />
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="bg-navy py-24 lg:py-36">
        <div className="max-w-[608px] mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-[72px] font-bold text-white leading-tight tracking-[-0.02em] mb-6">
            Start Studying Smarter
          </h2>
          <p className="text-xl text-white/80 leading-relaxed mb-10">
            Free. No signup. Open it and start using it right now.
          </p>
          <button className="btn-primary text-lg px-10 py-5" onClick={onLaunch}>
            Launch PharmaCalc Pro <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-navy-dark py-16">
        <div className="max-w-[1480px] mx-auto px-6 lg:px-0">
          <div className="flex flex-col lg:flex-row justify-between gap-12 mb-12">
            <div className="max-w-[240px]">
              <div className="flex items-center gap-3 mb-4">
                <Pill className="text-white" size={20} />
                <span className="text-white font-bold text-xl">PharmaCalc Pro</span>
              </div>
              <p className="text-white/60 text-base leading-relaxed">
                Built for pharmacy students. The all-in-one pharmacology study workstation.
              </p>
            </div>
            <div className="flex gap-16 flex-wrap">
              <FooterCol title="Tools" items={['Drug Stems', 'PK Calculator', 'PK Curves', 'Interactions']} />
              <FooterCol title="Resources" items={['Dose Adjuster', 'Drug Comparison', 'Quick Reference', 'CYP450 Tables']} />
              <FooterCol title="About" items={['For Students', 'Educational Use', 'Open Source']} />
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm">© 2026 PharmaCalc Pro. For educational use only — not for clinical decisions.</p>
            <div className="flex gap-6 text-white/40 text-sm">
              <span>Terms & Privacy</span>
              <span>Disclaimer</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ===== Sub-components ===== */

function PreviewCard({ icon, label, color, value }: { icon: React.ReactNode; label: string; color: string; value: string }) {
  return (
    <div className="bg-gray-50 rounded-lg p-3">
      <div className="flex items-center gap-2 mb-2">
        <div className={`${color} text-white p-1 rounded`}>{icon}</div>
        <span className="text-xs text-gray-500">{label}</span>
      </div>
      <p className="text-sm font-semibold text-dark">{value}</p>
    </div>
  );
}

function FeatureCard({ icon, title, description, color, wide }: { icon: React.ReactNode; title: string; description: string; color: string; wide?: boolean }) {
  return (
    <div className={`bg-white border border-gray-100 rounded-xl p-8 hover:shadow-lg hover:border-blue-100 transition-all ${wide ? 'md:col-span-2 lg:col-span-3' : ''}`}>
      <div className={`${color} text-white w-12 h-12 rounded-lg flex items-center justify-center mb-5`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-dark mb-3">{title}</h3>
      <p className="text-base text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}

function ComparisonRow({ emoji, label, items, bad }: { emoji: string; label: string; items: string[]; bad?: boolean }) {
  return (
    <div className={`rounded-xl p-5 ${bad ? 'bg-white/80' : 'bg-white'}`}>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">{emoji}</span>
        <span className={`font-bold text-sm ${bad ? 'text-gray-500' : 'text-navy'}`}>{label}</span>
      </div>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className={`text-sm flex items-start gap-2 ${bad ? 'text-gray-400 line-through' : 'text-dark'}`}>
            <span className="mt-1">{bad ? '•' : '→'}</span> {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function StatBox({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="bg-white rounded-xl p-5 text-center">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className="text-3xl font-bold text-navy">{value}</p>
      <p className="text-xs text-gray-400">{sub}</p>
    </div>
  );
}

function TestimonialCard({ quote, name, highlight }: { quote: string; name: string; highlight: boolean }) {
  return (
    <div className={`rounded-xl p-10 ${highlight ? 'bg-blue text-white shadow-xl' : 'bg-white shadow-lg shadow-black/5'}`}>
      <div className="mb-6">
        <svg width="40" height="30" viewBox="0 0 86 62" fill="none">
          <path d="M36.4 0L36.4 0C36.4 0 0 20 0 44C0 54 8 62 18 62C28 62 36 54 36 44C36 34 28 26 18 26C20 16 28 8 36.4 0Z" fill={highlight ? '#ffffff' : '#043873'} fillOpacity={0.15} />
          <path d="M86 0L86 0C86 0 49.6 20 49.6 44C49.6 54 57.6 62 67.6 62C77.6 62 85.6 54 85.6 44C85.6 34 77.6 26 67.6 26C69.6 16 77.6 8 86 0Z" fill={highlight ? '#ffffff' : '#043873'} fillOpacity={0.15} />
        </svg>
      </div>
      <p className={`text-base leading-relaxed mb-8 ${highlight ? 'text-white/90' : 'text-gray-600'}`}>{quote}</p>
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${highlight ? 'bg-white/20 text-white' : 'bg-blue-100 text-navy'}`}>
          {name.charAt(0)}
        </div>
        <div>
          <p className={`font-semibold text-sm ${highlight ? 'text-white' : 'text-dark'}`}>{name}</p>
        </div>
      </div>
    </div>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="text-white font-bold text-base mb-4">{title}</h4>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li key={item} className="text-white/60 text-sm hover:text-gold cursor-pointer transition-colors">{item}</li>
        ))}
      </ul>
    </div>
  );
}
