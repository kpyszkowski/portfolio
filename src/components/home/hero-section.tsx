'use client'
import { motion, type Variants } from 'motion/react'
import { createStyles, type StylesProps } from '~/utils/create-styles'
import { heroContent } from '~/content/home'

const heroSectionStyles = createStyles({
  slots: {
    container:
      'relative flex min-h-[100dvh] flex-col items-center justify-center px-5',
    inner: 'flex flex-col items-center gap-4 text-center',
    name: 'text-4xl font-extralight text-primary lg:text-7xl',
    role: 'text-2xl font-extralight text-secondary lg:text-4xl',
    tagline: 'mt-2 max-w-lg text-base text-tertiary lg:text-lg',
    socials: 'group mt-10 flex text-primary',
    socialLink:
      'block p-4 transition-opacity group-hover:opacity-25 hover:!opacity-100 focus-visible:!opacity-100',
    socialIcon: 'size-5',
  },
})

const CONTAINER_VARIANTS: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

const ITEM_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20,
      mass: 0.8,
    },
  },
}

interface HeroSectionProps extends StylesProps<typeof heroSectionStyles> {
  className?: string
}

function HeroSection(props: HeroSectionProps) {
  const { className, ...restProps } = props
  const styles = heroSectionStyles()

  return (
    <section
      id="hero"
      className={styles.container({ className })}
      {...restProps}
    >
      <motion.div
        className={styles.inner()}
        initial="hidden"
        animate="show"
        variants={CONTAINER_VARIANTS}
      >
        <motion.h1
          className={styles.name()}
          variants={ITEM_VARIANTS}
        >
          {heroContent.name}
        </motion.h1>

        <motion.span
          className={styles.role()}
          variants={ITEM_VARIANTS}
        >
          {heroContent.role}
        </motion.span>

        <motion.p
          className={styles.tagline()}
          variants={ITEM_VARIANTS}
        >
          {heroContent.tagline}
        </motion.p>

        <motion.ul
          className={styles.socials()}
          variants={ITEM_VARIANTS}
        >
          {heroContent.socials.map(({ name, href, icon: Icon }) => (
            <li key={name}>
              <a
                href={href}
                target={href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={name}
                className={styles.socialLink()}
              >
                <Icon className={styles.socialIcon()} />
              </a>
            </li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  )
}

export { HeroSection, heroSectionStyles, type HeroSectionProps }
