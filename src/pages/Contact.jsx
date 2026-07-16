import { useState } from 'react'
import { motion } from 'framer-motion'
import FounderCard from '../components/FounderCard'

// Editable founder data
const FOUNDERS = [
  {
    name: 'Aaryan Senthilvanan',
    role: 'Co-Founder',
    email: 'aesenthilvanan@gmail.com',
    photo: '/images/founder-aaryan.jpg',
  },
  {
    name: 'Mason Bennett',
    role: 'Co-Founder',
    email: 'bennettmason60@gmail.com',
    photo: '/images/founder-mason.jpg',
  },
]

function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const to = 'aesenthilvanan@gmail.com'
    const subject = encodeURIComponent(`Message from ${name || 'the VOICE site'}`)
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`)
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-xl space-y-5">
      <div>
        <label className="block text-xs uppercase tracking-wide text-voice-cream/60 mb-2">
          Name
        </label>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-voice-ink border border-voice-cream/20 focus:border-voice-gold outline-none px-4 py-3 text-voice-cream"
        />
      </div>
      <div>
        <label className="block text-xs uppercase tracking-wide text-voice-cream/60 mb-2">
          Email
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-voice-ink border border-voice-cream/20 focus:border-voice-gold outline-none px-4 py-3 text-voice-cream"
        />
      </div>
      <div>
        <label className="block text-xs uppercase tracking-wide text-voice-cream/60 mb-2">
          Message
        </label>
        <textarea
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full bg-voice-ink border border-voice-cream/20 focus:border-voice-gold outline-none px-4 py-3 text-voice-cream resize-none"
        />
      </div>
      <button
        type="submit"
        className="w-full px-8 py-3 bg-voice-gold text-voice-black font-display uppercase tracking-wide text-sm hover:bg-voice-cream transition-colors"
      >
        Send
      </button>
    </form>
  )
}

export default function Contact() {
  return (
    <div>
      <section className="pt-40 pb-20 px-6 md:px-10 bg-voice-black">
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-display uppercase tracking-[0.3em] text-voice-gold text-xs"
          >
            Contact
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display uppercase text-4xl md:text-6xl text-voice-cream mt-4"
          >
            Talk to us directly.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-voice-cream/70 text-base md:text-lg"
          >
            Want to host or help set up a debate booth in your city, school, or venue?
            That's exactly what we're looking for right now — reach out below.
          </motion.p>
        </div>
      </section>

      <section className="bg-voice-black pb-20 md:pb-28 px-6 md:px-10">
        <div className="mx-auto max-w-4xl flex flex-col sm:flex-row gap-8">
          {FOUNDERS.map((f) => (
            <FounderCard key={f.email} {...f} />
          ))}
        </div>
      </section>

      <section className="bg-voice-green py-20 md:py-28 px-6 md:px-10 border-y border-voice-gold/20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display uppercase text-2xl md:text-4xl text-voice-cream text-center mb-10"
        >
          Or send a message directly
        </motion.h2>
        <ContactForm />
      </section>
    </div>
  )
}
