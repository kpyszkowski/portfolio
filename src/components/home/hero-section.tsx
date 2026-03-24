'use client'
import { useRef, useState } from 'react'
import { useTransform, useScroll, useInView } from 'motion/react'
import { createStyles, type StylesProps } from '~/utils/create-styles'
import { HeroScene } from '~/components/home/hero-scene/hero-scene'
import { TextReveal } from '~/components/ui/text-reveal'
import { TextCycle } from '~/components/ui/text-cycle'
import { PageLoader } from '~/components/page-loader'
import { SectionLayout } from '~/components/ui/section-layout'
import { homeSectionIds } from '~/content/home'
import { heroContent } from '~/content/home'

const heroSectionStyles = createStyles({
  slots: {
    container: '-mt-(--header-height) h-[250vh] p-0!',
    wrapper: 'sticky top-0 h-svh overflow-hidden',
    content:
      'pointer-events-none absolute inset-x-0 bottom-0 z-20 flex w-full flex-col gap-8 px-5 pb-5 md:flex-row md:items-end md:pb-24 lg:pb-32',
    headingArea: 'flex flex-1 flex-col gap-4',
    subtitle:
      'font-sans text-sm/none tracking-widest text-highlight uppercase select-none',
    heading:
      'flex flex-col font-display text-[clamp(3.5rem,7vw,7rem)]/none font-semibold tracking-normal text-accent select-none',
    paragraph: 'font-sans text-elevated md:basis-1/2 md:text-2xl/relaxed',
  },
})

interface HeroSectionProps extends StylesProps<typeof heroSectionStyles> {
  className?: string
}

let _sceneReady = false

function HeroSection(props: HeroSectionProps) {
  const { className, ...restProps } = props
  const styles = heroSectionStyles()

  const [isReady, setIsReady] = useState(_sceneReady)

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    layoutEffect: true,
  })
  const isInView = useInView(containerRef)

  const exitProgress = useTransform(scrollYProgress, [0, 0.2], [0, 1])

  return (
    <SectionLayout.Root
      id={homeSectionIds.hero}
      ref={containerRef}
      className={styles.container({ className })}
      {...restProps}
    >
      <div className={styles.wrapper()}>
        <HeroScene
          className="absolute inset-0 h-full w-full"
          scrollYProgress={scrollYProgress}
          frameloop={isInView ? 'always' : 'never'}
        />

        <SectionLayout.Wrapper
          width="2xl"
          className={styles.content()}
        >
          <div className={styles.headingArea()}>
            <TextCycle
              className={styles.subtitle()}
              content={heroContent.role}
              interval={4_000}
              exitProgress={exitProgress}
            />
            <h1 className={styles.heading()}>
              {heroContent.name.map((word, index) => (
                <TextReveal
                  key={index}
                  exitProgress={exitProgress}
                  ready={isReady}
                >
                  {word}
                </TextReveal>
              ))}
            </h1>
          </div>
          <TextReveal
            className={styles.paragraph()}
            staggerDelay={0}
            exitStagger={false}
            exitProgress={exitProgress}
            ready={isReady}
          >
            {heroContent.tagline}
          </TextReveal>
        </SectionLayout.Wrapper>
      </div>

      {!isReady && (
        <PageLoader
          onReady={() => {
            _sceneReady = true
            setIsReady(true)
          }}
        />
      )}
    </SectionLayout.Root>
  )
}

export { HeroSection, heroSectionStyles, type HeroSectionProps }
