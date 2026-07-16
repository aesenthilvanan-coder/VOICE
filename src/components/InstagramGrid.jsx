import { motion } from 'framer-motion'

// Placeholder cards standing in for real Instagram embeds — swap for actual
// embed markup/API data later. Edit POST_COUNT or add real captions per card.
const POST_COUNT = 6

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function InstagramGrid() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
    >
      {Array.from({ length: POST_COUNT }).map((_, i) => (
        <motion.div
          key={i}
          variants={item}
          className="aspect-square bg-voice-ink border border-voice-cream/10 hover:border-voice-gold/50 transition-colors flex flex-col items-center justify-center gap-3 group cursor-pointer"
        >
          <svg
            className="w-8 h-8 text-voice-cream/40 group-hover:text-voice-gold transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <rect x="3" y="3" width="18" height="18" rx="4" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
          </svg>
          <span className="text-voice-cream/40 text-xs uppercase tracking-wide">
            Post coming soon
          </span>
        </motion.div>
      ))}
    </motion.div>
  )
}
