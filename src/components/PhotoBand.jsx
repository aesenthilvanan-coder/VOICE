// A fixed-height photo strip, used instead of a full-section background on
// any section whose height varies with its text content (paragraphs, grids,
// forms). A full-bleed cover photo behind a section that can grow arbitrarily
// tall (long copy, stacked cards on mobile) gets cropped down to an
// unrecognizable sliver by object-cover — this keeps the photo at a
// consistent, legible size regardless of how tall the content below it gets.
export default function PhotoBand({ src, alt = '', overlay = 'bg-voice-black/30', className = '' }) {
  return (
    <div className={`relative h-56 sm:h-72 md:h-96 ${className}`}>
      <img src={src} alt={alt} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
      <div className={`absolute inset-0 ${overlay}`} />
    </div>
  )
}
