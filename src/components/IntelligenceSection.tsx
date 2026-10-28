import { useState } from 'react'
import { Sparkles, Activity, ArrowUpRight } from 'lucide-react'

interface IntelligenceSectionProps {
  onOpenWaitlist: () => void
}

export function IntelligenceSection({ onOpenWaitlist }: IntelligenceSectionProps) {
  const [intentHorizon, setIntentHorizon] = useState<number>(280) // ms
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const cards = [
    {
      id: 'wearable',
      title: 'Wearable Intelligence',
      subtitle: 'Sub-milliwatt Edge Neural Coprocessors',
      image: '/assets/card-wearable.jpg',
      badge: 'HARDWARE SYNTHESIS',
      description:
        'Continuous ambient intention decoding embedded in biometric rings, wrist telemetry bands, and smart optics without battery penalty.',
      specs: [
        { label: 'POWER DRAW', val: '0.42 mW' },
        { label: 'SAMPLING RATE', val: '4,000 Hz' },
        { label: 'FORM FACTOR', val: 'Titanium Ring & Band' },
      ],
    },
    {
      id: 'neural',
      title: 'Neural Interfaces',
      subtitle: 'Non-Invasive Motor Cortex Reading',
      image: '/assets/card-neural.jpg',
      badge: 'SYNAPTIC TELEMETRY',
      description:
        'Decoding pre-motor neural impulses before micro-muscular actuation occurs, translating raw neural firing into immediate spatial actions.',
      specs: [
        { label: 'PREDICTION LEAD', val: 'Up to 340ms' },
        { label: 'SIGNAL FIDELITY', val: '99.94% SNR' },
        { label: 'CALIBRATION', val: 'Instant Adaptive' },
      ],
    },
    {
      id: 'programs',
      title: 'Adaptive Programs',
      subtitle: 'Self-Organizing Spatial Operating Layer',
      image: '/assets/card-adaptive.jpg',
      badge: 'SOFTWARE EVOLUTION',
      description:
        'Software environments that morph, recompile, and prepare user interface states according to cognitive load and shifting mental models.',
      specs: [
        { label: 'CONTEXT SWITCH', val: '< 0.2ms' },
        { label: 'ACCURACY', val: 'Sub-millimeter' },
        { label: 'DEVICE MESH', val: 'Zero Config' },
      ],
    },
  ]

  return (
    <section className="relative z-30 w-full px-4 sm:px-8 lg:px-12 py-24 sm:py-32 bg-gradient-to-b from-transparent via-[#05030a] to-[#030206]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 font-tech tracking-tech text-[10px] sm:text-xs uppercase mb-6">
            <Activity className="w-3.5 h-3.5 text-purple-400" />
            <span>Architecture Overview</span>
          </div>

          <h2 className="font-heading font-light tracking-tight text-gradient-silver text-4xl sm:text-6xl md:text-7xl mb-6 leading-[1.05]">
            Intelligence that moves with you.
          </h2>

          <p className="font-body text-base sm:text-lg text-zinc-300 font-light leading-relaxed max-w-2xl mx-auto">
            From the smallest signal to your next big idea, Superconscious connects your world into
            one responsive intelligence.
          </p>
        </div>

        {/* 3 Minimal Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-20">
          {cards.map((card, idx) => (
            <div
              key={card.id}
              id={card.id}
              onMouseEnter={() => setHoveredCard(idx)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`group relative rounded-3xl glass-card overflow-hidden transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between ${
                hoveredCard === idx ? 'border-purple-400/50 shadow-[0_0_40px_rgba(168,85,247,0.25)]' : ''
              }`}
            >
              {/* Card Image Container */}
              <div className="relative aspect-square w-full overflow-hidden bg-black/40">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0918] via-transparent to-transparent opacity-90" />

                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full font-tech text-[9px] tracking-tech uppercase bg-black/60 backdrop-blur-md text-purple-300 border border-purple-500/30">
                    {card.badge}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between bg-[#0e0918]/80">
                <div>
                  <h3 className="font-heading text-2xl font-light tracking-tight text-white mb-1.5 group-hover:text-purple-300 transition-colors">
                    {card.title}
                  </h3>
                  <div className="font-tech text-xs tracking-wide text-purple-400/80 mb-4">
                    {card.subtitle}
                  </div>
                  <p className="font-body text-xs sm:text-sm text-zinc-400 font-light leading-relaxed mb-6">
                    {card.description}
                  </p>
                </div>

                {/* Specifications Grid with Orbitron */}
                <div className="pt-4 border-t border-white/10 space-y-2">
                  {card.specs.map((spec, sIdx) => (
                    <div
                      key={sIdx}
                      className="flex items-center justify-between font-tech text-xs"
                    >
                      <span className="text-zinc-500 text-[10px] tracking-tech">{spec.label}</span>
                      <span className="text-zinc-200">{spec.val}</span>
                    </div>
                  ))}
                </div>

                {/* Action Link */}
                <button
                  onClick={onOpenWaitlist}
                  className="mt-6 w-full py-2.5 px-4 rounded-xl bg-white/[0.04] hover:bg-purple-600/20 border border-white/10 hover:border-purple-400/40 font-heading text-xs font-medium tracking-wide text-white flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>Request Hardware Allocation</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-purple-400" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Neural Intent Pre-Computation Playground */}
        <div className="rounded-3xl glass-card p-6 sm:p-10 border border-purple-500/20 bg-[#0e0918]/60 relative overflow-hidden">
          <div className="absolute -right-24 -bottom-24 w-80 h-80 rounded-full bg-purple-600/10 blur-[90px] pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-8 pb-8 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 font-tech tracking-tech text-[10px] sm:text-xs text-purple-400 uppercase mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Simulated Intent Horizon Telemetry</span>
              </div>
              <h4 className="font-heading font-light text-2xl sm:text-3xl text-gradient-silver">
                Pre-Cognitive Lead vs. Biological Impulse
              </h4>
            </div>

            {/* Slider Control */}
            <div className="w-full lg:w-80 bg-black/40 p-4 rounded-2xl border border-white/10">
              <div className="flex justify-between items-center font-tech text-xs mb-2">
                <span className="text-zinc-400 text-[11px] tracking-tech">ANTICIPATION LEAD:</span>
                <span className="text-purple-300 font-semibold">{intentHorizon} ms</span>
              </div>
              <input
                type="range"
                min="50"
                max="400"
                value={intentHorizon}
                onChange={(e) => setIntentHorizon(Number(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />
              <div className="flex justify-between font-tech text-[10px] text-zinc-500 mt-1">
                <span>50ms (Reflex)</span>
                <span>400ms (Deep intent)</span>
              </div>
            </div>
          </div>

          {/* Real-time telemetry metrics with Orbitron */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-black/30 border border-white/5">
              <div className="font-tech text-[10px] tracking-tech text-zinc-500 uppercase">Perceived Latency</div>
              <div className="font-tech text-2xl font-light text-emerald-400 mt-1">
                -{(intentHorizon * 0.92).toFixed(1)} ms
              </div>
              <div className="font-body text-[10px] text-zinc-500 mt-1">Instantaneous feel</div>
            </div>

            <div className="p-4 rounded-2xl bg-black/30 border border-white/5">
              <div className="font-tech text-[10px] tracking-tech text-zinc-500 uppercase">Prediction Accuracy</div>
              <div className="font-tech text-2xl font-light text-purple-300 mt-1">
                {(94.2 + (intentHorizon / 400) * 5.4).toFixed(1)}%
              </div>
              <div className="font-body text-[10px] text-zinc-500 mt-1">Omni-model accuracy</div>
            </div>

            <div className="p-4 rounded-2xl bg-black/30 border border-white/5">
              <div className="font-tech text-[10px] tracking-tech text-zinc-500 uppercase">Surface Synchrony</div>
              <div className="font-tech text-2xl font-light text-white mt-1">
                {Math.round(intentHorizon * 1.6)} FPS
              </div>
              <div className="font-body text-[10px] text-zinc-500 mt-1">Spatial frame pacing</div>
            </div>

            <div className="p-4 rounded-2xl bg-black/30 border border-white/5">
              <div className="font-tech text-[10px] tracking-tech text-zinc-500 uppercase">Synaptic Security</div>
              <div className="font-tech text-2xl font-light text-cyan-300 mt-1">
                ZK-Enclave
              </div>
              <div className="font-body text-[10px] text-zinc-500 mt-1">Biometric zero-knowledge</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
