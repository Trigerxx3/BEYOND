import { X, Zap, Check } from 'lucide-react'

interface UpdatesModalProps {
  isOpen: boolean
  onClose: () => void
}

const UPDATES = [
  {
    version: 'v4.5.0-ALPHA',
    date: 'OCTOBER 2026',
    title: 'Pre-Cognitive Intent Engine & Motor Cortex Decoding',
    highlights: [
      'Sub-biological prediction lead increased to 340ms ahead of muscle actuation.',
      'Universal zero-knowledge local enclave for biometric neural privacy.',
      'Direct synchronization across liquid-chrome rings, wrists, and spatial glasses.',
    ],
  },
  {
    version: 'v4.2.1',
    date: 'SEPTEMBER 2026',
    title: 'Sub-Milliwatt Hardware Architecture',
    highlights: [
      'Edge neural coprocessor power draw reduced to 0.42 mW.',
      'Continuous 14-day battery life with real-time biometric telemetry.',
      'Multi-axis dynamic magnetic charging embedded in titanium band.',
    ],
  },
  {
    version: 'v4.0.0',
    date: 'AUGUST 2026',
    title: 'Superconscious Spatial Operating Mesh',
    highlights: [
      'Adaptive UI layers that morph based on real-time cognitive workload.',
      'Sub-millimeter spatial gesture resolution with optical telemetry.',
      'Decentralized neural mesh connecting distributed devices with zero configuration.',
    ],
  },
]

export function UpdatesModal({ isOpen, onClose }: UpdatesModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl rounded-3xl glass-card bg-[#0e0819]/95 border border-purple-500/30 p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-light text-base text-white">System Releases & Changelog</h3>
              <div className="font-tech text-[10px] tracking-tech text-purple-400">SUPERCONSCIOUS CONTINUOUS STREAM</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* List of updates */}
        <div className="mt-4 overflow-y-auto space-y-6 pr-2">
          {UPDATES.map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-tech text-xs font-bold text-purple-300 px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/30">
                  {item.version}
                </span>
                <span className="font-tech text-[10px] text-zinc-500">{item.date}</span>
              </div>
              <h4 className="font-heading font-medium text-sm text-white">{item.title}</h4>
              <ul className="space-y-1.5 font-body text-xs text-zinc-400 font-light">
                {item.highlights.map((point, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-purple-400 mt-0.5 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between font-tech text-[10px] tracking-tech text-zinc-500">
          <span>SOURCE // NEURAL GIT BROADCAST</span>
          <button onClick={onClose} className="hover:text-white transition-colors cursor-pointer">
            CLOSE CHANGELOG
          </button>
        </div>
      </div>
    </div>
  )
}
