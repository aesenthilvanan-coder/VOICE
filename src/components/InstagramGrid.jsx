import { motion } from 'framer-motion'
import InstagramIcon from './InstagramIcon'

// Real posts from @voice_vegan — add new entries here as more content goes
// up (shortcode from the post URL, a downloaded thumbnail in public/images,
// and the caption). PLACEHOLDER_COUNT pads the grid until there's more.
const POSTS = [
  {
    shortcode: 'DbEAw7Vxm7m',
    image: '/images/ig-post-2.jpg',
    caption: 'Debunking the Top 10 "Anti-Vegan" Arguments',
  },
  {
    shortcode: 'DbECs-lszkC',
    image: '/images/ig-post-1.jpg',
    caption: '"So you don’t eat meat? Stay quiet."',
  },
]
const PLACEHOLDER_COUNT = 4

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function InstagramGrid() {
  return (
    <>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
      >
        {POSTS.map((post) => (
          <motion.a
            key={post.shortcode}
            href={`https://www.instagram.com/p/${post.shortcode}/`}
            target="_blank"
            rel="noreferrer"
            variants={item}
            whileHover={{ y: -4 }}
            className="group relative aspect-square overflow-hidden bg-voice-ink border border-voice-cream/10 hover:border-voice-gold/50 transition-colors"
          >
            <img
              src={post.image}
              alt={post.caption}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-voice-black/45 group-hover:bg-voice-black/20 transition-colors flex items-end p-3">
              <p className="text-voice-cream text-xs md:text-sm leading-snug">{post.caption}</p>
            </div>
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="absolute top-2.5 right-2.5 w-5 h-5 text-voice-cream/90 drop-shadow"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </motion.a>
        ))}

        {Array.from({ length: PLACEHOLDER_COUNT }).map((_, i) => (
          <motion.a
            key={`soon-${i}`}
            href="https://www.instagram.com/voice_vegan/"
            target="_blank"
            rel="noreferrer"
            variants={item}
            className="aspect-square bg-voice-ink border border-voice-cream/10 hover:border-voice-gold/50 transition-colors flex flex-col items-center justify-center gap-3 group cursor-pointer"
          >
            <InstagramIcon className="w-8 h-8 text-voice-cream/40 group-hover:text-voice-gold transition-colors" />
            <span className="text-voice-cream/40 text-xs uppercase tracking-wide">
              Post coming soon
            </span>
          </motion.a>
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
    </>
  )
}
