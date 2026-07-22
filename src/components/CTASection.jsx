import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import GlowOrb from './GlowOrb'

const MotionLink = motion(Link)

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-voice-green py-24 md:py-32 px-6 md:px-10 border-t border-voice-gold/20">
      <GlowOrb color="leaf" size={460} top="-8rem" left="-8rem" duration={14} />
      <GlowOrb color="gold" size={400} bottom="-8rem" right="-6rem" duration={12} delay={2} />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative mx-auto max-w-4xl text-center"
      >
        <h2 className="font-display uppercase text-3xl md:text-6xl text-voice-cream leading-tight">
          If you can defend it, prove it.
        </h2>
        <p className="mt-6 text-voice-cream/80 text-base md:text-lg max-w-2xl mx-auto">
          We're building public debate booths across the country and putting cameras and
          conversations on things most people won't say out loud. Come see how it works,
          or get in touch.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <MotionLink
            to="/what-we-do"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="px-8 py-3 bg-voice-gold text-voice-black font-display uppercase tracking-wide text-sm hover:bg-voice-cream transition-colors"
          >
            What We Do
          </MotionLink>
          <MotionLink
            to="/contact"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="px-8 py-3 border border-voice-cream/40 text-voice-cream font-display uppercase tracking-wide text-sm hover:border-voice-gold hover:text-voice-gold transition-colors"
          >
            Get In Touch
          </MotionLink>
        </div>
      </motion.div>
    </section>
  )
}
