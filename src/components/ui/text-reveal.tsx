'use client'
import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  type MotionValue,
} from 'motion/react'
import { createStyles, type StylesProps } from '~/utils/create-styles'

const textRevealStyles = createStyles({
  slots: {
    container: '',
    unit: 'mb-[-0.2em] inline-block overflow-hidden pb-[0.2em] align-bottom',
    inner: 'inline-block',
  },
})

const unitVariants = {
  hidden: { y: '110%' },
  visible: (delay: number) => ({
    y: '0%',
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const, delay },
  }),
  exit: {
    y: '-110%',
    transition: { duration: 0.3, ease: [0.4, 0, 1, 1] },
  },
}

interface TextRevealUnitProps {
  exitProgress?: MotionValue<number>
  exitStagger?: boolean
  index: number
  total: number
  unitClassName: string
  innerClassName: string
  custom: number
  innerRef: (el: HTMLElement | null) => void
  children: React.ReactNode
  ariaHidden?: boolean
}

function TextRevealUnit(props: TextRevealUnitProps) {
  const {
    exitProgress,
    exitStagger = true,
    index,
    total,
    unitClassName,
    innerClassName,
    custom,
    innerRef,
    children,
    ariaHidden,
  } = props

  const fallback = useMotionValue(0)
  const progress = exitProgress ?? fallback

  const overlap = 0.5
  const staggerStep = exitStagger ? (1 / total) * (1 - overlap) : 0
  const unitDuration = exitStagger ? 1 - (total - 1) * staggerStep : 1
  const start = index * staggerStep
  const end = start + unitDuration

  const exitY = useTransform(progress, [start, end], ['0%', '110%'])

  return (
    <motion.span
      className={unitClassName}
      aria-hidden={ariaHidden}
    >
      <motion.span
        className={innerClassName}
        style={exitProgress ? { y: exitY } : undefined}
      >
        <motion.span
          ref={innerRef}
          className={innerClassName}
          variants={unitVariants}
          custom={custom}
        >
          {children}
        </motion.span>
      </motion.span>
    </motion.span>
  )
}

interface TextRevealProps extends StylesProps<typeof textRevealStyles> {
  className?: string
  children: string
  mode?: 'word' | 'char'
  delay?: number
  staggerDelay?: number
  /** Reset stagger counter at the start of each line so all lines animate in parallel */
  syncLines?: boolean
  /** MotionValue 0→1 that drives a staggered scroll-exit across all units */
  exitProgress?: MotionValue<number>
  /** Whether units stagger their exit (default true) */
  exitStagger?: boolean
}

function TextReveal(props: TextRevealProps) {
  const {
    className,
    children,
    mode = 'word',
    delay = 0,
    staggerDelay = mode === 'word' ? 0.07 : 0.03,
    syncLines = false,
    exitProgress,
    exitStagger = true,
  } = props

  const styles = textRevealStyles()
  const units = mode === 'word' ? children.split(' ') : [...children]
  const animatableCount =
    mode === 'word' ? units.length : units.filter((c) => c !== ' ').length

  const containerRef = useRef<HTMLSpanElement>(null)
  const unitRefs = useRef<(HTMLElement | null)[]>([])

  // Pre-compute sequential delays as the default; syncLines overwrites these on mount
  const [delays, setDelays] = useState<number[]>(() =>
    Array.from({ length: animatableCount }, (_, i) => delay + i * staggerDelay),
  )
  const [animateState, setAnimateState] = useState<'hidden' | 'visible'>(
    'hidden',
  )
  const isInView = useInView(containerRef, { once: true })

  const containerVariants = {
    exit: { transition: { staggerChildren: staggerDelay / 2 } },
  }

  const syncLinesRef = useRef(syncLines)
  const animatableCountRef = useRef(animatableCount)
  const delayRef = useRef(delay)
  const staggerDelayRef = useRef(staggerDelay)

  useEffect(() => {
    if (!isInView) return

    if (!syncLinesRef.current) {
      setAnimateState('visible')
      return
    }

    // Measure rendered line positions and reset stagger index per line
    const tops = unitRefs.current
      .slice(0, animatableCountRef.current)
      .map((el) => (el ? Math.round(el.getBoundingClientRect().top) : 0))

    const lineWordIndex = new Map<number, number>()
    const computed = tops.map((top) => {
      const idx = lineWordIndex.get(top) ?? 0
      lineWordIndex.set(top, idx + 1)
      return delayRef.current + idx * staggerDelayRef.current
    })

    setDelays(computed)
    setAnimateState('visible')
  }, [isInView])

  let animateIdx = 0

  return (
    <motion.span
      ref={containerRef}
      className={styles.container({ className })}
      variants={containerVariants}
      initial="hidden"
      animate={animateState}
      exit="exit"
      aria-label={children}
    >
      {mode === 'word'
        ? units.map((word, wi) => {
            const idx = animateIdx++
            return (
              <span key={wi}>
                <TextRevealUnit
                  exitProgress={exitProgress}
                  exitStagger={exitStagger}
                  index={idx}
                  total={animatableCount}
                  unitClassName={styles.unit()}
                  innerClassName={styles.inner()}
                  custom={delays[idx] ?? 0}
                  innerRef={(el) => {
                    unitRefs.current[idx] = el
                  }}
                  ariaHidden
                >
                  {word}
                </TextRevealUnit>
                {wi < units.length - 1 && ' '}
              </span>
            )
          })
        : units.map((char, ci) => {
            if (char === ' ') {
              return (
                <span
                  key={ci}
                  aria-hidden
                >
                  {'\u00A0'}
                </span>
              )
            }
            const idx = animateIdx++
            return (
              <TextRevealUnit
                key={ci}
                exitProgress={exitProgress}
                index={idx}
                total={animatableCount}
                unitClassName={styles.unit()}
                innerClassName={styles.inner()}
                custom={delays[idx] ?? 0}
                innerRef={(el) => {
                  unitRefs.current[idx] = el
                }}
                ariaHidden
              >
                {char}
              </TextRevealUnit>
            )
          })}
    </motion.span>
  )
}

export { TextReveal, textRevealStyles, type TextRevealProps }
