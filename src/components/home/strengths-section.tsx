'use client'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react'
import { useRef } from 'react'
import { type Icon } from 'react-feather'
import { createStyles, type StylesProps } from '~/utils/create-styles'
import { strengthsContent } from '~/content/home'

const strengthsSectionStyles = createStyles({
  slots: {
    container: 'px-5 py-24 lg:py-32',
    inner: 'mx-auto max-w-screen-xl',
    heading: 'mb-10 font-medium tracking-widest text-highlight uppercase',
    grid: 'relative grid grid-cols-1 content-stretch gap-6 md:grid-cols-2',
    card: 'relative p-px [clip-path:inset(0_0_0_0_round_1rem)]',
    cardGlow:
      'pointer-events-none absolute -top-66 -left-66 size-132 bg-radial from-accent-glow from-0% to-transparent to-50%',
    cardWrapper:
      'relative flex h-full flex-col rounded-2xl bg-elevated/96 p-6 lg:p-12',
    cardIconWrapper:
      'mb-6 flex size-10 items-center justify-center rounded-xl bg-highlight text-main',
    cardIcon: 'size-5 text-accent',
    cardHeading: 'mb-4 text-base font-medium text-main md:text-xl',
    cardBody: 'leading-relaxed text-elevated md:text-lg',
  },
})

type StrengthCardProps = {
  heading: string
  body: string
  icon: Icon
  styles: ReturnType<typeof strengthsSectionStyles>
  glowX: MotionValue<number>
  glowY: MotionValue<number>
}

function StrengthCard(props: StrengthCardProps) {
  const { heading, body, icon: CardIcon, styles, glowX, glowY } = props
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
      className={styles.card()}
    >
      <motion.div
        style={{ x, y }}
        className={styles.cardGlow()}
      />
      <div className={styles.cardWrapper()}>
        <div className={styles.cardIconWrapper()}>
          <CardIcon className={styles.cardIcon()} />
        </div>
        <h3 className={styles.cardHeading()}>{heading}</h3>
        <p className={styles.cardBody()}>{body}</p>
      </div>
    </div>
  )
}

interface StrengthsSectionProps
  extends StylesProps<typeof strengthsSectionStyles> {
  className?: string
}

function StrengthsSection(props: StrengthsSectionProps) {
  const { className, ...restProps } = props
  const styles = strengthsSectionStyles()
  const gridRef = useRef<HTMLDivElement>(null)

  const glowX = useMotionValue(-1000)
  const glowY = useMotionValue(-1000)

  return (
    <section
      className={styles.container({ className })}
      onMouseMove={(e) => {
        const rect = gridRef.current?.getBoundingClientRect()
        if (!rect) return
        glowX.set(e.clientX - rect.left)
        glowY.set(e.clientY - rect.top)
      }}
      {...restProps}
    >
      <div className={styles.inner()}>
        <h2 className={styles.heading()}>{strengthsContent.heading}</h2>

        <motion.div
          ref={gridRef}
          className={styles.grid()}
        >
          {strengthsContent.items.map(({ id, heading, body, icon }) => (
            <StrengthCard
              key={id}
              heading={heading}
              body={body}
              icon={icon}
              styles={styles}
              glowX={glowX}
              glowY={glowY}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export { StrengthsSection, strengthsSectionStyles, type StrengthsSectionProps }
