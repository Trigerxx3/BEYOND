import { useState, useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { CinematicCanvas } from './components/CinematicCanvas'
import { NavigationBar } from './components/NavigationBar'
import { HeroSection } from './components/HeroSection'
import { StoryScrollOverlay } from './components/StoryScrollOverlay'
import { IntelligenceSection } from './components/IntelligenceSection'
import { FinalCTA } from './components/FinalCTA'
import { Footer } from './components/Footer'
import { SearchModal } from './components/SearchModal'
import { WaitlistModal } from './components/WaitlistModal'
import { UpdatesModal } from './components/UpdatesModal'

gsap.registerPlugin(ScrollTrigger)

export function App() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false)
  const [isUpdatesOpen, setIsUpdatesOpen] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  const lenisRef = useRef<Lenis | null>(null)

  // Initialize Lenis Smooth Scroll & GSAP ScrollTrigger Choreography
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setReducedMotion(true)
    }

    const lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !reducedMotion,
    })
    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(tickerCallback)
    gsap.ticker.lagSmoothing(0)

    // Master ScrollTrigger for the 500vh cinematic journey
    const trigger = ScrollTrigger.create({
      trigger: '#cinematic-track',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.6,
      onUpdate: (self) => {
        setScrollProgress(self.progress)
      },
    })

    return () => {
      trigger.kill()
      gsap.ticker.remove(tickerCallback)
      lenis.destroy()
    }
  }, [reducedMotion])

  // Navigation jump helper
  const handleNavigateSection = (sectionId: string) => {
    if (sectionId === 'hero') {
      lenisRef.current?.scrollTo(0, { duration: 1.5 })
      return
    }

    const elem = document.getElementById(sectionId)
    if (elem) {
      lenisRef.current?.scrollTo(elem, { offset: -60, duration: 1.4 })
    }
  }

  const handleBackToTop = () => {
    lenisRef.current?.scrollTo(0, { duration: 1.8 })
  }

  const handleExploreScroll = () => {
    const track = document.getElementById('cinematic-track')
    if (track) {
      // Scroll to approx 25% (Scene B)
      const targetY = window.innerHeight * 1.2
      lenisRef.current?.scrollTo(targetY, { duration: 1.5 })
    }
  }

  return (
    <div className="relative w-full min-h-screen bg-[#030206] text-white selection:bg-purple-600 selection:text-white">
      {/* Film Grain & Cinematic Vignette Overlays */}
      <div className="fixed inset-0 pointer-events-none z-30 film-grain" />
      <div className="fixed inset-0 pointer-events-none z-20 cinematic-vignette" />

      {/* Floating Pill Navigation */}
      <NavigationBar
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenWaitlist={() => setIsWaitlistOpen(true)}
        onOpenUpdates={() => setIsUpdatesOpen(true)}
        onNavigateSection={handleNavigateSection}
      />

      {/* Persistent 3D WebGL Canvas (Camera, Chrome Star, Particles, 3D Floating Gallery) */}
      <CinematicCanvas scrollProgress={scrollProgress} />

      {/* Synchronized Story Captions for Scenes B, C, D, E */}
      <StoryScrollOverlay scrollProgress={scrollProgress} />

      {/* ======================================================== */}
      {/* CINEMATIC SCROLL TRACK (Scenes A -> B -> C -> D -> E)     */}
      {/* 500vh tall track for gradual scrubbed GSAP timeline      */}
      {/* ======================================================== */}
      <div id="cinematic-track" className="relative w-full h-[520vh]">
        {/* Pinned Hero Section (Scene A: The Awakening) */}
        <div className="sticky top-0 w-full h-screen overflow-hidden z-20 pointer-events-none">
          <HeroSection
            scrollProgress={scrollProgress}
            onExploreClick={handleExploreScroll}
          />
        </div>
      </div>

      {/* ======================================================== */}
      {/* SCENE F: THE INTELLIGENCE REVEAL                         */}
      {/* Structured product cards, interactive telemetry slider   */}
      {/* ======================================================== */}
      <div id="intelligence-root" className="relative z-30">
        <IntelligenceSection onOpenWaitlist={() => setIsWaitlistOpen(true)} />
      </div>

      {/* ======================================================== */}
      {/* SCENE G: THE FINAL INVITATION                            */}
      {/* Final glowing star portal, prominent Get Started CTA      */}
      {/* ======================================================== */}
      <div id="final-cta-root" className="relative z-30">
        <FinalCTA onOpenWaitlist={() => setIsWaitlistOpen(true)} />
      </div>

      {/* Luxury Minimal Footer */}
      <Footer
        onBackToTop={handleBackToTop}
        onOpenWaitlist={() => setIsWaitlistOpen(true)}
        reducedMotion={reducedMotion}
        onToggleReducedMotion={() => setReducedMotion(!reducedMotion)}
      />

      {/* Interactive Overlays / Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectResult={handleNavigateSection}
      />

      <WaitlistModal
        isOpen={isWaitlistOpen}
        onClose={() => setIsWaitlistOpen(false)}
      />

      <UpdatesModal
        isOpen={isUpdatesOpen}
        onClose={() => setIsUpdatesOpen(false)}
      />
    </div>
  )
}

export default App
