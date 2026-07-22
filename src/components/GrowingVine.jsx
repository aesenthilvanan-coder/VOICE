import { motion } from 'framer-motion'
import PixelLeaf from './PixelLeaf'

// About's signature motif: a vine that keeps growing down the page, holds,
// retreats, and grows again — the movement taking root. Runs as two mirrored
// columns pinned to the section's left/right margins (hidden below `lg`,
// where those margins vanish) so it never crosses the readable text column.
const CYCLE = 13 // seconds
const PATH = 'M10,0 C2,40 18,80 10,120 C2,160 18,200 10,240 C2,280 18,320 10,360 C2,400 18,440 10,480 C2,520 18,560 10,600'

const LEAVES = [
  { yPct: 10, side: -1, appear: 0.09, hide: 0.85 },
  { yPct: 28, side: 1, appear: 0.18, hide: 0.85 },
  { yPct: 46, side: -1, appear: 0.27, hide: 0.85 },
  { yPct: 64, side: 1, appear: 0.35, hide: 0.85 },
  { yPct: 82, side: -1, appear: 0.43, hide: 0.85 },
]

function Vine({ mirrored = false }) {
  return (
    <div
      className={`absolute inset-y-0 ${mirrored ? 'right-4' : 'left-4'} w-16 lg:w-20`}
      style={mirrored ? { transform: 'scaleX(-1)' } : undefined}
    >
      <svg viewBox="0 0 20 600" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
        <motion.path
          d={PATH}
          fill="none"
          stroke="var(--color-voice-leaf)"
          strokeWidth="0.6"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 0.4, 0.4, 0] }}
          transition={{
            duration: CYCLE,
            times: [0, 0.45, 0.85, 1],
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </svg>

      {LEAVES.map((leaf, i) => {
        const times = [0, leaf.appear, leaf.appear + 0.04, leaf.hide, leaf.hide + 0.04, 1]
        const values = [0, 0, 0.75, 0.75, 0, 0]
        return (
          <motion.div
            key={i}
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ top: `${leaf.yPct}%`, transform: `scaleX(${leaf.side})` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: values }}
            transition={{ duration: CYCLE, times, repeat: Infinity, ease: 'easeInOut' }}
          >
            <PixelLeaf size={12} color="var(--color-voice-leaf)" />
          </motion.div>
        )
      })}
    </div>
  )
}

export default function GrowingVine({ className = '' }) {
  return (
    <div
      className={`hidden lg:block absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <Vine />
      <Vine mirrored />
    </div>
  )
}
