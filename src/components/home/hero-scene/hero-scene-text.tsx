'use client'
import { forwardRef, useCallback, useEffect, useMemo, useRef } from 'react'
import {
  motion,
  motionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react'

const WEIGHT_MIN = 300
const WEIGHT_MAX = 900
const SPRING = { stiffness: 200, damping: 25, mass: 1 }
const LINES = ['Software', 'Developer'] as const

interface AnimatedCharProps {
  char: string
  target: MotionValue<number>
}

const AnimatedChar = forwardRef<HTMLSpanElement, AnimatedCharProps>(
  ({ char, target }, ref) => {
    const weight = useSpring(target, SPRING)
    const fontVariationSettings = useTransform(
      weight,
      (v) => `'wght' ${Math.round(v)}`,
    )
    return (
      <motion.span
        ref={ref}
        style={{ display: 'inline-block', fontVariationSettings }}
      >
        {char}
      </motion.span>
    )
  },
)
AnimatedChar.displayName = 'AnimatedChar'

function HeroSceneText() {
  const charRefs = useRef<(HTMLSpanElement | null)[][]>(
    LINES.map((l) => Array.from({ length: l.length }, () => null)),
  )
  const charCenters = useRef<[number, number][][]>(
    LINES.map((l) =>
      Array.from({ length: l.length }, (): [number, number] => [0, 0]),
    ),
  )
  const targets = useMemo(
    () =>
      LINES.map((l) =>
        Array.from({ length: l.length }, () => motionValue(WEIGHT_MIN)),
      ),
    [],
  )

  const updateCenters = useCallback(() => {
    LINES.forEach((_, li) => {
      charRefs.current[li].forEach((span, ci) => {
        if (!span) return
        const r = span.getBoundingClientRect()
        charCenters.current[li][ci] = [
          r.left + r.width / 2,
          r.top + r.height / 2,
        ]
      })
    })
  }, [])

  useEffect(() => {
    updateCenters()
    void document.fonts.ready.then(updateCenters)
    window.addEventListener('resize', updateCenters)
    return () => window.removeEventListener('resize', updateCenters)
  }, [updateCenters])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const radius = window.innerWidth * 0.2
      LINES.forEach((line, li) => {
        ;[...line].forEach((_, ci) => {
          const [cx, cy] = charCenters.current[li][ci]
          const dist = Math.hypot(e.clientX - cx, e.clientY - cy)
          const t = Math.max(0, 1 - dist / radius)
          targets[li][ci].set(WEIGHT_MIN + (WEIGHT_MAX - WEIGHT_MIN) * t * t)
        })
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [targets])

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-figtree)',
        fontWeight: WEIGHT_MIN,
        fontSize: '18vw',
        lineHeight: 1,
        color: 'rgba(255,255,255,0.25)',
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      {LINES.map((line, li) => (
        <div key={li}>
          {[...line].map((char, ci) => (
            <AnimatedChar
              key={ci}
              char={char}
              target={targets[li][ci]}
              ref={(el) => {
                charRefs.current[li][ci] = el
              }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export { HeroSceneText }
