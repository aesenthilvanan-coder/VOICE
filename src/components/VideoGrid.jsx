import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import InstagramIcon from './InstagramIcon'

// Our 6 best clips from @voice_vegan — add/replace entries here as stronger
// content goes up (shortcode from the post URL, a downloaded poster frame in
// public/images, and the caption/hook).
const VIDEOS = [
  {
    shortcode: 'DbRrLkPxTlv',
    image: '/images/video-6.jpg',
    video: '/videos/video-6.mp4',
    caption: 'Fresh off the booth — the latest debate.',
  },
  {
    shortcode: 'DbNOskBu0vZ',
    image: '/images/video-5.jpg',
    video: '/videos/video-5.mp4',
    caption: '"Dear vegans..." — a farmer weighs in.',
  },
  {
    shortcode: 'DbMXeULx7b4',
    image: '/images/video-4.jpg',
    video: '/videos/video-4.mp4',
    caption: 'Beyond the Human — the philosophy behind the booth.',
  },
  {
    shortcode: 'DbGrmVUxvNm',
    image: '/images/video-3.jpg',
    video: '/videos/video-3.mp4',
    caption: '"You\'re killing cows!" — the clapback.',
  },
  {
    shortcode: 'DbECs-lszkC',
    image: '/images/video-2.jpg',
    video: '/videos/video-2.mp4',
    caption: '"So you don\'t eat meat? Stay quiet."',
  },
  {
    shortcode: 'DbEAw7Vxm7m',
    image: '/images/video-1.jpg',
    video: '/videos/video-1.mp4',
    caption: 'Debunking the Top 10 "Anti-Vegan" Arguments',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

function PlayIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

export default function VideoGrid() {
  const [activeIndex, setActiveIndex] = useState(null)
  const active = activeIndex === null ? null : VIDEOS[activeIndex]

  return (
    <>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
      >
        {VIDEOS.map((video, i) => (
          <motion.button
            key={video.shortcode}
            type="button"
            onClick={() => setActiveIndex(i)}
            variants={item}
            whileHover={{ y: -4 }}
            className="group relative aspect-[9/16] overflow-hidden bg-voice-ink border border-voice-cream/10 hover:border-voice-gold/50 transition-colors text-left"
          >
            <img
              src={video.image}
              alt={video.caption}
              loading="lazy"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-voice-black/45 group-hover:bg-voice-black/30 transition-colors flex flex-col items-center justify-center gap-2 p-3">
              <PlayIcon className="w-10 h-10 text-voice-cream/90 drop-shadow group-hover:text-voice-gold group-hover:scale-110 transition-all" />
            </div>
            <p className="absolute inset-x-0 bottom-0 p-3 text-voice-cream text-xs md:text-sm leading-snug bg-gradient-to-t from-voice-black/90 to-transparent">
              {video.caption}
            </p>
          </motion.button>
        ))}
      </motion.div>

      <div className="mt-10 text-center">
        <motion.a
          href="https://www.instagram.com/voice_vegan/"
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="inline-flex items-center gap-2 px-8 py-3 border border-voice-gold text-voice-gold font-display uppercase tracking-wide text-sm hover:bg-voice-gold hover:text-voice-black transition-colors"
        >
          <InstagramIcon className="w-4 h-4" />
          Follow @voice_vegan
        </motion.a>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-voice-black/90 px-4 py-10"
            onClick={() => setActiveIndex(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-[420px]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActiveIndex(null)}
                aria-label="Close"
                className="absolute -top-10 right-0 text-voice-cream/80 hover:text-voice-gold text-sm uppercase tracking-wide font-display"
              >
                Close ✕
              </button>
              <video
                key={active.shortcode}
                src={active.video}
                poster={active.image}
                controls
                autoPlay
                playsInline
                className="w-full rounded bg-voice-black"
                style={{ maxHeight: '80vh' }}
              />
              <a
                href={`https://www.instagram.com/reel/${active.shortcode}/`}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-2 text-voice-cream/60 hover:text-voice-gold text-xs uppercase tracking-wide"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
                View on Instagram
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
