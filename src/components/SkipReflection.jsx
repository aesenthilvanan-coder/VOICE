import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Shown when someone skips the graphic content section. In keeping with the
// booth's whole MO — never let someone walk away without asking why — this
// turns the skip itself into the debate prompt instead of just letting it go.
const REASONS = [
  {
    label: 'Too hard to watch',
    rebuttal:
      "If it's too hard to watch, that's not squeamishness — that's your own instinct telling you something is wrong with it.",
  },
  {
    label: "I already know what's in there",
    rebuttal:
      'Then we already agree on the facts. The only thing left to debate is what you do about it.',
  },
  {
    label: "It won't change my mind",
    rebuttal:
      "Maybe not from a photo. That's exactly why we set up a table and ask you in person instead.",
  },
  {
    label: 'Not in the mood right now',
    rebuttal: "Fair. The animals don't get to pick their mood either. Come back when you are.",
  },
]

export default function SkipReflection({ onView }) {
  const [pickedIndex, setPickedIndex] = useState(null)
  const picked = pickedIndex === null ? null : REASONS[pickedIndex]

  return (
    <section className="bg-voice-black py-16 px-6 md:px-10 border-y border-voice-gold/10">
      <div className="mx-auto max-w-xl text-center">
        <span className="font-display uppercase tracking-[0.3em] text-voice-gold text-xs">
          You Skipped It
        </span>
        <h3 className="font-display uppercase text-2xl md:text-3xl text-voice-cream mt-3">
          Why do you think that is? Isn't that telling?
        </h3>

        <AnimatePresence mode="wait">
          {picked === null ? (
            <motion.div
              key="reasons"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-3"
            >
              {REASONS.map((r, i) => (
                <button
                  key={r.label}
                  onClick={() => setPickedIndex(i)}
                  className="px-5 py-2.5 border border-voice-cream/25 text-voice-cream/80 text-sm hover:border-voice-gold hover:text-voice-gold transition-colors"
                >
                  {r.label}
                </button>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="rebuttal"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-8"
            >
              <p className="text-voice-cream/80 text-base md:text-lg italic">"{picked.rebuttal}"</p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={onView}
                  className="px-8 py-3 bg-voice-gold text-voice-black font-display uppercase tracking-wide text-sm hover:bg-voice-cream transition-colors"
                >
                  View It Anyway
                </button>
                <button
                  onClick={() => setPickedIndex(null)}
                  className="text-voice-cream/50 text-sm hover:text-voice-gold underline underline-offset-2"
                >
                  Pick a different reason
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
