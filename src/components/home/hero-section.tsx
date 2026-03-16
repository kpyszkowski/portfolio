'use client'
import { useState, useEffect, useMemo, useRef } from 'react'
import {
  motion,
  AnimatePresence,
  useSpring,
  useTransform,
  motionValue,
  type MotionValue,
} from 'motion/react'
import { createStyles, type StylesProps } from '~/utils/create-styles'
import { HeroScene } from '~/components/home/hero-scene/hero-scene'

const SUBTITLE_WORDS = ['Fullstack', 'Creative'] as const
const CYCLE_INTERVAL = 4_000
const SPRING = { stiffness: 200, damping: 25, mass: 1 }
const WEIGHT_MIN = 600
const WEIGHT_MAX = 1000
const MOUSE_RADIUS = 0.16
const NAME = 'Kamil Pyszkowski'

interface NameCharSlotProps {
  char: string
  target: MotionValue<number>
  onMount: (el: HTMLElement | null) => void
}

function NameCharSlot(props: NameCharSlotProps) {
  const { char, target, onMount } = props
  const spring = useSpring(target, SPRING)
  const fvs = useTransform(spring, (w) => `'wght' ${Math.round(w)}`)

  return (
    <motion.span
      ref={onMount}
      style={{
        display: 'inline-block',
        fontVariationSettings: fvs,
      }}
    >
      {char === ' ' ? '\u00A0' : char}
    </motion.span>
  )
}

const heroSectionStyles = createStyles({
  slots: {
    container: 'relative flex h-svh flex-col items-center',
    scene: 'absolute inset-0 z-10',
    content:
      'pointer-events-none absolute inset-x-0 bottom-0 z-20 grid grid-cols-2 items-end gap-8 px-12 pb-12',
    headingArea: 'flex flex-col gap-4',
    subtitle: 'overflow-hidden',
    subtitleText:
      'block font-sans text-sm/none tracking-widest text-highlight uppercase select-none',
    heading:
      'flex flex-col font-display text-[7vw]/none tracking-normal text-transparent select-none [-webkit-text-stroke:1.5px_var(--color-accent)]',
    paragraph: 'font-sans text-2xl/snug text-elevated',
  },
})

interface HeroSectionProps extends StylesProps<typeof heroSectionStyles> {
  className?: string
}

function HeroSection(props: HeroSectionProps) {
  const { className, ...restProps } = props
  const styles = heroSectionStyles()

  const [wordIndex, setWordIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(
      () => setWordIndex((i) => (i + 1) % SUBTITLE_WORDS.length),
      CYCLE_INTERVAL,
    )
    return () => clearInterval(id)
  }, [])

  const nameTargets = useMemo(
    () => Array.from({ length: NAME.length }, () => motionValue(WEIGHT_MIN)),
    [],
  )

  const charRefs = useRef<(HTMLElement | null)[]>(Array(NAME.length).fill(null))

  const applyWeights = useRef((x: number, y: number) => {
    const radius = window.innerWidth * MOUSE_RADIUS
    ;[...NAME].forEach((_, ci) => {
      const el = charRefs.current[ci]
      if (!el) return
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dist = Math.hypot(x - cx, y - cy)
      const t = Math.max(0, 1 - dist / radius)
      nameTargets[ci].set(WEIGHT_MIN + (WEIGHT_MAX - WEIGHT_MIN) * t * t)
    })
  })

  useEffect(() => {
    const onMove = (e: MouseEvent) => applyWeights.current(e.clientX, e.clientY)
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <section
      id="hero"
      className={styles.container({ className })}
      {...restProps}
    >
      <HeroScene className={styles.scene()} />
      <div className={styles.content()}>
        <div className={styles.headingArea()}>
          <div className={styles.subtitle()}>
            <AnimatePresence
              mode="wait"
              initial={false}
            >
              <motion.span
                key={wordIndex}
                className={styles.subtitleText()}
                initial={{ y: '110%' }}
                animate={{
                  y: '0%',
                  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                }}
                exit={{
                  y: '-110%',
                  transition: { duration: 0.3, ease: [0.4, 0, 1, 1] },
                }}
              >
                {SUBTITLE_WORDS[wordIndex]} Developer
              </motion.span>
            </AnimatePresence>
          </div>
          <h1 className={styles.heading()}>
            {NAME.split(' ').map((word, wi) => {
              const start = wi === 0 ? 0 : NAME.indexOf(' ') + 1
              return (
                <span
                  key={wi}
                  className="flex"
                >
                  {[...word].map((char, ci) => {
                    const gi = start + ci
                    return (
                      <NameCharSlot
                        key={gi}
                        char={char}
                        target={nameTargets[gi]}
                        onMount={(el) => {
                          charRefs.current[gi] = el
                        }}
                      />
                    )
                  })}
                </span>
              )
            })}
          </h1>
        </div>
        <p className={styles.paragraph()}>
          Building products at the intersection of design and engineering, where
          craftsmanship meets purpose and ideas become experiences worth
          remembering.
        </p>
      </div>
    </section>
  )
}

export { HeroSection, heroSectionStyles, type HeroSectionProps }
