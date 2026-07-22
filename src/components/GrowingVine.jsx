import { motion } from 'framer-motion'
import PixelLeaf from './PixelLeaf'

// About's signature motif: a vine that keeps growing down the page, holds,
// retreats, and grows again — the movement taking root. Leaves along it pop
// in near where the tip would be at that point in the cycle.
const PATH =
  'M50,0 C15,70 85,140 50,210 C15,280 85,350 50,420 C15,490 85,560 50,630 C15,700 85,760 50,820'

const LEAVES = [
  { x: 22, y: 90, side: -1, delay: 1.4 },
  { x: 78, y: 260, side: 1, delay: 3.2 },
  { x: 22, y: 440, side: -1, delay: 5.4 },
  { x: 78, y: 610, side: 1, delay: 7.6 },
  { x: 22, y: 770, side: -1, delay: 9.4 },
]

export default function GrowingVine({ className = '' }) {
  return (
    <svg
      viewBox="0 0 100 820"
      preserveAspectRatio="none"
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <motion.path
        d={PATH}
        fill="none"
        stroke="var(--color-voice-leaf)"
        strokeWidth="0.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 0.55, 0.55, 0] }}
        transition={{
          duration: 13,
          times: [0, 0.45, 0.85, 1],
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      {LEAVES.map((leaf, i) => (
        <motion.g
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.7, 0.7, 0] }}
          transition={{
            duration: 13,
            times: [0, 0.06, 0.75, 0.82],
            repeat: Infinity,
            delay: 0,
            ease: 'easeInOut',
          }}
        >
          <foreignObject x={leaf.x - 3} y={leaf.y - 3} width="10" height="14">
            <div style={{ transform: `scaleX(${leaf.side})` }}>
              <PixelLeaf size={10} color="var(--color-voice-leaf)" />
            </div>
          </foreignObject>
        </motion.g>
      ))}
    </svg>
  )
}
