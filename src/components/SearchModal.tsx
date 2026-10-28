import { useState, useEffect, useRef } from 'react'
import { Search, X, ArrowRight, Cpu, Radio, Shield, Sparkles } from 'lucide-react'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectResult: (targetId: string) => void
}

interface SearchItem {
  id: string
  title: string
  category: string
  desc: string
  icon: typeof Cpu
}

const SEARCH_DATABASE: SearchItem[] = [
  {
    id: 'wearable',
    title: 'Wearable Intelligence Hardware',
    category: 'Hardware',
    desc: 'Low-power biometric ring and wrist telemetry band architecture.',
    icon: Cpu,
  },
  {
    id: 'neural',
    title: 'Neural Motor Cortex Telemetry',
    category: 'Synaptic',
    desc: 'Reading intention 300ms before muscle movement executes.',
    icon: Radio,
  },
  {
    id: 'programs',
    title: 'Adaptive Programs & Spatial OS',
    category: 'Software',
    desc: 'Self-organizing reactive UI layers powered by Superconscious.',
    icon: Sparkles,
  },
  {
    id: 'hero',
    title: 'Superconscious Neural Engine',
    category: 'Overview',
    desc: 'Core architecture: One model, every surface.',
    icon: Sparkles,
  },
  {
    id: 'security',
    title: 'Biometric Zero-Knowledge Enclave',
    category: 'Security',
    desc: 'E2E encrypted local neural processing and private weights.',
    icon: Shield,
  },
]

export function SearchModal({ isOpen, onClose, onSelectResult }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
    } else {
      setQuery('')
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        if (isOpen) onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const filtered = SEARCH_DATABASE.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.desc.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-xl rounded-2xl glass-card bg-[#0d0818]/95 border border-purple-500/30 shadow-2xl p-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-white/10 pb-3">
          <Search className="w-5 h-5 text-purple-400 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search neural specs, hardware, documentation..."
            className="w-full bg-transparent text-white placeholder-zinc-500 font-heading text-sm focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-zinc-500 hover:text-white mr-2 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 font-tech text-xs cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="mt-3 max-h-80 overflow-y-auto space-y-1 pr-1">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs font-tech text-zinc-500">
              NO MATCHING NEURAL VECTORS FOUND FOR "{query}"
            </div>
          ) : (
            filtered.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectResult(item.id)
                    onClose()
                  }}
                  className="w-full p-3 rounded-xl hover:bg-white/[0.06] flex items-center justify-between text-left transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-900/30 border border-purple-500/20 flex items-center justify-center text-purple-300 group-hover:border-purple-400/50">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-heading font-medium text-white flex items-center gap-2">
                        <span>{item.title}</span>
                        <span className="font-tech text-[9px] tracking-tech px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300">
                          {item.category}
                        </span>
                      </div>
                      <div className="font-body text-[11px] text-zinc-400 line-clamp-1 mt-0.5">
                        {item.desc}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                </button>
              )
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between font-tech text-[10px] tracking-tech text-zinc-500">
          <span>NAVIGATION // PRE-COGNITIVE INDEX</span>
          <span>SELECT TO GLIDE</span>
        </div>
      </div>
    </div>
  )
}
