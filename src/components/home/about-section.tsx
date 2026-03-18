'use client'
import { useRef } from 'react'
import {
  cubicBezier,
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from 'motion/react'
import { createStyles, type StylesProps } from '~/utils/create-styles'
import { aboutContent } from '~/content/home'
import { TextFill } from '~/components/ui/text-fill'
import { Signature } from '~/components/signature'

const aboutSectionStyles = createStyles({
  slots: {
    outer: 'relative -mt-[100vh] h-[300vh]',
    container:
      'sticky top-0 flex h-svh flex-col items-start justify-center px-5',
    wrapper: 'mx-auto max-w-3xl',
    heading:
      'mb-6 text-xs font-medium tracking-widest text-highlight uppercase',
    body: 'text-xl leading-relaxed text-elevated lg:text-2xl',
    signature: 'mt-12 h-auto w-36',
  },
})

const ease = cubicBezier(0.4, 0, 0.2, 1)

interface AboutSectionProps extends StylesProps<typeof aboutSectionStyles> {
  className?: string
}

function AboutSection(props: AboutSectionProps) {
  const { className, ...restProps } = props
  const styles = aboutSectionStyles()

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.33], [0, 1], {
    ease,
  })
  const blur = useTransform(scrollYProgress, [0, 0.33], [8, 0], {
    ease,
  })
  const scale = useTransform(scrollYProgress, [0, 0.33], [0.96, 1], {
    ease,
  })

  const textProgress = useTransform(scrollYProgress, [0.33, 1], [0, 1])
  const signatureProgress = useTransform(scrollYProgress, [0.66, 1], [0, 1], {
    ease,
  })

  const filter = useMotionTemplate`blur(${blur}px)`

  return (
    <div
      ref={containerRef}
      className={styles.outer({ className })}
    >
      <motion.section
        id="about"
        className={styles.container()}
        style={{ opacity, filter, scale }}
        {...restProps}
      >
        <div className={styles.wrapper()}>
          <h2 className={styles.heading()}>{aboutContent.heading}</h2>
          <div className={styles.body()}>
            <TextFill progress={textProgress}>{aboutContent.body}</TextFill>
          </div>

          <Signature
            className={styles.signature()}
            progress={signatureProgress}
          />
        </div>
      </motion.section>
    </div>
  )
}

export { AboutSection, aboutSectionStyles, type AboutSectionProps }
