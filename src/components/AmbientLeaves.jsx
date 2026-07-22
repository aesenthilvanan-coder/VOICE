import { motion } from 'framer-motion'
import { useMemo } from 'react'
import PixelLeaf from './PixelLeaf'

const LEAF_COLORS = [
  'var(--color-voice-gold)',
  'var(--color-voice-leaf)',
  'var(--color-voice-cream)',
]
const LEAF_COUNT = 14

// Persistent, whole-site ambient layer — a sparse field of pixel leaves that
// never stops drifting, so every flat-color section has quiet motion behind
// it instead of going dead once the scroll-in animations finish. Fixed to
// the viewport (drifts independently of scroll) and blended so it reads as
// atmosphere, not decoration fighting the copy.
function useDrift(count) {
  return useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: ((i * 67 + 11) % 100),
        size: 9 + ((i * 17) % 14),
        delay: (i % 6) * 1.4,
        duration: 14 + ((i * 11) % 12),
        spin: i % 2 === 0 ? 160 : -160,
        color: LEAF_COLORS[i % LEAF_COLORS.length],
      })),
    [count],
  )
}

export default function AmbientLeaves() {
  const leaves = useDrift(LEAF_COUNT)

  return (
    <div
      className="fixed inset-0 z-[55] pointer-events-none overflow-hidden"
      style={{ mixBlendMode: 'overlay' }}
      aria-hidden="true"
    >
      {leaves.map((leaf) => (
        <motion.div
          key={leaf.id}
          className="absolute top-0"
          style={{ left: `${leaf.left}%` }}
          initial={{ y: '-10vh', rotate: 0, opacity: 0 }}
          animate={{
            y: '110vh',
            rotate: leaf.spin,
            opacity: [0, 0.6, 0.6, 0],
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
  )
}
