import { motion } from 'framer-motion'

// Contact's signature motif: three nodes — the three debaters — locked in a
// slowly orbiting triangle, with pulses running back and forth along every
// edge at once. A literal picture of "three voices, one table."
//
// Everything (lines + dots) sits inside one rotating HTML wrapper so the
// whole triangle spins as a unit while the dots — separate HTML elements,
// not stretched SVG circles — stay perfectly round no matter the section's
// aspect ratio.
const NODES = [
  { x: 50, y: 15 },
  { x: 15, y: 80 },
  { x: 85, y: 80 },
]
const EDGES = [
  [0, 1],
  [1, 2],
  [2, 0],
]

export default function DebateOrbit({ className = '' }) {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} aria-hidden="true">
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 70, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: '50% 50%' }}
      >
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
          {EDGES.map(([a, b], i) => {
            const na = NODES[a]
            const nb = NODES[b]
            return (
              <line
                key={i}
                x1={na.x}
                y1={na.y}
                x2={nb.x}
                y2={nb.y}
                stroke="var(--color-voice-gold)"
                strokeWidth="0.2"
                opacity="0.22"
              />
            )
          })}
        </svg>

        {EDGES.map(([a, b], i) => {
          const na = NODES[a]
          const nb = NODES[b]
          return (
            <motion.span
              key={`pulse-${i}`}
              className="absolute w-2 h-2 -ml-1 -mt-1 rounded-full bg-voice-leaf"
              initial={{ left: `${na.x}%`, top: `${na.y}%`, opacity: 0 }}
              animate={{
                left: [`${na.x}%`, `${nb.x}%`, `${na.x}%`],
                top: [`${na.y}%`, `${nb.y}%`, `${na.y}%`],
                opacity: [0, 1, 0],
              }}
              transition={{ duration: 4.5, repeat: Infinity, delay: i * 1.4, ease: 'easeInOut' }}
            />
          )
        })}

        {NODES.map((n, i) => (
          <motion.span
            key={`node-${i}`}
            className="absolute w-3 h-3 -ml-1.5 -mt-1.5 rounded-full bg-voice-gold"
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
            animate={{ opacity: [0.55, 1, 0.55], scale: [0.9, 1.2, 0.9] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.4, ease: 'easeInOut' }}
          />
        ))}
      </motion.div>
    </div>
  )
}
