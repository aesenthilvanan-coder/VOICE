import { useState } from 'react'
import { motion } from 'framer-motion'

function PlayIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

// Click-to-play YouTube facade — starts as a static poster so we don't load
// the YouTube player until someone actually wants to watch, then swaps in a
// real embedded, playable iframe in place.
export default function EmbeddedVideo({ youtubeId, title, poster, className = '' }) {
  const [playing, setPlaying] = useState(false)

  if (playing) {
    return (
      <div className={`relative w-full aspect-video bg-black ${className}`}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1`}
          title={title}
          allow="accelerate-vertical; autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className={`group relative block w-full aspect-video overflow-hidden bg-voice-ink ${className}`}
    >
      <img
        src={poster || `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`}
        alt={title}
        loading="lazy"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-voice-black/40 group-hover:bg-voice-black/25 transition-colors flex items-center justify-center">
        <motion.span
          whileHover={{ scale: 1.1 }}
          className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-voice-gold/90 text-voice-black"
        >
          <PlayIcon className="w-7 h-7 md:w-8 md:h-8 ml-1" />
        </motion.span>
      </div>
    </button>
  )
}
