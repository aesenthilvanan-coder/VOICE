import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

// Edit gallery captions here — image files live in /public/images/gallery-1.jpg ... gallery-15.jpg
// All photos are real documentary images, freely licensed via Wikimedia Commons.
// Captions include the attribution required by CC BY / CC BY-SA licenses.
// Ordered deliberately from systemic conditions toward the moment of slaughter.
const GALLERY_ITEMS = [
  {
    src: '/images/gallery-1.jpg',
    caption: 'Battery cage hens, Brazil — Secretaria de Agricultura SP, Wikimedia Commons, CC BY 2.0',
    tall: true,
  },
  {
    src: '/images/gallery-2.jpg',
    caption: 'Gestation crate housing — Humane Society of the United States, Wikimedia Commons, CC BY 3.0',
    tall: false,
  },
  {
    src: '/images/gallery-3.jpg',
    caption: 'Sow in a gestation crate showing stereotypic behavior — Wikimedia Commons, CC0',
    tall: false,
  },
  {
    src: '/images/gallery-4.jpg',
    caption: 'Pig in a slaughter transport truck — Wikimedia Commons, CC0',
    tall: true,
  },
  {
    src: '/images/gallery-5.jpg',
    caption: 'Battery hen, five days out of the cage — Ronald Duncan, Wikimedia Commons, CC BY 3.0',
    tall: false,
  },
  {
    src: '/images/gallery-6.jpg',
    caption: 'Confined animal feeding operation — U.S. EPA, public domain',
    tall: true,
  },
  {
    src: '/images/gallery-7.jpg',
    caption: 'Cattle feedlot, New Mexico — Wikimedia Commons, CC BY 4.0',
    tall: false,
  },
  {
    src: '/images/gallery-8.jpg',
    caption: 'Goat moments from slaughter — Wilfredor, Wikimedia Commons, CC0',
    tall: false,
  },
  {
    src: '/images/gallery-9.jpg',
    caption: 'Blood collected after slaughter — Wilfredor, Wikimedia Commons, CC0',
    tall: true,
  },
  {
    src: '/images/gallery-10.jpg',
    caption: 'Slaughter and blood separation, Nigeria — Chikeme Chizurum, Wikimedia Commons, CC BY-SA 4.0',
    tall: false,
  },
  {
    src: '/images/gallery-11.jpg',
    caption: 'Water buffalo moments after slaughter — Tom Maloney, Wikimedia Commons, CC BY-SA 2.0',
    tall: false,
  },
  {
    src: '/images/gallery-12.jpg',
    caption: 'Goat slaughtered for a family meal — Wilfredor, Wikimedia Commons, CC0',
    tall: true,
  },
  {
    src: '/images/gallery-13.jpg',
    caption: 'Religious slaughter by knife — Mostafameraji, Wikimedia Commons, CC BY-SA 4.0',
    tall: false,
  },
  {
    src: '/images/gallery-14.jpg',
    caption: 'Goat bound for slaughter — Wilfredor, Wikimedia Commons, CC0',
    tall: false,
  },
  {
    src: '/images/gallery-15.jpg',
    caption: 'Eid al-Adha animal sacrifice, Morocco — Fraser Cairns, Wikimedia Commons, CC BY 2.0',
    tall: true,
  },
]

const BATCH_SIZE = 6

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

export default function Gallery() {
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE)
  const sentinelRef = useRef(null)

  useEffect(() => {
    if (visibleCount >= GALLERY_ITEMS.length) return
    const el = sentinelRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((c) => Math.min(c + BATCH_SIZE, GALLERY_ITEMS.length))
        }
      },
      { rootMargin: '400px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [visibleCount])

  const visibleItems = GALLERY_ITEMS.slice(0, visibleCount)

  return (
    <section className="bg-voice-black py-20 md:py-28 px-6 md:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="font-display uppercase tracking-[0.3em] text-voice-gold text-xs">
            The Reality
          </span>
          <h2 className="font-display text-3xl md:text-5xl uppercase text-voice-cream mt-3 max-w-3xl">
            This is what your plate is hiding.
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[220px]"
        >
          {visibleItems.map((photo) => (
            <motion.figure
              key={photo.src}
              variants={item}
              className={`relative overflow-hidden group ${
                photo.tall ? 'row-span-2' : 'row-span-1'
              }`}
            >
              <img
                src={photo.src}
                alt={photo.caption}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-voice-black/20 group-hover:bg-voice-black/0 transition-colors duration-500" />
              <figcaption className="absolute bottom-0 left-0 right-0 p-3 text-xs text-voice-cream/80 bg-voice-black/60 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                {photo.caption}
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>

        {visibleCount < GALLERY_ITEMS.length && (
          <div ref={sentinelRef} className="flex justify-center pt-12">
            <span className="font-display uppercase tracking-[0.3em] text-voice-gold/60 text-xs animate-pulse">
              Keep scrolling
            </span>
          </div>
        )}
      </div>
    </section>
  )
}
