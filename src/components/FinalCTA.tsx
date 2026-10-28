import { ArrowRight, ShieldCheck, Terminal } from 'lucide-react'

interface FinalCTAProps {
  onOpenWaitlist: () => void
}

export function FinalCTA({ onOpenWaitlist }: FinalCTAProps) {
  return (
    <section className="relative z-30 w-full px-4 sm:px-8 lg:px-12 py-32 sm:py-44 flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Background radial violet glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-700/15 blur-[160px] pointer-events-none" />

      {/* Decorative 4-point star SVG badge */}
      <div className="relative z-10 inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/[0.05] border border-purple-500/30 text-purple-300 mb-8 shadow-[0_0_30px_rgba(168,85,247,0.3)] animate-pulse-slow">
        <svg className="w-6 h-6 text-purple-300" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L14.6 9.4L22 12L14.6 14.6L12 22L9.4 14.6L2 12L9.4 9.4L12 2Z" />
        </svg>
      </div>

      {/* Headline in Space Grotesk */}
      <h2 className="relative z-10 font-heading font-light tracking-tight text-gradient-silver text-4xl sm:text-6xl md:text-7xl lg:text-8xl max-w-5xl mb-8 leading-[1.04]">
        Your next move starts before you make it.
      </h2>

      {/* Supporting text in Inter */}
      <p className="relative z-10 font-body text-base sm:text-xl text-zinc-300 font-light max-w-2xl mb-12 leading-relaxed">
        Discover a new relationship between intention, intelligence, and action.
      </p>

      {/* Prominent CTA Button and secondary action */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4">
        <button
          onClick={onOpenWaitlist}
          className="group relative overflow-hidden px-8 py-4 rounded-full bg-white text-zinc-950 font-heading font-medium tracking-tight text-sm sm:text-base hover:bg-zinc-100 transition-all shadow-[0_0_40px_rgba(255,255,255,0.25)] hover:shadow-[0_0_50px_rgba(192,132,252,0.4)] flex items-center gap-3 cursor-pointer"
        >
          <span>Get Started</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-transparent to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>

        <a
          href="#wearable"
          className="px-6 py-4 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-zinc-300 hover:text-white font-heading text-sm font-medium transition-colors flex items-center gap-2 cursor-pointer"
        >
          <Terminal className="w-4 h-4 text-purple-400" />
          <span>Explore Developer Docs</span>
        </a>
      </div>

      {/* Trust & Spec Footnote with Orbitron */}
      <div className="relative z-10 mt-16 flex flex-wrap items-center justify-center gap-6 font-tech tracking-tech text-[10px] sm:text-xs text-zinc-500">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-purple-400" />
          <span>HIPAA & GDPR BIO-ENCLAVE</span>
        </div>
        <span>•</span>
        <span>SYNAPSE NODES: 68 CITIES</span>
        <span>•</span>
        <span>LATENCY GUARANTEE: &lt;1.0MS</span>
      </div>
    </section>
  )
}
