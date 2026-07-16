import { motion } from 'framer-motion'

// Wraps a phrase with an animated gold underline that draws in on scroll into view.
export default function Highlight({ children, className = '' }) {
  return (
    <span className={`relative inline-block ${className}`}>
      {children}
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        style={{ originX: 0 }}
        className="absolute left-0 -bottom-1 h-[3px] w-full bg-voice-gold"
      />
    </span>
  )
}
