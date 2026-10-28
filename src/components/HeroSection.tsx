import { useMemo } from 'react'

interface HeroSectionProps {
  scrollProgress: number
  onExploreClick: () => void
}

export function HeroSection({ scrollProgress, onExploreClick }: HeroSectionProps) {
  // Fade out hero typography as user scrolls into Scene B (0.15 - 0.35)
  const heroOpacity = useMemo(() => {
    if (scrollProgress < 0.12) return 1
    if (scrollProgress > 0.36) return 0
    return 1 - (scrollProgress - 0.12) / 0.24
  }, [scrollProgress])

  const translateY = useMemo(() => {
    return Math.min(scrollProgress * 140, 100)
  }, [scrollProgress])

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen p-3 sm:p-5 md:p-6 flex flex-col justify-between pointer-events-none select-none"
      style={{
        opacity: heroOpacity,
        transform: `translateY(-${translateY}px)`,
        visibility: heroOpacity <= 0.01 ? 'hidden' : 'visible',
        transition: 'opacity 0.2s ease-out, transform 0.2s ease-out',
      }}
    >
      {/* Subtle Rounded Outer Frame */}
      <div className="relative w-full h-[calc(100vh-2rem)] sm:h-[calc(100vh-2.5rem)] rounded-2xl sm:rounded-3xl border border-white/[0.09] flex flex-col justify-between p-6 sm:p-10 md:p-12 overflow-hidden shadow-[inset_0_0_80px_rgba(0,0,0,0.8)]">
        {/* Soft Violet Glow in Upper-Left and Lower-Right Corners */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-purple-700/15 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-violet-600/15 blur-[120px] pointer-events-none" />

        {/* TOP: "Beyond" oversized typography in upper-left */}
        <div className="relative z-20 pt-8 sm:pt-4">
          <div className="flex items-center gap-2 mb-2 text-[10px] sm:text-[11px] font-tech tracking-tech text-purple-300/80 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
            <span>Neural Intelligence Architecture</span>
            <span className="text-white/30">•</span>
            <span className="text-white/40">Superconscious v4.5</span>
          </div>

          <h1 className="font-heading font-light tracking-ultra-tight text-gradient-hero text-[18vw] sm:text-[14vw] md:text-[12vw] lg:text-[10.5rem] leading-[0.84] select-none">
            Beyond
          </h1>
        </div>

        {/* BOTTOM: Split composition (Copy at Lower-Left, "all limits" at Lower-Right) */}
        <div className="relative z-20 grid grid-cols-1 md:grid-cols-12 gap-8 items-end pb-2 sm:pb-4">
          {/* Supporting Copy (Lower-Left) */}
          <div className="md:col-span-5 lg:col-span-4 space-y-4 text-xs sm:text-[13px] font-body text-zinc-400 font-light leading-relaxed tracking-wide">
            <p className="text-zinc-200">
              Superconscious is a neural engine that turns intent into action — anticipating
              your next move before you make it, across every device you already own.
            </p>
            <p className="text-zinc-400/90">
              One model, every surface: wearable, neural, and beyond. No ceilings, no limits —
              just intelligence that keeps pace with the way you think.
            </p>
            <div className="pt-2 flex items-center gap-4 text-[10px] sm:text-[11px] font-tech tracking-tech text-purple-300/70">
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
                NEURAL SYNAPSE: ACTIVE
              </span>
              <span>EST. LATENCY: &lt;0.8MS</span>
            </div>
          </div>

          {/* Center Hint Scroll Prompt */}
          <div className="hidden md:flex md:col-span-2 lg:col-span-3 justify-center pb-3">
            <button
              onClick={onExploreClick}
              className="pointer-events-auto flex flex-col items-center gap-2 text-[10px] font-tech tracking-tech-wide text-white/50 hover:text-purple-300 transition-colors uppercase group cursor-pointer"
            >
              <span className="group-hover:tracking-wider transition-all">Scroll to Explore</span>
              <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1 group-hover:border-purple-400/60 transition-colors">
                <span className="w-1 h-2 rounded-full bg-white/60 group-hover:bg-purple-300 animate-bounce" />
              </div>
            </button>
          </div>

          {/* "all limits" Oversized Typography (Lower-Right, split across two lines) */}
          <div className="md:col-span-5 lg:col-span-5 text-right flex flex-col items-end">
            <div className="font-heading font-light tracking-ultra-tight text-gradient-hero text-[17vw] sm:text-[13vw] md:text-[11vw] lg:text-[8.5rem] leading-[0.8] select-none">
              all
            </div>
            <div className="font-heading font-light tracking-ultra-tight text-gradient-hero text-[17vw] sm:text-[13vw] md:text-[11vw] lg:text-[8.5rem] leading-[0.8] select-none">
              limits
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
