'use client'
import { motion, useInView, type Variants } from 'motion/react'
import { useRef } from 'react'
import { createStyles, type StylesProps } from '~/utils/create-styles'
import { strengthsContent } from '~/content/home'

const strengthsSectionStyles = createStyles({
  slots: {
    container: 'px-5 py-24 lg:py-32',
    inner: 'mx-auto max-w-5xl',
    heading:
      'mb-10 text-xs font-medium tracking-widest text-highlight uppercase',
    grid: 'grid grid-cols-1 gap-6 md:grid-cols-2',
    card: 'flex flex-col gap-4 rounded-2xl bg-elevated p-6 lg:p-8',
    cardIconWrapper:
      'flex size-10 items-center justify-center rounded-xl bg-highlight text-main',
    cardIcon: 'size-5',
    cardHeading: 'text-base font-medium text-main',
    cardBody: 'text-sm leading-relaxed font-light text-elevated',
  },
})

const GRID_VARIANTS: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const CARD_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 22,
      mass: 0.8,
    },
  },
}

interface StrengthsSectionProps
  extends StylesProps<typeof strengthsSectionStyles> {
  className?: string
}

function StrengthsSection(props: StrengthsSectionProps) {
  const { className, ...restProps } = props
  const styles = strengthsSectionStyles()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      className={styles.container({ className })}
      {...restProps}
    >
      <div className={styles.inner()}>
        <h2 className={styles.heading()}>{strengthsContent.heading}</h2>

        <motion.div
          ref={ref}
          className={styles.grid()}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          variants={GRID_VARIANTS}
        >
          {strengthsContent.items.map(({ id, heading, body, icon: Icon }) => (
            <motion.div
              key={id}
              className={styles.card()}
              variants={CARD_VARIANTS}
            >
              <div className={styles.cardIconWrapper()}>
                <Icon className={styles.cardIcon()} />
              </div>
              <h3 className={styles.cardHeading()}>{heading}</h3>
              <p className={styles.cardBody()}>{body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export { StrengthsSection, strengthsSectionStyles, type StrengthsSectionProps }
