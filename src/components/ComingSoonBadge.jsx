import { motion } from 'framer-motion'

// Pulsing pill badge for the peta2 / ASAP debate teaser — pulled straight from
// the real @voice_vegan bio line so the site and Instagram stay in sync.
export default function ComingSoonBadge({ className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.25 }}
      className={`inline-flex items-center gap-2 border border-voice-gold/50 rounded-full px-4 py-1.5 ${className}`}
    >
      <motion.span
        animate={{ opacity: [1, 0.25, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        className="w-1.5 h-1.5 rounded-full bg-voice-gold shrink-0"
      />
      <span className="font-display uppercase tracking-[0.15em] text-voice-gold text-[10px] md:text-xs whitespace-nowrap">
        peta2 &times; ASAP Debates &mdash; Coming Soon
      </span>
    </motion.div>
  )
}
