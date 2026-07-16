import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

// Edit gallery captions here — image files live in /public/images/gallery-1.jpg ... gallery-100.jpg
// All photos are real documentary images, freely licensed via Wikimedia Commons.
// Captions include the attribution required by CC BY / CC BY-SA licenses.
// Ordered deliberately from systemic conditions toward the moment of slaughter.
const GALLERY_ITEMS = [
  { src: '/images/gallery-1.jpg', caption: 'Battery cage hens, Brazil — Secretaria de Agricultura SP, Wikimedia Commons, CC BY 2.0', tall: true },
  { src: '/images/gallery-2.jpg', caption: 'Gestation crate housing — Humane Society of the United States, Wikimedia Commons, CC BY 3.0', tall: false },
  { src: '/images/gallery-3.jpg', caption: 'Sow in a gestation crate showing stereotypic behavior — Wikimedia Commons, CC0', tall: false },
  { src: '/images/gallery-4.jpg', caption: 'Pig in a slaughter transport truck — Wikimedia Commons, CC0', tall: true },
  { src: '/images/gallery-5.jpg', caption: 'Battery hen, five days out of the cage — Ronald Duncan, Wikimedia Commons, CC BY 3.0', tall: false },
  { src: '/images/gallery-6.jpg', caption: 'Confined animal feeding operation — U.S. EPA, public domain', tall: true },
  { src: '/images/gallery-7.jpg', caption: 'Cattle feedlot, New Mexico — Wikimedia Commons, CC BY 4.0', tall: false },
  { src: '/images/gallery-8.jpg', caption: 'Goat moments from slaughter — Wilfredor, Wikimedia Commons, CC0', tall: false },
  { src: '/images/gallery-9.jpg', caption: 'Blood collected after slaughter — Wilfredor, Wikimedia Commons, CC0', tall: true },
  { src: '/images/gallery-10.jpg', caption: 'Slaughter and blood separation, Nigeria — Chikeme Chizurum, Wikimedia Commons, CC BY-SA 4.0', tall: false },
  { src: '/images/gallery-11.jpg', caption: 'Water buffalo moments after slaughter — Tom Maloney, Wikimedia Commons, CC BY-SA 2.0', tall: false },
  { src: '/images/gallery-12.jpg', caption: 'Goat slaughtered for a family meal — Wilfredor, Wikimedia Commons, CC0', tall: true },
  { src: '/images/gallery-13.jpg', caption: 'Religious slaughter by knife — Mostafameraji, Wikimedia Commons, CC BY-SA 4.0', tall: false },
  { src: '/images/gallery-14.jpg', caption: 'Goat bound for slaughter — Wilfredor, Wikimedia Commons, CC0', tall: false },
  { src: '/images/gallery-15.jpg', caption: 'Eid al-Adha animal sacrifice, Morocco — Fraser Cairns, Wikimedia Commons, CC BY 2.0', tall: true },
  { src: '/images/gallery-16.jpg', caption: '1.2 GestationFace2 — Mercy For Animals MFA from Los Angeles, USA, Wikimedia Commons, CC BY 2.0', tall: false },
  { src: '/images/gallery-17.jpg', caption: '1.3 GestationWideView — Mercy For Animals MFA from Los Angeles, USA, Wikimedia Commons, CC BY 2.0', tall: false },
  { src: '/images/gallery-18.jpg', caption: '1.5 GestationBarBiting — Mercy For Animals MFA from Los Angeles, USA, Wikimedia Commons, CC BY 2.0', tall: true },
  { src: '/images/gallery-19.jpg', caption: '1HSC-bitingcage — IowaPolitics.com, Wikimedia Commons, CC BY-SA 2.0', tall: false },
  { src: '/images/gallery-20.jpg', caption: '2HSC-gestation1 — IowaPolitics.com, Wikimedia Commons, CC BY-SA 2.0', tall: false },
  { src: '/images/gallery-21.jpg', caption: '3HSC-gestation2 — IowaPolitics.com, Wikimedia Commons, CC BY-SA 2.0', tall: false },
  { src: '/images/gallery-22.jpg', caption: '4HSC-gestation4 — IowaPolitics.com, Wikimedia Commons, CC BY-SA 2.0', tall: false },
  { src: '/images/gallery-23.jpg', caption: '5HSC-gestation3 — IowaPolitics.com, Wikimedia Commons, CC BY-SA 2.0', tall: false },
  { src: '/images/gallery-24.jpg', caption: 'Animal Abuse Battery Cage 02 — MyName (Ethelred), Wikimedia Commons, Public domain', tall: false },
  { src: '/images/gallery-25.jpg', caption: 'Battery-farm — Maqi, Wikimedia Commons, CC BY-SA 3.0', tall: false },
  { src: '/images/gallery-26.jpg', caption: 'Battery-farm2 — Maqi, Wikimedia Commons, CC BY-SA 3.0', tall: false },
  { src: '/images/gallery-27.jpg', caption: 'Batterycage — 春桜咲く, Wikimedia Commons, CC BY-SA 4.0', tall: false },
  { src: '/images/gallery-28.jpg', caption: 'BustanHagalilBattery — Wikimedia Commons, CC BY-SA 3.0', tall: false },
  { src: '/images/gallery-29.jpg', caption: 'Broiler chicks — Joe Valbuena, Wikimedia Commons, Public domain', tall: true },
  { src: '/images/gallery-30.jpg', caption: 'Factory-farming — Cec-clp, Wikimedia Commons, CC0', tall: false },
  { src: '/images/gallery-31.jpg', caption: 'Factory farmed chickens in Finland — Oikeutta eläimille, Wikimedia Commons, CC BY 2.0', tall: false },
  { src: '/images/gallery-32.jpg', caption: 'Farm poultry unit - NARA — Wikimedia Commons, Public domain', tall: false },
  { src: '/images/gallery-33.jpg', caption: 'Belagro-2019 (poultry) 001 — Homoatrox, Wikimedia Commons, CC BY-SA 3.0', tall: false },
  { src: '/images/gallery-34.jpg', caption: 'Belagro-2019 (poultry) 002 — Homoatrox, Wikimedia Commons, CC BY-SA 3.0', tall: false },
  { src: '/images/gallery-35.jpg', caption: 'Belagro-2019 (poultry) 003 — Homoatrox, Wikimedia Commons, CC BY-SA 3.0', tall: false },
  { src: '/images/gallery-36.jpg', caption: 'Belagro-2019 (poultry) 004 — Homoatrox, Wikimedia Commons, CC BY-SA 3.0', tall: false },
  { src: '/images/gallery-37.jpg', caption: 'Big Chicken @ Bello Poultry Market; Holtsville, New York — DanTD, Wikimedia Commons, CC BY-SA 4.0', tall: false },
  { src: '/images/gallery-38.jpg', caption: 'Bolikhamxay Phabatkumban Chickenfarm 640x480 — LEAPTOUY, Wikimedia Commons, Public domain', tall: false },
  { src: '/images/gallery-39.jpg', caption: 'Egg Farming, United Kingdom — ShoebridgeCA, Wikimedia Commons, CC BY-SA 4.0', tall: false },
  { src: '/images/gallery-40.jpg', caption: 'Caubles Egg Factory, radio suspended from ceiling is for quieting… — Tennessee Valley Authority, Wikimedia Commons, Public domain', tall: false },
  { src: '/images/gallery-41.jpg', caption: 'Chicken coopbattery cages in the 1950s — Cushing Memorial Library and Archives, Texas A&M, Wikimedia Commons, CC BY 2.0', tall: false },
  { src: '/images/gallery-42.jpg', caption: 'Feedlot-1 — H20, Wikimedia Commons, CC BY-SA 3.0', tall: false },
  { src: '/images/gallery-43.jpg', caption: 'Feedlot Argentina — Nicolas1231, Wikimedia Commons, CC BY 4.0', tall: true },
  { src: '/images/gallery-44.jpg', caption: 'Cattle Feedlot near Rocky Ford, CO IMG 5651-2 — Wikimedia Commons, CC BY-SA 3.0', tall: false },
  { src: '/images/gallery-45.jpg', caption: 'Cattle Feedlot near Rocky Ford, CO IMG 5651 — Billy Hathorn, Wikimedia Commons, CC BY-SA 3.0', tall: false },
  { src: '/images/gallery-46.jpg', caption: 'DBAZBenedicts AZ feedlot blackbirds3 — (USDA), Wikimedia Commons, Public domain', tall: false },
  { src: '/images/gallery-47.jpg', caption: 'DBAZ feedlot blackbirds 3 — (USDA), Wikimedia Commons, Public domain', tall: false },
  { src: '/images/gallery-48.jpg', caption: 'Canard-cage — L214 - Ethique & Animaux, Wikimedia Commons, CC BY 3.0', tall: false },
  { src: '/images/gallery-49.jpg', caption: 'Cages individuelles (épinettes), utilisées pour le gavage industriel… — Ethique & Animaux L214, Wikimedia Commons, CC BY 3.0', tall: false },
  { src: '/images/gallery-50.jpg', caption: 'Collective cage used in the foie gras industry — L214 éthique et animaux, Wikimedia Commons, CC BY 3.0', tall: false },
  { src: '/images/gallery-51.jpg', caption: 'Animal Cruelty Iowa Select Farms IS 2011-05-13 48 — Mercy For Animals MFA from Los Angeles, USA, Wikimedia Commons, CC BY 2.0', tall: true },
  { src: '/images/gallery-52.jpg', caption: 'Animal Cruelty Iowa Select Farms IS 2011-05-16 12 — Mercy For Animals MFA from Los Angeles, USA, Wikimedia Commons, CC BY 2.0', tall: false },
  { src: '/images/gallery-53.jpg', caption: 'Animal Cruelty Iowa Select Farms IS 2011-05-17 19 — Mercy For Animals MFA from Los Angeles, USA, Wikimedia Commons, CC BY 2.0', tall: true },
  { src: '/images/gallery-54.jpg', caption: 'Animal Cruelty Iowa Select Farms IS 2011-05-17 23 — Mercy For Animals MFA from Los Angeles, USA, Wikimedia Commons, CC BY 2.0', tall: true },
  { src: '/images/gallery-55.jpg', caption: 'Animal Cruelty Iowa Select Farms IS 2011-05-17 27 — Mercy For Animals MFA from Los Angeles, USA, Wikimedia Commons, CC BY 2.0', tall: false },
  { src: '/images/gallery-56.jpg', caption: 'Animal Cruelty Iowa Select Farms IS 2011-05-18 16 — Mercy For Animals MFA from Los Angeles, USA, Wikimedia Commons, CC BY 2.0', tall: true },
  { src: '/images/gallery-57.jpg', caption: 'Animal Cruelty Iowa Select Farms IS 2011-05-19 04 — Mercy For Animals MFA from Los Angeles, USA, Wikimedia Commons, CC BY 2.0', tall: false },
  { src: '/images/gallery-58.jpg', caption: 'Animal Cruelty Iowa Select Farms IS 2011-05-23 08 — Mercy For Animals MFA from Los Angeles, USA, Wikimedia Commons, CC BY 2.0', tall: true },
  { src: '/images/gallery-59.jpg', caption: 'Animal Cruelty Iowa Select Farms IS 2011-05-27 03 — Mercy For Animals MFA from Los Angeles, USA, Wikimedia Commons, CC BY 2.0', tall: true },
  { src: '/images/gallery-60.jpg', caption: 'Animal Cruelty Iowa Select Farms IS 2011-05-28 20 — Mercy For Animals MFA from Los Angeles, USA, Wikimedia Commons, CC BY 2.0', tall: false },
  { src: '/images/gallery-61.jpg', caption: 'Animal Cruelty Iowa Select Farms IS 2011-05-28 24 — Mercy For Animals MFA from Los Angeles, USA, Wikimedia Commons, CC BY 2.0', tall: true },
  { src: '/images/gallery-62.jpg', caption: 'Animal Cruelty Iowa Select Farms IS 2011-05-28 25 — Mercy For Animals MFA from Los Angeles, USA, Wikimedia Commons, CC BY 2.0', tall: false },
  { src: '/images/gallery-63.jpg', caption: 'Animal Cruelty Iowa Select Farms IS 2011-05-28 33 — Mercy For Animals MFA from Los Angeles, USA, Wikimedia Commons, CC BY 2.0', tall: false },
  { src: '/images/gallery-64.jpg', caption: 'Animal Cruelty Iowa Select Farms IS 2011-05-30 06 — Mercy For Animals MFA from Los Angeles, USA, Wikimedia Commons, CC BY 2.0', tall: true },
  { src: '/images/gallery-65.jpg', caption: 'Animal Cruelty Iowa Select Farms IS 2011-05-30 14 — Mercy For Animals MFA from Los Angeles, USA, Wikimedia Commons, CC BY 2.0', tall: true },
  { src: '/images/gallery-66.jpg', caption: 'Animal Cruelty Iowa Select Farms IS 2011-05-30 18 — Mercy For Animals MFA from Los Angeles, USA, Wikimedia Commons, CC BY 2.0', tall: true },
  { src: '/images/gallery-67.jpg', caption: 'Animal Cruelty Iowa Select Farms IS 2011-05-31 02 — Mercy For Animals MFA from Los Angeles, USA, Wikimedia Commons, CC BY 2.0', tall: false },
  { src: '/images/gallery-68.jpg', caption: 'Animal Cruelty Iowa Select Farms IS 2011-05-31 07 — Mercy For Animals MFA from Los Angeles, USA, Wikimedia Commons, CC BY 2.0', tall: false },
  { src: '/images/gallery-69.jpg', caption: 'Animal Cruelty Iowa Select Farms IS 2011-05-31 08 — Mercy For Animals MFA from Los Angeles, USA, Wikimedia Commons, CC BY 2.0', tall: false },
  { src: '/images/gallery-70.jpg', caption: 'Animal Cruelty Iowa Select Farms IS 2011-06-02 04 — Mercy For Animals MFA from Los Angeles, USA, Wikimedia Commons, CC BY 2.0', tall: false },
  { src: '/images/gallery-71.jpg', caption: 'Animal Cruelty Iowa Select Farms IS 2011-06-02 06 — Mercy For Animals MFA from Los Angeles, USA, Wikimedia Commons, CC BY 2.0', tall: false },
  { src: '/images/gallery-72.jpg', caption: 'Animal Cruelty Iowa Select Farms IS 2011-06-02 10 — Mercy For Animals MFA from Los Angeles, USA, Wikimedia Commons, CC BY 2.0', tall: false },
  { src: '/images/gallery-73.jpg', caption: 'Animal Cruelty Iowa Select Farms IS 2011-06-02 12 — Mercy For Animals MFA from Los Angeles, USA, Wikimedia Commons, CC BY 2.0', tall: false },
  { src: '/images/gallery-74.jpg', caption: 'Animal Cruelty Iowa Select Farms IS 2011-06-02 13 — Mercy For Animals MFA from Los Angeles, USA, Wikimedia Commons, CC BY 2.0', tall: true },
  { src: '/images/gallery-75.jpg', caption: 'Animal Cruelty Iowa Select Farms IS 2011-06-02 17 — Mercy For Animals MFA from Los Angeles, USA, Wikimedia Commons, CC BY 2.0', tall: false },
  { src: '/images/gallery-76.jpg', caption: 'Animal Cruelty Iowa Select Farms IS 2011-06-02 20 — Mercy For Animals MFA from Los Angeles, USA, Wikimedia Commons, CC BY 2.0', tall: false },
  { src: '/images/gallery-77.jpg', caption: 'Animal Cruelty Iowa Select Farms IS 2011-06-10 05 — Mercy For Animals MFA from Los Angeles, USA, Wikimedia Commons, CC BY 2.0', tall: false },
  { src: '/images/gallery-78.jpg', caption: 'Animal Cruelty Iowa Select Farms IS 2011-06-13 07 — Mercy For Animals MFA from Los Angeles, USA, Wikimedia Commons, CC BY 2.0', tall: true },
  { src: '/images/gallery-79.jpg', caption: 'Canard-aile-lisier-cage-defoncee — L214 - Ethique & Animaux, Wikimedia Commons, CC BY 3.0', tall: false },
  { src: '/images/gallery-80.jpg', caption: 'Canard-barbarie-cage — L214 - Ethique & Animaux, Wikimedia Commons, CC BY 3.0', tall: false },
  { src: '/images/gallery-81.jpg', caption: 'Canard-cages-ecroulees — L214 - Ethique & Animaux, Wikimedia Commons, CC BY 3.0', tall: false },
  { src: '/images/gallery-82.jpg', caption: 'Canard-coince-cage — L214 - Ethique & Animaux, Wikimedia Commons, CC BY 3.0', tall: false },
  { src: '/images/gallery-83.jpg', caption: 'Canards-sous-cage-lisier — L214 - Ethique & Animaux, Wikimedia Commons, CC BY 3.0', tall: false },
  { src: '/images/gallery-84.jpg', caption: 'Deux-canards-excrement-sous-cage — L214 - Ethique & Animaux, Wikimedia Commons, CC BY 3.0', tall: false },
  { src: '/images/gallery-85.jpg', caption: 'Elevage-cages-delabre-canard — L214 - Ethique & Animaux, Wikimedia Commons, CC BY 3.0', tall: false },
  { src: '/images/gallery-86.jpg', caption: 'Elevage-canards-sous-cage-vetuste — L214 - Ethique & Animaux, Wikimedia Commons, CC BY 3.0', tall: false },
  { src: '/images/gallery-87.jpg', caption: 'Cattle truck in Dnipro — Alex Blokha, Wikimedia Commons, CC BY-SA 4.0', tall: true },
  { src: '/images/gallery-88.jpg', caption: 'Chicken truck close-up — Syriloth Dragonspirit, Wikimedia Commons, CC BY 2.0', tall: true },
  { src: '/images/gallery-89.jpg', caption: 'Delivering the sheep to Pasture - geograph.org.uk — Nigel Mykura, Wikimedia Commons, CC BY-SA 2.0', tall: false },
  { src: '/images/gallery-90.jpg', caption: 'ConfinementHR — Mercy For Animals MFA from Los Angeles, USA, Wikimedia Commons, CC BY 2.0', tall: false },
  { src: '/images/gallery-91.jpg', caption: 'Goat hide draped over fence structure following ritual slaughter for… — LondekaT, Wikimedia Commons, CC BY-SA 4.0', tall: false },
  { src: '/images/gallery-92.jpg', caption: 'Deadcalf — Farm Transparency Project, Wikimedia Commons, CC BY 4.0', tall: false },
  { src: '/images/gallery-93.jpg', caption: 'Canard-momie-cage — L214 - Ethique & Animaux, Wikimedia Commons, CC BY 3.0', tall: false },
  { src: '/images/gallery-94.jpg', caption: 'Canard-mort-cage-ecroulee — L214 - Ethique & Animaux, Wikimedia Commons, CC BY 3.0', tall: false },
  { src: '/images/gallery-95.jpg', caption: 'Canard-mort-vivant-cage — L214 - Ethique & Animaux, Wikimedia Commons, CC BY 3.0', tall: false },
  { src: '/images/gallery-96.jpg', caption: 'Canard-vivant-mort-cage-souffrance — L214 - Ethique & Animaux, Wikimedia Commons, CC BY 3.0', tall: false },
  { src: '/images/gallery-97.jpg', caption: 'Canard-mort-vivant-cage-defoncee — L214 - Ethique & Animaux, Wikimedia Commons, CC BY 3.0', tall: false },
  { src: '/images/gallery-98.jpg', caption: 'Canard-mort-cage-defoncee — L214 - Ethique & Animaux, Wikimedia Commons, CC BY 3.0', tall: false },
  { src: '/images/gallery-99.jpg', caption: 'Canard-mort-cadavre-cage-oeil-creve — L214 - Ethique & Animaux, Wikimedia Commons, CC BY 3.0', tall: false },
  { src: '/images/gallery-100.jpg', caption: 'Canards-morts-canards-vivants-cage — L214 - Ethique & Animaux, Wikimedia Commons, CC BY 3.0', tall: false },
]

const BATCH_SIZE = 9

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
