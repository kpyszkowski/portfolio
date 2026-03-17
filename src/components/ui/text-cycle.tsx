'use client'
import { useState, useRef } from 'react'
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useMotionValueEvent,
  useTime,
} from 'motion/react'
import { createStyles, type StylesProps } from '~/utils/create-styles'
import { TextReveal } from '~/components/ui/text-reveal'
import type { TextRevealProps } from '~/components/ui/text-reveal'

const textCycleStyles = createStyles({
  slots: {
    container: 'overflow-hidden',
    item: 'block',
  },
})

interface TextCycleProps
  extends StylesProps<typeof textCycleStyles>,
    Pick<
      TextRevealProps,
      | 'mode'
      | 'delay'
      | 'staggerDelay'
      | 'exitProgress'
      | 'exitStagger'
      | 'ready'
    > {
  className?: string
  words: readonly string[] | string[]
  interval?: number
  stagger?: boolean
}

function TextCycle(props: TextCycleProps) {
  const {
    className,
    words,
    interval = 4_000,
    mode,
    delay,
    staggerDelay,
    stagger = true,
    exitProgress,
    exitStagger,
    ready,
  } = props

  const styles = textCycleStyles()

  const [index, setIndex] = useState(0)
  const pausedRef = useRef(false)
  const fallback = useMotionValue(0)
  const time = useTime()

  useMotionValueEvent(exitProgress ?? fallback, 'change', (v) => {
    pausedRef.current = v > 0
  })

  useMotionValueEvent(time, 'change', (t) => {
    if (pausedRef.current) return
    setIndex(Math.floor(t / interval) % words.length)
  })

  return (
    <span className={styles.container({ className })}>
      <AnimatePresence
        mode="wait"
        initial={false}
      >
        <motion.span
          key={index}
          className={styles.item()}
          exit={{ transition: { when: 'afterChildren' } }}
        >
          <TextReveal
            mode={mode}
            delay={delay}
            staggerDelay={staggerDelay}
            exitProgress={exitProgress}
            exitStagger={stagger ? exitStagger : false}
            ready={ready}
          >
            {words[index]}
          </TextReveal>
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export { TextCycle, textCycleStyles, type TextCycleProps }
