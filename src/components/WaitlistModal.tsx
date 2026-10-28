import { useState } from 'react'
import { X, Sparkles, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react'

interface WaitlistModalProps {
  isOpen: boolean
  onClose: () => void
}

export function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [surface, setSurface] = useState('Neural Ring v2')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 900)
  }

  const handleReset = () => {
    setSubmitted(false)
    setName('')
    setEmail('')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg rounded-3xl glass-card bg-[#0e0819]/95 border border-purple-500/30 p-6 sm:p-8 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background ambient purple light */}
        <div className="absolute -top-24 -right-24 w-60 h-60 rounded-full bg-purple-600/20 blur-[80px] pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 font-tech tracking-tech text-[10px] sm:text-xs text-purple-400 uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Priority Hardware Allocation</span>
            </div>

            <h3 className="font-heading font-light text-2xl sm:text-3xl text-gradient-silver mb-2">
              Join the Superconscious Beta
            </h3>
            <p className="font-body text-xs sm:text-sm text-zinc-300 font-light mb-6 leading-relaxed">
              Reserve your place in the initial alpha distribution of BEYOND neural telemetry
              hardware and real-time intent computation models.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-tech text-[10px] tracking-tech text-zinc-400 uppercase mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Elena Rostova"
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white font-heading text-sm focus:outline-none focus:border-purple-400/80 transition-colors placeholder:text-zinc-600"
                />
              </div>

              <div>
                <label className="block font-tech text-[10px] tracking-tech text-zinc-400 uppercase mb-1.5">
                  Direct Neural Identity / Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="elena@cognition.lab"
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white font-heading text-sm focus:outline-none focus:border-purple-400/80 transition-colors placeholder:text-zinc-600"
                />
              </div>

              <div>
                <label className="block font-tech text-[10px] tracking-tech text-zinc-400 uppercase mb-1.5">
                  Preferred Initial Surface
                </label>
                <select
                  value={surface}
                  onChange={(e) => setSurface(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-black/70 border border-white/10 text-white font-heading text-sm focus:outline-none focus:border-purple-400/80 transition-colors"
                >
                  <option value="Neural Ring v2">Neural Ring v2 (Liquid Chrome)</option>
                  <option value="Wrist Telemetry Band">Wrist Telemetry Band (Haptic Core)</option>
                  <option value="Auricular Implant">Auricular Implant Array</option>
                  <option value="Developer SDK">Developer Intent SDK & Omni Mesh</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-heading font-medium tracking-tight text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-600/30 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <span className="flex items-center gap-2 font-tech text-xs">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Allocating Synapse Token...
                    </span>
                  ) : (
                    <>
                      <span>Confirm Reservation</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-4 flex items-center justify-center gap-2 font-tech text-[10px] tracking-tech text-zinc-500">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
              <span>ZERO BIOMETRIC TELEMETRY STORED WITHOUT CONSENT</span>
            </div>
          </div>
        ) : (
          <div className="text-center py-6 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-purple-600/20 border border-purple-500/40 text-purple-300 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="font-heading font-light text-2xl text-white mb-2">
              Allocation Confirmed
            </h3>
            <div className="font-tech text-xs tracking-tech text-purple-400 mb-4">
              TOKEN // #SC-9042-ALPHA
            </div>

            <p className="font-body text-xs sm:text-sm text-zinc-300 font-light max-w-sm mx-auto mb-6 leading-relaxed">
              Welcome, <span className="text-white font-medium">{name || 'Explorer'}</span>. Your
              request for <span className="text-purple-300">{surface}</span> has been indexed on the
              primary dispatch queue. We will ping your neural inbox at{' '}
              <span className="text-white font-medium">{email}</span>.
            </p>

            <button
              onClick={handleReset}
              className="py-2.5 px-6 rounded-xl bg-white/10 hover:bg-white/20 text-white font-tech text-xs tracking-tech transition-colors cursor-pointer"
            >
              DISMISS NOTICE
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
