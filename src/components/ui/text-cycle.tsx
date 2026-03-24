'use client'
import {
  motion,
  useTransform,
  useTime,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  wrap,
  MotionValue,
} from 'motion/react'
import { createStyles, type StylesProps } from '~/utils/create-styles'

const textCycleStyles = createStyles({
  slots: {
    container: 'relative overflow-hidden',
    placeholder: 'invisible',
    wrapper: 'absolute inset-0 block overflow-hidden',
    content: 'absolute inset-0 flex flex-col',
  },
})

interface TextCycleProps extends StylesProps<typeof textCycleStyles> {
  className?: string
  content: readonly string[] | string[]
  interval?: number
  exitProgress?: MotionValue<number>
  direction?: 'up' | 'down'
}

function TextCycle(props: TextCycleProps) {
  const {
    className,
    content,
    interval = 4_000,
    exitProgress = new MotionValue(),
    direction = 'down',
  } = props

  const styles = textCycleStyles()

  const time = useTime()
  const index = useTransform<number, number>(
    [time, exitProgress],
    ([t, p]): number => {
      // freeze index when exiting
      if (p !== 0) return index.get()
      return wrap(0, content.length, Math.floor(t / interval))
    },
  )
  const indexes = Array.from(content.keys())
  const rawY = useTransform(
    index,
    indexes,
    indexes.map((i) => i * 100 * (direction === 'up' ? -1 : 1)),
  )

  const springY = useSpring(rawY, {
    stiffness: 300,
    damping: 30,
  })

  const cycleY = useMotionTemplate`${springY}%`

  const fallbackProgress = useMotionValue(0)
  const progress = exitProgress ?? fallbackProgress

  const exitRaw = useTransform(
    progress,
    [0, 1],
    direction === 'up' ? [0, -100] : [0, 100],
  )
  const exitY = useMotionTemplate`${exitRaw}%`

  const directionAwareContent =
    direction === 'down' ? [...content].reverse() : content

  return (
    <div className={styles.container({ className })}>
      <span className={styles.placeholder()}>{content[0]}</span>
      <motion.span
        className={styles.wrapper()}
        style={{ y: exitY }}
      >
        <motion.span
          className={styles.content()}
          style={{
            y: cycleY,
            justifyContent: direction === 'up' ? 'flex-start' : 'flex-end',
          }}
        >
          {directionAwareContent.map((text) => (
            <span key={text}>{text}</span>
          ))}
        </motion.span>
      </motion.span>
    </div>
  )
}

export { TextCycle, type TextCycleProps }
