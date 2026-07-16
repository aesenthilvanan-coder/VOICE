import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useTransform, animate } from 'framer-motion'

// Reusable animated count-up stat. Feed it a numeric target + label + optional suffix/prefix.
export default function StatCounter({ value, label, suffix = '', prefix = '', duration = 1.8 }) {
  const wrapperRef = useRef(null)
  const numberRef = useRef(null)
  const inView = useInView(wrapperRef, { once: true, margin: '-100px' })
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString())

  useEffect(() => {
    if (!inView) return
    const controls = animate(count, value, { duration, ease: 'easeOut' })
    const unsubscribe = rounded.on('change', (latest) => {
      if (numberRef.current) numberRef.current.textContent = latest
    })
    return () => {
      controls.stop()
      unsubscribe()
    }
  }, [inView, value, count, duration, rounded])

  return (
    <div ref={wrapperRef} className="text-center">
      <div className="font-display text-5xl md:text-6xl text-voice-gold tabular-nums">
        {prefix}
        <span ref={numberRef}>0</span>
        {suffix}
      </div>
      <p className="mt-2 text-sm md:text-base uppercase tracking-wide text-voice-cream/70">
        {label}
      </p>
    </div>
  )
}
