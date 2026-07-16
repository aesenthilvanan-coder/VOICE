import { motion, AnimatePresence } from 'framer-motion'

// Full-viewport content warning gate. Renders in-flow (not fixed) so it appears
// naturally as the user scrolls to the graphic imagery section, then dissolves on choice.
export default function ContentWarningGate({ onView, onSkip, revealed }) {
  return (
    <AnimatePresence>
      {!revealed && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="relative min-h-screen w-full flex items-center justify-center bg-voice-black border-y border-voice-gold/20 px-6"
        >
          <div className="max-w-2xl text-center">
            <span className="inline-block font-display uppercase tracking-[0.3em] text-voice-gold text-xs mb-6">
              Content Warning
            </span>
            <h2 className="font-display text-3xl md:text-5xl uppercase text-voice-cream leading-tight mb-6">
              The following images contain graphic content
              <br className="hidden md:block" /> depicting animal cruelty.
            </h2>
            <p className="text-voice-cream/70 mb-10 text-base md:text-lg">
              Viewer discretion advised. What follows is real footage from real animal
              agriculture facilities — this is the industry we are asking you to reconsider.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onView}
                className="px-8 py-3 bg-voice-gold text-voice-black font-display uppercase tracking-wide text-sm hover:bg-voice-cream transition-colors"
              >
                View
              </button>
              <button
                onClick={onSkip}
                className="px-8 py-3 border border-voice-cream/30 text-voice-cream font-display uppercase tracking-wide text-sm hover:border-voice-gold hover:text-voice-gold transition-colors"
              >
                Skip
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
