import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

// Edit nav links here
const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/what-we-do', label: 'What We Do' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-voice-black/95 border-b border-voice-gold/20' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 flex items-center justify-between h-20">
        <NavLink to="/" className="group flex items-center gap-3 z-50" onClick={() => setOpen(false)}>
          <motion.img
            src="/images/logo.png"
            alt="VOICE logo"
            whileHover={{ rotate: 12, scale: 1.08 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            className="h-10 w-10 rounded-full"
          />
          <span className="font-display text-xl tracking-wider text-voice-cream uppercase">
            Voice
          </span>
        </NavLink>

        <nav className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `group font-display uppercase tracking-wide text-sm relative py-2 transition-colors ${
                  isActive ? 'text-voice-gold' : 'text-voice-cream hover:text-voice-gold'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  <span
                    className={`absolute left-0 -bottom-0.5 h-px bg-voice-gold transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <button
          className="md:hidden z-50 flex flex-col gap-1.5 w-9 h-9 items-center justify-center"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <motion.span
            animate={{ rotate: open ? 45 : 0, y: open ? 6 : 0 }}
            className="block h-0.5 w-7 bg-voice-cream"
          />
          <motion.span
            animate={{ opacity: open ? 0 : 1 }}
            className="block h-0.5 w-7 bg-voice-cream"
          />
          <motion.span
            animate={{ rotate: open ? -45 : 0, y: open ? -6 : 0 }}
            className="block h-0.5 w-7 bg-voice-cream"
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 bg-voice-black z-40 flex flex-col items-center justify-center gap-10"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <NavLink
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `font-display uppercase tracking-wide text-3xl ${
                      isActive ? 'text-voice-gold' : 'text-voice-cream'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
