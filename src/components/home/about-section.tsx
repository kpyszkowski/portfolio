'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { createStyles, type StylesProps } from '~/utils/create-styles'
import { aboutContent } from '~/content/home'

const aboutSectionStyles = createStyles({
  slots: {
    container: 'px-5 py-24 lg:py-32',
    inner: 'mx-auto max-w-3xl',
    heading:
      'mb-6 text-xs font-medium tracking-widest text-highlight uppercase',
    body: 'text-xl leading-relaxed font-extralight text-elevated lg:text-2xl',
  },
})

interface AboutSectionProps extends StylesProps<typeof aboutSectionStyles> {
  className?: string
}

function AboutSection(props: AboutSectionProps) {
  const { className, ...restProps } = props
  const styles = aboutSectionStyles()

  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start 0.6'],
  })

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1])
  const filter = useTransform(
    scrollYProgress,
    [0, 1],
    ['blur(12px)', 'blur(0px)'],
  )

  return (
    <motion.section
      ref={ref}
      id="about"
      className={styles.container({ className })}
      style={{ opacity, scale, filter }}
      {...restProps}
    >
      <div className={styles.inner()}>
        <h2 className={styles.heading()}>{aboutContent.heading}</h2>
        <p className={styles.body()}>{aboutContent.body}</p>
      </div>
    </motion.section>
  )
}

export { AboutSection, aboutSectionStyles, type AboutSectionProps }
