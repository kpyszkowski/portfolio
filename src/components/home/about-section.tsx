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
import { SectionLayout } from '~/components/ui/section-layout'

const aboutSectionStyles = createStyles({
  slots: {
    container:
      'sticky top-0 flex h-svh flex-col items-start justify-center px-5',
    outer: 'relative -mt-[100vh] h-[300vh]',
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
    <SectionLayout.Root
      render={<div />}
      padding="none"
      ref={containerRef}
      className={styles.outer({ className })}
    >
      <motion.section
        id="about"
        className={styles.container()}
        style={{ opacity, filter, scale }}
        {...restProps}
      >
        <SectionLayout.Wrapper width="md">
          <SectionLayout.Heading>{aboutContent.heading}</SectionLayout.Heading>
          <div className={styles.body()}>
            <TextFill progress={textProgress}>{aboutContent.body}</TextFill>
          </div>

          <Signature
            className={styles.signature()}
            progress={signatureProgress}
          />
        </SectionLayout.Wrapper>
      </motion.section>
    </SectionLayout.Root>
  )
}

export { AboutSection, aboutSectionStyles, type AboutSectionProps }
