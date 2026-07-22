import { useState } from 'react'
import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import ContentWarningGate from '../components/ContentWarningGate'
import Gallery from '../components/Gallery'
import StatCounter from '../components/StatCounter'
import CTASection from '../components/CTASection'
import Highlight from '../components/Highlight'
import NetworkField from '../components/NetworkField'

// Placeholder stats — swap for real figures once available
const STATS = [
  { value: 80, label: 'Billion land animals slaughtered yearly', suffix: 'B' },
  { value: 92, label: 'Percent of Amazon deforestation tied to agriculture', suffix: '%' },
  { value: 1, label: 'Conversation at a time', suffix: '' },
]

export default function Home() {
  const [galleryRevealed, setGalleryRevealed] = useState(false)
  const [gallerySkipped, setGallerySkipped] = useState(false)

  return (
    <div>
      <Hero />

      {/* Intro / framing section */}
      <section className="relative overflow-hidden bg-voice-black py-20 md:py-28 px-6 md:px-10">
        <NetworkField className="opacity-80" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto max-w-3xl text-center"
        >
          <h2 className="font-display uppercase text-2xl md:text-4xl text-voice-cream leading-snug">
            We don't preach. We <Highlight className="text-voice-gold">debate</Highlight>.
          </h2>
          <p className="mt-6 text-voice-cream/70 text-base md:text-lg">
            VOICE exists to put the case for animals in front of ordinary people, in public,
            without a script. We believe the strongest argument against eating animals is
            simply a fair hearing — so we ask you to change our mind.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative mx-auto max-w-5xl mt-16 grid grid-cols-1 sm:grid-cols-3 gap-10"
        >
          {STATS.map((s) => (
            <StatCounter key={s.label} {...s} />
          ))}
        </motion.div>
      </section>

      {/* Graphic content gated section */}
      <ContentWarningGate
        revealed={galleryRevealed || gallerySkipped}
        onView={() => setGalleryRevealed(true)}
        onSkip={() => setGallerySkipped(true)}
      />
      {galleryRevealed && <Gallery />}
      {gallerySkipped && !galleryRevealed && (
        <section className="bg-voice-black py-16 px-6 text-center">
          <p className="text-voice-cream/50 text-sm">
            You chose to skip this section.{' '}
            <button
              onClick={() => setGalleryRevealed(true)}
              className="text-voice-gold border-b border-voice-gold/50 hover:text-voice-cream"
            >
              View it anyway
            </button>
          </p>
        </section>
      )}

      <CTASection />
    </div>
  )
}
