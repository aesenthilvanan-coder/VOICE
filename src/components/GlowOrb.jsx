import { motion } from 'framer-motion'

const COLORS = {
  gold: 'var(--color-voice-gold)',
  leaf: 'var(--color-voice-leaf)',
}

// Soft breathing blur-blob used to give otherwise-flat section backgrounds
// depth and slow motion. Purely decorative — pointer-events-none, absolutely
// positioned, expects an `overflow-hidden` ancestor so it never causes
// scrollbars. Keep opacity low; this is atmosphere, not a gradient wash.
export default function GlowOrb({
  color = 'gold',
  size = 420,
  top,
  bottom,
  left,
  right,
  duration = 10,
  delay = 0,
}) {
  return (
    <motion.div
      aria-hidden="true"
      className="absolute rounded-full pointer-events-none blur-3xl"
      style={{
        width: size,
        height: size,
        top,
        bottom,
        left,
        right,
        backgroundColor: COLORS[color] ?? color,
      }}
      initial={{ opacity: 0.08, scale: 0.9 }}
      animate={{ opacity: [0.08, 0.18, 0.08], scale: [0.9, 1.05, 0.9] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}
