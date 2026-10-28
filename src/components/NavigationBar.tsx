import { useState, useEffect } from 'react'
import { Search, Sparkles, Menu, X } from 'lucide-react'

interface NavigationBarProps {
  onOpenSearch: () => void
  onOpenWaitlist: () => void
  onOpenUpdates: () => void
  onNavigateSection: (sectionId: string) => void
}

export function NavigationBar({
  onOpenSearch,
  onOpenWaitlist,
  onOpenUpdates,
  onNavigateSection,
}: NavigationBarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-5 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-500 ${
          scrolled ? 'translate-y-0' : 'translate-y-1'
        }`}
      >
        <nav
          className="glass-nav flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-zinc-900 shadow-2xl transition-all duration-300 pointer-events-auto border border-white/60 font-heading"
          aria-label="Main Navigation"
        >
          {/* Brand Icon: Square with four-point star */}
          <button
            onClick={() => onNavigateSection('hero')}
            className="group flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-950 text-white hover:bg-zinc-800 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
            aria-label="Beyond Home"
          >
            <svg
              className="w-4 h-4 text-purple-300 group-hover:scale-110 transition-transform duration-300"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2L14.6 9.4L22 12L14.6 14.6L12 22L9.4 14.6L2 12L9.4 9.4L12 2Z" />
            </svg>
          </button>

          {/* Desktop Nav Items with Geometric Space Grotesk */}
          <div className="hidden md:flex items-center gap-1 px-1 text-[13px] font-medium tracking-tight text-zinc-700">
            <button
              onClick={() => onNavigateSection('wearable')}
              className="px-3 py-1.5 rounded-full hover:text-black hover:bg-black/5 transition-colors focus:outline-none focus:ring-1 focus:ring-purple-500 cursor-pointer"
            >
              Wearable
            </button>
            <button
              onClick={() => onNavigateSection('neural')}
              className="px-3 py-1.5 rounded-full hover:text-black hover:bg-black/5 transition-colors focus:outline-none focus:ring-1 focus:ring-purple-500 cursor-pointer"
            >
              Neural
            </button>
            <button
              onClick={() => onNavigateSection('programs')}
              className="px-3 py-1.5 rounded-full hover:text-black hover:bg-black/5 transition-colors focus:outline-none focus:ring-1 focus:ring-purple-500 cursor-pointer"
            >
              Programs
            </button>
            <button
              onClick={onOpenUpdates}
              className="px-3 py-1.5 rounded-full hover:text-black hover:bg-black/5 transition-colors focus:outline-none focus:ring-1 focus:ring-purple-500 flex items-center gap-1.5 cursor-pointer"
            >
              <span>Updates</span>
              <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-pulse" />
            </button>
          </div>

          <div className="h-4 w-[1px] bg-zinc-300/80 mx-1 hidden md:block" />

          {/* Search Trigger Button with Orbitron shortcut badge */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-full text-zinc-600 hover:text-black hover:bg-black/5 text-[13px] font-medium transition-colors focus:outline-none focus:ring-1 focus:ring-purple-500 cursor-pointer"
            aria-label="Open Search (Cmd+K)"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden lg:inline-block font-tech text-[9px] px-1.5 py-0.5 rounded bg-black/5 border border-black/10 text-zinc-600">
              ⌘K
            </kbd>
          </button>

          {/* Get Started Button: Dark with thin light border */}
          <button
            onClick={onOpenWaitlist}
            className="relative group overflow-hidden bg-zinc-950 text-white hover:bg-zinc-900 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-[13px] font-medium transition-all shadow-md border border-white/20 hover:border-purple-400/60 focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-1.5">
              <span>Get Started</span>
              <Sparkles className="w-3.5 h-3.5 text-purple-400 group-hover:rotate-12 transition-transform" />
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-transparent to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-full hover:bg-black/5 text-zinc-800 cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </nav>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-4 top-20 z-50 p-4 rounded-2xl glass-card bg-[#0e0918]/95 border border-purple-500/20 text-white md:hidden shadow-2xl backdrop-blur-2xl animate-in fade-in slide-in-from-top-4 duration-200 font-heading">
          <div className="flex flex-col gap-2 text-sm font-medium">
            <button
              onClick={() => {
                onNavigateSection('wearable')
                setMobileMenuOpen(false)
              }}
              className="text-left px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
            >
              Wearable
            </button>
            <button
              onClick={() => {
                onNavigateSection('neural')
                setMobileMenuOpen(false)
              }}
              className="text-left px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
            >
              Neural
            </button>
            <button
              onClick={() => {
                onNavigateSection('programs')
                setMobileMenuOpen(false)
              }}
              className="text-left px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
            >
              Programs
            </button>
            <button
              onClick={() => {
                onOpenUpdates()
                setMobileMenuOpen(false)
              }}
              className="text-left px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors flex items-center justify-between cursor-pointer"
            >
              <span>Updates</span>
              <span className="font-tech text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                v2.4 Live
              </span>
            </button>
            <div className="h-[1px] bg-white/10 my-1" />
            <button
              onClick={() => {
                onOpenSearch()
                setMobileMenuOpen(false)
              }}
              className="text-left px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors flex items-center gap-2 text-zinc-300 cursor-pointer"
            >
              <Search className="w-4 h-4" /> <span>Search Engine</span>
            </button>
            <button
              onClick={() => {
                onOpenWaitlist()
                setMobileMenuOpen(false)
              }}
              className="mt-1 w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-center font-medium shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
            >
              Get Started Now
            </button>
          </div>
        </div>
      )}
    </>
  )
}
