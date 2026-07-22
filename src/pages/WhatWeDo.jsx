import { useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Link } from 'react-router-dom'
import Highlight from '../components/Highlight'
import BoothSVG from '../components/BoothSVG'
import InstagramGrid from '../components/InstagramGrid'
import GlowOrb from '../components/GlowOrb'

const MotionLink = motion(Link)

// Editable prompt copy for the debate booth signs
const PROMPTS = [
  '"Eating Animals is Wrong — Change My Mind"',
  '"Everyone Should Go Vegan"',
  '"Ask Us Anything About Factory Farming"',
]

const BOOTH_IMAGES = ['/images/booth-1.jpg', '/images/booth-2.jpg', '/images/booth-3.jpg']

function PinnedReveal() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const [activeIndex, setActiveIndex] = useState(0)

  // Only one caption/image is ever mounted at a time (via AnimatePresence),
  // so they can't visually overlap regardless of scroll speed or timing.
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const next = v < 1 / 3 ? 0 : v < 2 / 3 ? 1 : 2
    setActiveIndex((prev) => (prev === next ? prev : next))
  })

  return (
    <section ref={ref} className="relative h-[300vh] bg-voice-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={BOOTH_IMAGES[activeIndex]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            src={BOOTH_IMAGES[activeIndex]}
            alt={`Debate booth prompt sign ${activeIndex + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-voice-black/50" />

        <div className="absolute inset-0 z-10 flex items-center justify-center px-6">
          <AnimatePresence mode="wait" initial={false}>
            <motion.h3
              key={PROMPTS[activeIndex]}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="text-center font-display uppercase text-3xl md:text-6xl text-voice-cream max-w-4xl mx-auto"
            >
              {PROMPTS[activeIndex]}
            </motion.h3>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default function WhatWeDo() {
  return (
    <div>
      {/* Intro hero */}
      <section className="relative overflow-hidden pt-40 pb-24 px-6 md:px-10 bg-voice-black">
        <GlowOrb color="gold" size={420} top="-6rem" right="-6rem" duration={13} />
        <div className="relative mx-auto max-w-4xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-display uppercase tracking-[0.3em] text-voice-gold text-xs"
          >
            What We Do
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display uppercase text-4xl md:text-7xl text-voice-cream mt-4 leading-[0.95]"
          >
            We set up a table.
            <br />
            We ask a <Highlight className="text-voice-gold">hard question.</Highlight>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-8 text-voice-cream/70 text-base md:text-lg max-w-2xl mx-auto"
          >
            Our format is simple: a public booth, a provocative prompt, and an open
            conversation with anyone who walks by. No debate team, no gotchas — just two
            sides talking until someone changes their mind, or explains why they won't.
          </motion.p>

          <motion.a
            href="https://3minutes.wtf/"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="inline-block mt-8 px-8 py-3 border border-voice-gold text-voice-gold font-display uppercase tracking-wide text-sm hover:bg-voice-gold hover:text-voice-black transition-colors"
          >
            Watch the 3 minutes we show at the booth ↗
          </motion.a>
        </div>

        <div className="relative mt-16">
          <BoothSVG />
        </div>
      </section>

      {/* Honest status section — momentum, not apology */}
      <section className="relative overflow-hidden bg-voice-green py-20 md:py-28 px-6 md:px-10 border-y border-voice-gold/20">
        <GlowOrb color="leaf" size={400} bottom="-6rem" left="-6rem" duration={12} delay={1} />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto max-w-3xl text-center"
        >
          <span className="font-display uppercase tracking-[0.3em] text-voice-gold text-xs">
            Right Now
          </span>
          <h2 className="font-display uppercase text-3xl md:text-5xl text-voice-cream mt-4 leading-tight">
            We haven't run our first booth yet.
            <br />
            We're building it right now.
          </h2>
          <p className="mt-6 text-voice-cream/80 text-base md:text-lg">
            VOICE is brand new. We're actively organizing, scouting locations, and reaching
            out to venues and campuses to set up our first debate booth. That's not a
            weakness — it's a starting line. If you want to help launch this thing, host a
            booth in your city, or just be part of getting the first one on the ground, we
            want to hear from you.
          </p>
          <MotionLink
            to="/contact"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="inline-block mt-8 px-8 py-3 bg-voice-gold text-voice-black font-display uppercase tracking-wide text-sm hover:bg-voice-cream transition-colors"
          >
            Help Us Set Up a Booth
          </MotionLink>
        </motion.div>
      </section>

      {/* Pinned scroll reveal of prompt signs */}
      <PinnedReveal />

      {/* Instagram content arm */}
      <section className="relative overflow-hidden bg-voice-black py-20 md:py-28 px-6 md:px-10">
        <GlowOrb color="gold" size={380} top="-4rem" left="50%" duration={13} delay={2} />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto max-w-3xl text-center mb-14"
        >
          <span className="font-display uppercase tracking-[0.3em] text-voice-gold text-xs">
            On Camera
          </span>
          <h2 className="font-display uppercase text-3xl md:text-5xl text-voice-cream mt-4">
            The booth doesn't end at the table.
          </h2>
          <p className="mt-6 text-voice-cream/70 text-base md:text-lg">
            We're building out a short-form content arm — clips from real conversations,
            skits, and street interviews — to carry the same questions further than any
            single booth can reach.
          </p>
        </motion.div>

        <div className="relative mx-auto max-w-4xl">
          <InstagramGrid />
        </div>
      </section>
    </div>
  )
}
