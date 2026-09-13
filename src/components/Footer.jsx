import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import InstagramIcon from './InstagramIcon'

// Editable org info
const ORG_NAME = 'VOICE'
const ORG_FULL_NAME = 'Vegans Organizing for Informed Conversation & Ethics'
const TAGLINE = 'Reason in defense of the voiceless.'
const INSTAGRAM_URL = 'https://www.instagram.com/vegan_debate/'
const ORG_EMAIL = 'voices4vegans@gmail.com'
const FOUNDER_EMAILS = [
  { name: 'Aaryan Senthilvanan', email: 'aesenthilvanan@gmail.com' },
  { name: 'Mason Bennett', email: 'bennettmason60@gmail.com' },
]
const PARTNERS = [
  { name: 'peta2', url: 'https://www.peta2.com/' },
  { name: 'ASAP (Allied Scholars for Animal Protection)', url: 'https://www.alliedscholars.org/' },
]

export default function Footer() {
  return (
    <footer className="bg-voice-black border-t border-voice-gold/20 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-6 md:px-10 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src="/images/logo.png" alt="VOICE logo" className="h-9 w-9 rounded-full" />
            <span className="font-display text-lg uppercase tracking-wider text-voice-cream">
              {ORG_NAME}
            </span>
          </div>
          <p className="text-voice-cream/60 text-sm max-w-xs leading-relaxed">{ORG_FULL_NAME}</p>
          <p className="text-voice-gold/80 text-sm italic mt-2">{TAGLINE}</p>
          <motion.a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            whileHover={{ x: 4 }}
            className="inline-flex items-center gap-2 mt-5 text-voice-cream/70 hover:text-voice-gold text-sm transition-colors"
          >
            <InstagramIcon className="w-4 h-4" />
            @vegan_debate
          </motion.a>
        </div>

        <div>
          <h3 className="font-display uppercase tracking-wide text-voice-gold text-sm mb-4">
            Site
          </h3>
          <ul className="space-y-2">
            {[
              ['/', 'Home'],
              ['/what-we-do', 'What We Do'],
              ['/about', 'About'],
              ['/contact', 'Contact'],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="text-voice-cream/70 hover:text-voice-gold text-sm">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display uppercase tracking-wide text-voice-gold text-sm mb-4">
            Contact
          </h3>
          <ul className="space-y-2">
            <li>
              <a
                href={`mailto:${ORG_EMAIL}`}
                className="text-voice-cream/70 hover:text-voice-gold text-sm"
              >
                {ORG_EMAIL}
              </a>
            </li>
            {FOUNDER_EMAILS.map((f) => (
              <li key={f.email}>
                <a
                  href={`mailto:${f.email}`}
                  className="text-voice-cream/70 hover:text-voice-gold text-sm"
                >
                  {f.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 md:px-10 mt-10 flex flex-wrap items-center gap-x-2 gap-y-1 text-voice-cream/40 text-xs tracking-wide">
        <span>In partnership with</span>
        {PARTNERS.map((p, i) => (
          <span key={p.url}>
            <a href={p.url} target="_blank" rel="noreferrer" className="hover:text-voice-gold">
              {p.name}
            </a>
            {i < PARTNERS.length - 1 && <span className="mx-1">&middot;</span>}
          </span>
        ))}
      </div>

      <div className="gold-rule my-8 max-w-7xl mx-auto" />

      <p className="text-center text-voice-cream/40 text-xs tracking-wide">
        &copy; {new Date().getFullYear()} {ORG_NAME}. All rights reserved.
      </p>
    </footer>
  )
}
