import { motion } from 'framer-motion'

// Simple animated line-drawing of the debate booth setup: a table, a sign,
// and two speech bubbles representing the conversation. Draws in on scroll.
const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (delay = 0) => ({
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { duration: 1.4, ease: 'easeInOut', delay }, opacity: { duration: 0.3, delay } },
  }),
}

export default function BoothSVG() {
  return (
    <motion.svg
      viewBox="0 0 400 280"
      className="w-full max-w-xl mx-auto"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-100px' }}
    >
      {/* Sign board on stand */}
      <motion.rect
        x="130"
        y="20"
        width="140"
        height="70"
        rx="4"
        fill="none"
        stroke="#c9a961"
        strokeWidth="2.5"
        variants={draw}
        custom={0}
      />
      <motion.text
        x="200"
        y="60"
        textAnchor="middle"
        fill="#c9a961"
        fontSize="11"
        fontFamily="Oswald, sans-serif"
        letterSpacing="1"
        variants={draw}
        custom={0.4}
      >
        CHANGE MY MIND
      </motion.text>
      <motion.line
        x1="200"
        y1="90"
        x2="200"
        y2="120"
        stroke="#c9a961"
        strokeWidth="2.5"
        variants={draw}
        custom={0.2}
      />

      {/* Table */}
      <motion.line
        x1="60"
        y1="120"
        x2="340"
        y2="120"
        stroke="#f2efe9"
        strokeWidth="2.5"
        variants={draw}
        custom={0.3}
      />
      <motion.line
        x1="80"
        y1="120"
        x2="80"
        y2="180"
        stroke="#f2efe9"
        strokeWidth="2.5"
        variants={draw}
        custom={0.5}
      />
      <motion.line
        x1="320"
        y1="120"
        x2="320"
        y2="180"
        stroke="#f2efe9"
        strokeWidth="2.5"
        variants={draw}
        custom={0.5}
      />

      {/* Two figures, positioned below the table line with clear headroom for bubbles */}
      <motion.circle cx="140" cy="225" r="15" fill="none" stroke="#f2efe9" strokeWidth="2.5" variants={draw} custom={0.6} />
      <motion.line x1="140" y1="240" x2="140" y2="270" stroke="#f2efe9" strokeWidth="2.5" variants={draw} custom={0.7} />
      <motion.circle cx="260" cy="225" r="15" fill="none" stroke="#f2efe9" strokeWidth="2.5" variants={draw} custom={0.6} />
      <motion.line x1="260" y1="240" x2="260" y2="270" stroke="#f2efe9" strokeWidth="2.5" variants={draw} custom={0.7} />

      {/* Speech bubbles = the conversation, tails point down at each head with a clean gap */}
      <motion.path
        d="M100 150 h80 v30 h-30 l-10 18 l-10 -18 h-30 z"
        fill="none"
        stroke="#c9a961"
        strokeWidth="2"
        variants={draw}
        custom={0.9}
      />
      <motion.path
        d="M220 150 h80 v30 h-30 l-10 18 l-10 -18 h-30 z"
        fill="none"
        stroke="#c9a961"
        strokeWidth="2"
        variants={draw}
        custom={1.1}
      />
    </motion.svg>
  )
}
