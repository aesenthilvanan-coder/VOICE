import { motion } from 'framer-motion'
import Highlight from '../components/Highlight'
import StatCounter from '../components/StatCounter'
import GlowOrb from '../components/GlowOrb'

// Editable mission copy
const MISSION_PARAGRAPHS = [
  `VOICE — Vegans Organizing for Informed Conversation & Ethics — started from a simple
  frustration: most people have never actually been asked to defend eating animals out
  loud, to someone's face, without walking away.`,
  `We're not interested in shouting, shaming, or slogans. We're interested in the
  conversation itself — the kind you can only have in public, with a stranger, over a
  folding table and an uncomfortable sign.`,
  `Our bet is that when people are given real space to think through the ethics of
  animal agriculture, without being talked down to, a lot of them change their minds. The
  rest at least have to think about why they haven't.`,
]

const VALUES = [
  {
    title: 'Honesty over persuasion',
    body: 'We\'d rather lose an argument in good faith than win one with a trick.',
  },
  {
    title: 'Public, not preachy',
    body: 'We go where people already are, and we let them opt in to the conversation.',
  },
  {
    title: 'Built in the open',
    body: "We're a new organization and we're not going to pretend otherwise.",
  },
]

const ABOUT_STATS = [
  { value: 2, label: 'Co-founders getting this off the ground' },
  { value: 1, label: 'City we are starting in' },
  { value: 0, label: 'Booths run so far — that changes soon', suffix: '' },
]

export default function About() {
  return (
    <div>
      <section className="relative overflow-hidden pt-40 pb-24 px-6 md:px-10 bg-voice-black">
        <GlowOrb color="leaf" size={440} top="-6rem" left="-8rem" duration={13} />
        <div className="relative mx-auto max-w-4xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-display uppercase tracking-[0.3em] text-voice-gold text-xs"
          >
            About
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display uppercase text-4xl md:text-7xl text-voice-cream mt-4 leading-[0.95]"
          >
            Ask the question
            <br />
            everyone <Highlight className="text-voice-gold">avoids.</Highlight>
          </motion.h1>
        </div>
      </section>

      <section className="bg-voice-black pb-20 md:pb-28 px-6 md:px-10">
        <div className="mx-auto max-w-2xl space-y-6">
          {MISSION_PARAGRAPHS.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-voice-cream/80 text-base md:text-lg leading-relaxed"
            >
              {p}
            </motion.p>
          ))}
        </div>
      </section>

      <section className="bg-voice-green py-20 md:py-28 px-6 md:px-10 border-y border-voice-gold/20">
        <div className="mx-auto max-w-5xl grid grid-cols-1 sm:grid-cols-3 gap-10">
          {ABOUT_STATS.map((s) => (
            <StatCounter key={s.label} {...s} />
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-voice-black py-20 md:py-28 px-6 md:px-10">
        <GlowOrb color="gold" size={400} bottom="-6rem" right="-6rem" duration={12} delay={1.5} />
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative font-display uppercase text-3xl md:text-5xl text-voice-cream text-center mb-14"
        >
          What we stand on
        </motion.h2>
        <div className="relative mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8">
          {VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              whileHover={{ x: 6, borderColor: 'var(--color-voice-leaf)' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="border-l-2 border-voice-gold pl-6"
            >
              <h3 className="font-display uppercase text-xl text-voice-cream">{v.title}</h3>
              <p className="mt-3 text-voice-cream/70 text-sm md:text-base">{v.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Founders' note */}
      <section className="relative overflow-hidden bg-voice-ink py-20 md:py-28 px-6 md:px-10 border-t border-voice-gold/20">
        <GlowOrb color="leaf" size={360} top="-4rem" left="50%" duration={11} />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto max-w-2xl"
        >
          <motion.img
            src="/images/logo-mark.png"
            alt="VOICE"
            animate={{ scale: [1, 1.08, 1], opacity: [0.9, 1, 0.9] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="w-12 h-12 mx-auto mb-6"
          />
          <span className="font-display uppercase tracking-[0.3em] text-voice-gold text-xs block text-center mb-6">
            A Note From Us
          </span>
          <p className="text-voice-cream/80 text-base md:text-lg leading-relaxed italic text-center">
            "We built VOICE because we were tired of the conversation about animal
            agriculture happening everywhere except in person, in public, between real
            people. We don't have this fully figured out yet. We're two people building the
            first booth right now — and we'd rather do that honestly, in front of everyone,
            than wait until it looks polished."
          </p>
          <p className="mt-6 text-center text-voice-gold font-display uppercase tracking-wide text-sm">
            — Aaryan &amp; Mason, Co-Founders
          </p>
        </motion.div>
      </section>
    </div>
  )
}
