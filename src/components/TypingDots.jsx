import { motion } from 'framer-motion'

// Small "conversation in progress" indicator — three bouncing dots, the way
// a chat shows someone typing. Used as a thematic accent, not a background.
export default function TypingDots({ className = '' }) {
  return (
    <div className={`inline-flex items-center gap-2 ${className}`} aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-2 h-2 rounded-full bg-voice-gold"
          animate={{ y: [0, -8, 0], opacity: [0.35, 1, 0.35] }}
          transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.18, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}
