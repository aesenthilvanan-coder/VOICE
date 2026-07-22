import { motion } from 'framer-motion'
import { useMemo } from 'react'

const NODE_COUNT = 10

// Home's signature background motif: a mesh of drifting nodes with pulses
// traveling along the connections between them — "one idea reaching the
// next person." Deterministic layout (no Math.random) so it's stable
// across renders; only the motion is live.
//
// Lines live in an SVG stretched to fill the (usually wide, short) section —
// that non-uniform stretch is fine for a straight line. Nodes/pulses are
// separate HTML dots positioned by percentage so they stay perfectly round
// regardless of the section's aspect ratio.
function useNetwork(count) {
  return useMemo(() => {
    const nodes = Array.from({ length: count }).map((_, i) => {
      const angle = (i / count) * Math.PI * 2 * 1.9
      const radius = 20 + ((i * 37) % 34)
      return {
        id: i,
        x: 50 + Math.cos(angle) * radius,
        y: 50 + Math.sin(angle) * radius * 0.6,
        driftX: 3 + (i % 4),
        driftY: 2 + (i % 3),
        duration: 8 + ((i * 5) % 10),
      }
    })
    const edges = []
    nodes.forEach((_, i) => {
      edges.push([i, (i + 1) % count])
      if (i % 2 === 0) edges.push([i, (i + 3) % count])
    })
    return { nodes, edges }
  }, [count])
}

export default function NetworkField({ className = '' }) {
  const { nodes, edges } = useNetwork(NODE_COUNT)

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} aria-hidden="true">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
        {edges.map(([a, b], i) => {
          const na = nodes[a]
          const nb = nodes[b]
          return (
            <motion.line
              key={i}
              x1={na.x}
              y1={na.y}
              x2={nb.x}
              y2={nb.y}
              stroke="var(--color-voice-gold)"
              strokeWidth="0.15"
              initial={{ opacity: 0.06 }}
              animate={{ opacity: [0.06, 0.28, 0.06] }}
              transition={{
                duration: 4 + (i % 5),
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.3,
              }}
            />
          )
        })}
      </svg>

      {edges.map(([a, b], i) => {
        const na = nodes[a]
        const nb = nodes[b]
        return (
          <motion.span
            key={`pulse-${i}`}
            className="absolute w-1.5 h-1.5 -ml-[3px] -mt-[3px] rounded-full bg-voice-leaf"
            initial={{ left: `${na.x}%`, top: `${na.y}%`, opacity: 0 }}
            animate={{
              left: [`${na.x}%`, `${nb.x}%`, `${na.x}%`],
              top: [`${na.y}%`, `${nb.y}%`, `${na.y}%`],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 5 + (i % 4),
              repeat: Infinity,
              ease: 'linear',
              delay: i * 0.5,
            }}
          />
        )
      })}

      {nodes.map((n) => (
        <motion.span
          key={n.id}
          className="absolute w-2 h-2 -ml-1 -mt-1 rounded-full bg-voice-gold"
          initial={{ left: `${n.x}%`, top: `${n.y}%`, opacity: 0.4 }}
          animate={{
            left: [`${n.x}%`, `${n.x + n.driftX}%`, `${n.x - n.driftX}%`, `${n.x}%`],
            top: [`${n.y}%`, `${n.y - n.driftY}%`, `${n.y + n.driftY}%`, `${n.y}%`],
            opacity: [0.4, 0.85, 0.4],
          }}
          transition={{ duration: n.duration, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}
