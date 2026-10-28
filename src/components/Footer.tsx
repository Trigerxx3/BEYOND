import { ArrowUp } from 'lucide-react'

interface FooterProps {
  onBackToTop: () => void
  onOpenWaitlist: () => void
  reducedMotion: boolean
  onToggleReducedMotion: () => void
}

export function Footer({
  onBackToTop,
  onOpenWaitlist,
  reducedMotion,
  onToggleReducedMotion,
}: FooterProps) {
  return (
    <footer className="relative z-30 w-full border-t border-white/10 bg-[#020104] px-6 sm:px-12 py-16 text-zinc-400">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
          {/* Brand Column */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2.5 text-white">
              <div className="w-6 h-6 rounded bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-purple-300">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L14.6 9.4L22 12L14.6 14.6L12 22L9.4 14.6L2 12L9.4 9.4L12 2Z" />
                </svg>
              </div>
              <span className="font-heading font-medium tracking-widest text-lg">BEYOND</span>
            </div>
            <p className="font-body text-xs text-zinc-500 max-w-sm leading-relaxed">
              Superconscious is a neural intelligence engine that anticipates human intent across
              wearable, neural, and ambient digital surfaces.
            </p>
            <div className="flex items-center gap-3 font-tech text-xs tracking-tech text-purple-400/90 pt-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>SYNAPSE MESH v4.5 // GLOBAL</span>
            </div>
          </div>

          {/* Column: Hardware */}
          <div>
            <h4 className="font-tech text-[11px] tracking-tech-wide uppercase text-white mb-4">
              Hardware
            </h4>
            <ul className="space-y-2.5 font-body text-xs">
              <li>
                <a href="#wearable" className="hover:text-purple-300 transition-colors">
                  Neural Ring v2
                </a>
              </li>
              <li>
                <a href="#wearable" className="hover:text-purple-300 transition-colors">
                  Wrist Telemetry Band
                </a>
              </li>
              <li>
                <a href="#wearable" className="hover:text-purple-300 transition-colors">
                  Auricular Implant Interface
                </a>
              </li>
              <li>
                <a href="#wearable" className="hover:text-purple-300 transition-colors">
                  Sub-dermal Nanowires
                </a>
              </li>
            </ul>
          </div>

          {/* Column: Neural Engine */}
          <div>
            <h4 className="font-tech text-[11px] tracking-tech-wide uppercase text-white mb-4">
              Superconscious
            </h4>
            <ul className="space-y-2.5 font-body text-xs">
              <li>
                <a href="#neural" className="hover:text-purple-300 transition-colors">
                  Motor Cortex Telemetry
                </a>
              </li>
              <li>
                <a href="#neural" className="hover:text-purple-300 transition-colors">
                  Intent Pre-Computation
                </a>
              </li>
              <li>
                <a href="#programs" className="hover:text-purple-300 transition-colors">
                  Adaptive Spatial OS
                </a>
              </li>
              <li>
                <a href="#programs" className="hover:text-purple-300 transition-colors">
                  Edge Neural Kernel
                </a>
              </li>
            </ul>
          </div>

          {/* Column: Company & Legal */}
          <div>
            <h4 className="font-tech text-[11px] tracking-tech-wide uppercase text-white mb-4">
              Organization
            </h4>
            <ul className="space-y-2.5 font-body text-xs">
              <li>
                <button onClick={onOpenWaitlist} className="hover:text-purple-300 transition-colors text-left cursor-pointer">
                  Waitlist & Allocation
                </button>
              </li>
              <li>
                <span className="hover:text-purple-300 transition-colors cursor-pointer">
                  Neural Ethics Board
                </span>
              </li>
              <li>
                <span className="hover:text-purple-300 transition-colors cursor-pointer">
                  Privacy Enclave Policy
                </span>
              </li>
              <li>
                <span className="hover:text-purple-300 transition-colors cursor-pointer">
                  Terms of Telemetry
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 font-tech text-[10px] tracking-tech text-zinc-500">
          <div>
            © 2026 BEYOND TECHNOLOGIES INC. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={onToggleReducedMotion}
              className="hover:text-zinc-300 transition-colors cursor-pointer"
              title="Toggle reduced motion preference"
            >
              MOTION: {reducedMotion ? 'REDUCED' : 'CINEMATIC'}
            </button>

            <button
              onClick={onBackToTop}
              className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
            >
              <span>RETURN TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
