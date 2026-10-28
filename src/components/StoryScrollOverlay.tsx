import { useMemo } from 'react'

interface StoryScrollOverlayProps {
  scrollProgress: number
}

export function StoryScrollOverlay({ scrollProgress }: StoryScrollOverlayProps) {
  // Scene B (0.22 - 0.38)
  const sceneBOpacity = useMemo(() => {
    if (scrollProgress < 0.20 || scrollProgress > 0.40) return 0
    if (scrollProgress < 0.26) return (scrollProgress - 0.20) / 0.06
    if (scrollProgress > 0.34) return 1 - (scrollProgress - 0.34) / 0.06
    return 1
  }, [scrollProgress])

  // Scene C (0.42 - 0.58)
  const sceneCOpacity = useMemo(() => {
    if (scrollProgress < 0.40 || scrollProgress > 0.60) return 0
    if (scrollProgress < 0.46) return (scrollProgress - 0.40) / 0.06
    if (scrollProgress > 0.54) return 1 - (scrollProgress - 0.54) / 0.06
    return 1
  }, [scrollProgress])

  // Scene D (0.61 - 0.73)
  const sceneDOpacity = useMemo(() => {
    if (scrollProgress < 0.60 || scrollProgress > 0.74) return 0
    if (scrollProgress < 0.64) return (scrollProgress - 0.60) / 0.04
    if (scrollProgress > 0.70) return 1 - (scrollProgress - 0.70) / 0.04
    return 1
  }, [scrollProgress])

  // Scene E Gallery Titles (0.75 - 0.88)
  const sceneEOpacity = useMemo(() => {
    if (scrollProgress < 0.74 || scrollProgress > 0.89) return 0
    if (scrollProgress < 0.78) return (scrollProgress - 0.74) / 0.04
    if (scrollProgress > 0.85) return 1 - (scrollProgress - 0.85) / 0.04
    return 1
  }, [scrollProgress])

  return (
    <div className="fixed inset-0 pointer-events-none z-20 flex flex-col justify-between p-6 sm:p-12">
      {/* Top Scene Tracker */}
      <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-tech tracking-tech text-white/50 uppercase">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
          <span>SUPERCONSCIOUS ENGINE</span>
        </div>
        <div className="flex items-center gap-3">
          <span>PROGRESS // {(scrollProgress * 100).toFixed(0)}%</span>
          <div className="w-16 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-purple-400 transition-all duration-100"
              style={{ width: `${Math.min(scrollProgress * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Center Cinematic Captions that transition smoothly */}
      <div className="relative w-full max-w-4xl mx-auto flex items-center justify-center min-h-[300px]">
        {/* Scene B: The Approach */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 transition-opacity duration-300"
          style={{
            opacity: sceneBOpacity,
            transform: `scale(${0.95 + sceneBOpacity * 0.05})`,
          }}
        >
          <span className="text-[11px] sm:text-xs font-tech tracking-tech-wide text-purple-400 uppercase mb-3">
            01 // The Approach
          </span>
          <h2 className="font-heading font-light tracking-tight text-3xl sm:text-5xl md:text-6xl text-gradient-silver mb-4 leading-tight">
            Transcending Physical Thresholds
          </h2>
          <p className="max-w-xl text-xs sm:text-sm font-body text-zinc-300 font-light leading-relaxed">
            When computation latency drops below biological neural firing speed, the distinction
            between human intention and digital execution ceases to exist.
          </p>
        </div>

        {/* Scene C: The Transformation */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 transition-opacity duration-300"
          style={{
            opacity: sceneCOpacity,
            transform: `scale(${0.95 + sceneCOpacity * 0.05})`,
          }}
        >
          <span className="text-[11px] sm:text-xs font-tech tracking-tech-wide text-purple-300 uppercase mb-3">
            02 // Macro Transformation
          </span>
          <h2 className="font-heading font-light tracking-tight text-3xl sm:text-5xl md:text-6xl text-gradient-silver mb-4 leading-tight">
            Pre-Computed Cognition
          </h2>
          <p className="max-w-xl text-xs sm:text-sm font-body text-zinc-200 font-light leading-relaxed">
            Your motor cortex prepares physical movement 300 milliseconds before conscious execution.
            Superconscious synchronizes with this preliminary impulse.
          </p>
        </div>

        {/* Scene D: The Flight Through Space */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 transition-opacity duration-300"
          style={{
            opacity: sceneDOpacity,
            transform: `scale(${0.95 + sceneDOpacity * 0.05})`,
          }}
        >
          <span className="text-[11px] sm:text-xs font-tech tracking-tech-wide text-cyan-400 uppercase mb-3">
            03 // The Neural Spaceway
          </span>
          <h2 className="font-heading font-light tracking-tight text-3xl sm:text-5xl md:text-6xl text-gradient-silver mb-4 leading-tight">
            Traversing Every Synaptic Layer
          </h2>
          <p className="max-w-xl text-xs sm:text-sm font-body text-zinc-300 font-light leading-relaxed">
            Streaming low-latency intention telemetry across wearable rings, neural headsets, and ambient spatial surfaces at 400 Gbps.
          </p>
        </div>

        {/* Scene E: Gallery Editorial Header */}
        <div
          className="absolute top-0 inset-x-0 flex flex-col items-center text-center px-4 transition-opacity duration-300"
          style={{
            opacity: sceneEOpacity,
            transform: `translateY(${sceneEOpacity > 0 ? '0px' : '20px'})`,
          }}
        >
          <span className="text-[10px] sm:text-[11px] font-tech tracking-tech-wide text-purple-400 uppercase mb-1">
            04 // Spatial Gallery
          </span>
          <h2 className="font-heading font-light tracking-tight text-2xl sm:text-4xl text-gradient-silver">
            The Living Architecture of Superconscious
          </h2>
        </div>
      </div>

      {/* Bottom Scene Indicators */}
      <div className="flex items-center justify-between text-[10px] font-tech tracking-tech text-zinc-500">
        <span>BEYOND NEURAL LABS</span>
        <div className="flex gap-4">
          <span className={scrollProgress < 0.25 ? 'text-purple-400 font-bold' : ''}>01 AWAKENING</span>
          <span className={scrollProgress >= 0.25 && scrollProgress < 0.5 ? 'text-purple-400 font-bold' : ''}>02 APPROACH</span>
          <span className={scrollProgress >= 0.5 && scrollProgress < 0.72 ? 'text-purple-400 font-bold' : ''}>03 FLIGHT</span>
          <span className={scrollProgress >= 0.72 && scrollProgress < 0.9 ? 'text-purple-400 font-bold' : ''}>04 GALLERY</span>
          <span className={scrollProgress >= 0.9 ? 'text-purple-400 font-bold' : ''}>05 REVEAL</span>
        </div>
        <span>AUTONOMOUS FEED</span>
      </div>
    </div>
  )
}
