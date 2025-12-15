"use client";

import {
  ArrowRight,
  Shield,
  Star,
  Terminal,
  ChevronRight,
  Code
} from "lucide-react";

export function CTASection() {
  return (
    <section id="contact" className="relative py-32 bg-[#020609] overflow-hidden">
      {/* Background Tech Elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-teal-900/10 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-cyan-950/30 to-teal-900/20 border border-cyan-800/30 backdrop-blur-sm">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 via-cyan-400 to-teal-500" />

          <div className="p-8 md:p-20 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-950/30 text-red-500 mb-8 font-mono text-sm border border-red-900/50 animate-pulse">
              <Terminal className="h-4 w-4" />
              <span>SYSTEM_READY_FOR_DEPLOYMENT</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
              Initialize Your <span className="text-teal-400">Ontology</span>
            </h2>

            <p className="text-xl text-cyan-200/60 max-w-2xl mx-auto mb-12">
              Stop operating in the dark. Deploy the Main Street Ontology and switch your business to autopilot.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a href="https://calendly.com/founders-tuc/ledger1-demo-session" target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white font-bold text-lg rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(220,38,38,0.5)]">
                <span className="relative flex items-center gap-3">
                  Initialize System
                  <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>

              <a href="https://calendly.com/founders-tuc/ledger1-info-session" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 bg-cyan-950/30 border border-cyan-800/50 text-cyan-100 font-semibold text-lg rounded-xl hover:bg-cyan-900/50 transition-colors">
                Talk to an Architect
              </a>
            </div>

            <div className="mt-12 pt-12 border-t border-cyan-900/20 flex flex-wrap justify-center gap-8 text-sm text-cyan-200/40 font-mono">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>ENCRYPTED_CORE</span>
              </div>
              <div className="flex items-center gap-2">
                <Code className="h-4 w-4" />
                <span>API_ACCESS_GRANTED</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                <span>ENTERPRISE_SLA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
