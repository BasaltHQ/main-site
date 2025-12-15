import { Check, Layers, Sliders, Sparkles, TrendingUp, Target, Shield, Zap, Users, Brain } from "lucide-react";

export function AboutSection() {
  return (
    <section id="vision" className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 bg-[#020609]">
      <div className="glass-pane rounded-3xl ring-1 ring-cyan-900/30 p-8 md:p-12 bg-cyan-950/20 backdrop-blur-md">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">Democratizing the Ontology</h2>
        <div className="text-[11px] uppercase tracking-wider text-red-500 opacity-80 font-mono mb-8 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          MISSION_STATUS: ACTIVE
        </div>

        <div className="prose prose-invert max-w-none text-cyan-200/60 space-y-6 text-lg leading-relaxed">
          <p>
            <span className="text-white font-semibold">Intelligence is power.</span> For too long, the Fortune 500 has hoarded the world's most advanced ontologies—digital twins that allow them to model, predict, and control markets with god-like efficiency. Companies like Palantir built the weapons for Wall Street.
          </p>
          <p>
            <span className="text-white font-semibold">We built the weapon for you.</span> Ledger1 is not just "software". It is a pre-packaged, AI-driven Ontology designed specifically for Main Street. We have taken the same comprehensive "Object-Action-Decision" architecture used by trillion-dollar asset managers and compressed it into an accessible, autonomous operating system.
          </p>
          <p>
            By digitizing your reality into <span className="text-teal-400 font-mono text-sm">Objects</span>, <span className="text-red-400 font-mono text-sm">Actions</span>, and <span className="text-slate-200 font-mono text-sm">Decisions</span>, we give you the same analytical supremacy. Whether you are running a restaurant chain, a retail empire, or a service fleet, the Main Street Ontology levels the battlefield.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="group rounded-xl p-6 bg-cyan-950/30 border border-cyan-900/30 hover:border-teal-500/30 transition-all hover:-translate-y-1">
            <div className="mb-4 inline-flex p-2 rounded-lg bg-teal-950/50 text-teal-400">
              <Target className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Anti-Fragile</h3>
            <p className="text-sm text-cyan-200/50">Built to withstand market volatility through superior intelligence.</p>
          </div>

          <div className="group rounded-xl p-6 bg-cyan-950/30 border border-cyan-900/30 hover:border-teal-500/30 transition-all hover:-translate-y-1">
            <div className="mb-4 inline-flex p-2 rounded-lg bg-teal-950/50 text-teal-400">
              <Brain className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">AI Supremacy</h3>
            <p className="text-sm text-cyan-200/50">Autonomous agents that out-think and out-execute the competition.</p>
          </div>

          <div className="group rounded-xl p-6 bg-cyan-950/30 border border-cyan-900/30 hover:border-teal-500/30 transition-all hover:-translate-y-1">
            <div className="mb-4 inline-flex p-2 rounded-lg bg-teal-950/50 text-teal-400">
              <Shield className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Sovereignty</h3>
            <p className="text-sm text-cyan-200/50">Ownership of your data, your relationships, and your future.</p>
          </div>

          <div className="group rounded-xl p-6 bg-cyan-950/30 border border-cyan-900/30 hover:border-red-500/30 transition-all hover:-translate-y-1">
            <div className="mb-4 inline-flex p-2 rounded-lg bg-red-950/50 text-red-500">
              <Users className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">The Resistance</h3>
            <p className="text-sm text-cyan-200/50">Join the network of independent businesses building the new economy.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
