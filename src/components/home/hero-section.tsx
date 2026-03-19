'use client'
import { useRef, useState } from 'react'
import { useTransform, useScroll, useInView } from 'motion/react'
import { createStyles, type StylesProps } from '~/utils/create-styles'
import { HeroScene } from '~/components/home/hero-scene/hero-scene'
import { TextReveal } from '~/components/ui/text-reveal'
import { TextCycle } from '~/components/ui/text-cycle'
import { PageLoader } from '~/components/page-loader'
import { SectionLayout } from '~/components/ui/section-layout'

const heroSectionStyles = createStyles({
  slots: {
    container: 'relative h-[250vh]',
    sticky: 'sticky top-0 h-svh overflow-hidden',
    inner: 'relative flex h-full flex-col items-center',
    scene: 'absolute inset-0 z-10',
    content:
      'pointer-events-none absolute inset-x-0 bottom-0 z-20 flex w-full max-w-screen-2xl flex-col gap-8 p-6 md:flex-row md:items-end md:p-12',
    headingArea: 'flex flex-1 flex-col gap-4',
    subtitle:
      'font-sans text-sm/none tracking-widest text-highlight uppercase select-none',
    heading:
      'flex flex-col font-display text-[clamp(3.5rem,7vw,7rem)]/none font-semibold tracking-normal text-transparent select-none [-webkit-text-stroke:1.5px_var(--color-accent)]',
    paragraph: 'font-sans text-elevated md:basis-1/2 md:text-2xl/relaxed',
  },
})

interface HeroSectionProps extends StylesProps<typeof heroSectionStyles> {
  className?: string
}

function HeroSection(props: HeroSectionProps) {
  const { className, ...restProps } = props
  const styles = heroSectionStyles()

  const [isReady, setIsReady] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const isInView = useInView(containerRef)

  const exitProgress = useTransform(scrollYProgress, [0, 0.2], [0, 1])

  return (
    <SectionLayout.Root
      render={<div />}
      padding="none"
      ref={containerRef}
      className={styles.container({ className })}
      {...restProps}
    >
      <div className={styles.sticky()}>
        <section
          id="hero"
          className={styles.inner()}
        >
          <div className={styles.scene()}>
            <HeroScene
              className="absolute inset-0 h-full w-full"
              scrollYProgress={scrollYProgress}
              frameloop={isInView ? 'always' : 'never'}
            />
          </div>

          <SectionLayout.Wrapper className={styles.content()}>
            <div className={styles.headingArea()}>
              <TextCycle
                className={styles.subtitle()}
                words={['Creative Developer', 'Fullstack Engineer']}
                interval={4_000}
                mode="word"
                exitProgress={exitProgress}
                stagger={false}
                ready={isReady}
              />
              <h1 className={styles.heading()}>
                <TextReveal
                  exitProgress={exitProgress}
                  ready={isReady}
                >
                  Kamil
                </TextReveal>
                <TextReveal
                  exitProgress={exitProgress}
                  ready={isReady}
                >
                  Pyszkowski
                </TextReveal>
              </h1>
            </div>
            <TextReveal
              className={styles.paragraph()}
              mode="word"
              syncLines
              exitProgress={exitProgress}
              ready={isReady}
            >
              Building products at the intersection of design and engineering,
              where craftsmanship meets purpose and ideas become experiences
              worth remembering.
            </TextReveal>
          </SectionLayout.Wrapper>
        </section>
      </div>

      {!isReady && <PageLoader onReady={() => setIsReady(true)} />}
    </SectionLayout.Root>
  )
}

export { HeroSection, heroSectionStyles, type HeroSectionProps }
