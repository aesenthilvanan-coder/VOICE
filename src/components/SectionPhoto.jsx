// Full-bleed background photo + dark scrim, dropped at the top of a
// `relative overflow-hidden` section so every section carries a real image
// instead of a flat color panel. Decorative elements (GlowOrb, line art)
// render on top of this for texture.
export default function SectionPhoto({ src, alt = '', overlay = 'bg-voice-black/70' }) {
  return (
    <>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className={`absolute inset-0 ${overlay}`} />
    </>
  )
}
