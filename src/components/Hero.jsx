import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

// EDIT HEADLINE HERE — kept as a simple constant for easy copy changes.
const HEADLINE = 'EATING ANIMALS IS WRONG.'
const HEADLINE_LINE_2 = 'CHANGE OUR MIND.'
const SUBHEAD =
  'We set up public debate booths and have the conversation most people avoid. No script. No shouting. Just questions.'

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden bg-voice-black">
      <motion.img
        style={{ y }}
        src="/images/hero-booth.jpg"
        alt="VOICE debate booth in action"
        className="absolute inset-0 w-full h-[130%] object-cover"
      />
      {/* Flat solid scrim, not a gradient, per brand rules */}
      <div className="absolute inset-0 bg-voice-black/55" />

      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
      >
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display uppercase tracking-[0.35em] text-voice-gold text-xs md:text-sm mb-6"
        >
          VOICE &mdash; Vegans Organizing for Informed Conversation &amp; Ethics
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-display uppercase text-voice-cream leading-[0.95] text-4xl sm:text-6xl md:text-8xl max-w-5xl"
        >
          {HEADLINE}
          <br />
          <span className="text-voice-gold">{HEADLINE_LINE_2}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-8 max-w-xl text-voice-cream/80 text-base md:text-lg"
        >
          {SUBHEAD}
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="font-display uppercase tracking-widest text-voice-cream/60 text-xs">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 bg-voice-gold"
        />
      </motion.div>

      <motion.img
        src="/images/logo-mark.png"
        alt=""
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.9 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 right-6 md:right-10 z-10 w-10 h-10 md:w-14 md:h-14"
      />
    </section>
  )
}
