import { motion } from 'framer-motion'

const RING_COUNT = 4

// What We Do's signature motif: a hard question broadcast outward from the
// booth, over and over. Rings are staggered so one is always mid-expansion.
export default function PulseRings({ className = '', color = 'gold', maxSize = 560 }) {
  const strokeColor = color === 'leaf' ? 'var(--color-voice-leaf)' : 'var(--color-voice-gold)'

  return (
    <div
      className={`absolute inset-0 flex items-center justify-center pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {Array.from({ length: RING_COUNT }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full border"
          style={{ borderColor: strokeColor }}
          initial={{ width: 30, height: 30, opacity: 0.5 }}
          animate={{ width: maxSize, height: maxSize, opacity: 0 }}
          transition={{
            duration: 5,
            delay: i * (5 / RING_COUNT),
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  )
}
