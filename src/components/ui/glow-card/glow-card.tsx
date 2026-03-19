'use client'
import { type ReactNode, useRef } from 'react'
import { motion, useSpring, useTransform } from 'motion/react'
import { createStyles, type StylesProps } from '~/utils/create-styles'
import { useGlowCardRootContext } from '~/components/ui/glow-card/glow-card-root'

const glowCardStyles = createStyles({
  slots: {
    container: 'relative p-px [clip-path:inset(0_0_0_0_round_1rem)]',
    glow: 'pointer-events-none absolute -top-66 -left-66 size-132 bg-radial from-accent-glow from-0% to-transparent to-50%',
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

  const { glowX, glowY } = useGlowCardRootContext()!
  const cardRef = useRef<HTMLDivElement>(null)

  const localX = useTransform(
    glowX,
    (x) => `${x - (cardRef.current?.offsetLeft ?? 0)}px`,
  )
  const localY = useTransform(
    glowY,
    (y) => `${y - (cardRef.current?.offsetTop ?? 0)}px`,
  )

  const x = useSpring(localX, { stiffness: 300, damping: 30 })
  const y = useSpring(localY, { stiffness: 300, damping: 30 })

  return (
    <div
      ref={cardRef}
      className={styles.container({ className })}
      {...restProps}
    >
      <motion.div
        className={styles.glow()}
        style={{ x, y }}
      />
      <div className={styles.inner()}>{children}</div>
    </div>
  )
}

export { GlowCard, glowCardStyles, type GlowCardProps }
