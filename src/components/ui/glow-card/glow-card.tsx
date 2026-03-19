'use client'
import { type ReactNode, useLayoutEffect, useRef, useState } from 'react'
import { wrap } from 'motion'
import {
  motion,
  useMotionTemplate,
  useSpring,
  useTime,
  useTransform,
} from 'motion/react'
import { createStyles, type StylesProps } from '~/utils/create-styles'
import { useGlowCardRootContext } from '~/components/ui/glow-card/glow-card-root'

const glowCardStyles = createStyles({
  slots: {
    container: 'relative p-px [clip-path:inset(0_0_0_0_round_1rem)]',
    glow: 'pointer-events-none absolute aspect-square w-1/3 rounded-full bg-accent-glow blur-3xl',
    inner: 'relative h-full rounded-2xl bg-elevated/96',
  },
})

interface GlowCardProps extends StylesProps<typeof glowCardStyles> {
  className?: string
  children: ReactNode
}

function GlowCard(props: GlowCardProps) {
  const { className, children, ...restProps } = props
  const styles = glowCardStyles()

  const { glowX, glowY, animate } = useGlowCardRootContext()!
  const cardRef = useRef<HTMLDivElement>(null)

  const [cardRect, setCardRect] = useState({ width: 0, height: 0 })

  useLayoutEffect(() => {
    if (!cardRef.current) return
    const element = cardRef.current
    const update = () => {
      const { width, height } = element.getBoundingClientRect()
      setCardRect({ width, height })
    }
    update()
    const observer = new ResizeObserver(update)
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const { width, height } = cardRect
  const perimeter = 2 * (width + height)
  const xSegment = height / perimeter
  const ySegment = width / perimeter

  const time = useTime()

  const progress = useTransform(time, (milliseconds) =>
    wrap(0, 1, milliseconds / (8 * 1000)),
  )

  const animX = useTransform(
    progress,
    [0, ySegment, ySegment + xSegment, ySegment + xSegment + ySegment, 1],
    [width, 0, 0, width, width],
  )
  const animY = useTransform(
    progress,
    [0, ySegment, ySegment + xSegment, ySegment + xSegment + ySegment, 1],
    [0, 0, height, height, 0],
  )

  const localX = useTransform(
    glowX,
    (value) => value - (cardRef.current?.offsetLeft ?? 0),
  )
  const localY = useTransform(
    glowY,
    (value) => value - (cardRef.current?.offsetTop ?? 0),
  )

  const springX = useSpring(localX, { stiffness: 300, damping: 30 })
  const springY = useSpring(localY, { stiffness: 300, damping: 30 })

  const positionX = useMotionTemplate`calc(${animate ? animX : springX}px - 50%)`
  const positionY = useMotionTemplate`calc(${animate ? animY : springY}px - 50%)`

  return (
    <div
      ref={cardRef}
      className={styles.container({ className })}
      {...restProps}
    >
      <motion.div
        className={styles.glow()}
        style={{ x: positionX, y: positionY }}
      />
      <div className={styles.inner()}>{children}</div>
    </div>
  )
}

export { GlowCard, glowCardStyles, type GlowCardProps }
