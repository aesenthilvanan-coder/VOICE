import { motion } from 'framer-motion'

export default function FounderCard({ name, role, email, photo, bio }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group flex-1 border border-voice-cream/15 hover:border-voice-gold/60 transition-colors bg-voice-ink"
    >
      <div className="aspect-[4/5] overflow-hidden">
        <img
          src={photo}
          alt={name}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
        />
      </div>
      <div className="p-6 text-center">
        <h3 className="font-display uppercase text-2xl text-voice-cream tracking-wide">
          {name}
        </h3>
        <p className="text-voice-gold text-xs uppercase tracking-[0.2em] mt-1">{role}</p>
        {bio && <p className="text-voice-cream/70 text-sm mt-4">{bio}</p>}
        <a
          href={`mailto:${email}`}
          className="inline-block mt-5 text-sm text-voice-cream/80 border-b border-voice-gold/50 hover:text-voice-gold hover:border-voice-gold transition-colors"
        >
          {email}
        </a>
      </div>
    </motion.div>
  )
}
