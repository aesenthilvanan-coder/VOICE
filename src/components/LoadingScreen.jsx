import { motion } from 'framer-motion'
import { useMemo } from 'react'
import PixelLeaf from './PixelLeaf'

const LEAF_COLORS = [
  'var(--color-voice-gold)',
  'var(--color-voice-cream)',
  'var(--color-voice-gold-dim)',
]
const WORDMARK = 'VOICE'
const LEAF_COUNT = 22

// Deterministic pseudo-scatter (no Math.random) so every render lays the
// leaves out the same way, just staggered in time.
function useFallingLeaves(count) {
  return useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: ((i * 41 + 7) % 100),
        size: 10 + ((i * 13) % 16),
        delay: (i % 8) * 0.22,
        duration: 3 + ((i * 7) % 9) * 0.24,
        spin: i % 2 === 0 ? 220 : -220,
        color: LEAF_COLORS[i % LEAF_COLORS.length],
      })),
    [count],
  )
}

// Full-viewport animated loading screen: pixel-art leaves drift down over a
// flat brand-green field while the wordmark builds itself letter by letter.
// Mounted by App.jsx for a minimum duration on first load.
export default function LoadingScreen() {
  const leaves = useFallingLeaves(LEAF_COUNT)

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
      className="fixed inset-0 z-[100] bg-voice-green overflow-hidden flex items-center justify-center"
    >
      <div className="absolute inset-0" aria-hidden="true">
        {leaves.map((leaf) => (
          <motion.div
            key={leaf.id}
            className="absolute top-0"
            style={{ left: `${leaf.left}%` }}
            initial={{ y: '-10vh', rotate: 0, opacity: 0 }}
            animate={{
              y: '110vh',
              rotate: leaf.spin,
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: leaf.duration,
              delay: leaf.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <PixelLeaf size={leaf.size} color={leaf.color} />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center px-6">
        <motion.img
          src="/images/logo-mark.png"
          alt="VOICE"
          initial={{ scale: 0.4, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
          className="w-14 h-14 md:w-20 md:h-20 mb-6"
        />

        <div className="flex gap-1 md:gap-2">
          {WORDMARK.split('').map((ch, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
              className="font-display uppercase text-voice-cream text-3xl md:text-5xl tracking-[0.2em]"
            >
              {ch}
            </motion.span>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="mt-4 font-display uppercase tracking-[0.3em] text-voice-gold text-[10px] md:text-xs text-center"
        >
          Reason in defense of the voiceless
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 1.05, ease: 'easeInOut' }}
          className="origin-left h-[2px] w-40 md:w-56 bg-voice-gold mt-6"
        />
      </div>
    </motion.div>
  )
}
