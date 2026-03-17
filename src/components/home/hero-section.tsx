'use client'
import { useRef, useState } from 'react'
import { useTransform, useScroll } from 'motion/react'
import { createStyles, type StylesProps } from '~/utils/create-styles'
import { HeroScene } from '~/components/home/hero-scene/hero-scene'
import { TextReveal } from '~/components/ui/text-reveal'
import { TextCycle } from '~/components/ui/text-cycle'
import { PageLoader } from '~/components/page-loader'

const heroSectionStyles = createStyles({
  slots: {
    container: 'relative h-[250vh]',
    sticky: 'sticky top-0 h-svh overflow-hidden',
    inner: 'relative flex h-full flex-col items-center',
    scene: 'absolute inset-0 z-10',
    content:
      'pointer-events-none absolute inset-x-0 bottom-0 z-20 grid grid-cols-2 items-end gap-8 px-12 pb-12',
    headingArea: 'flex flex-col gap-4',
    subtitle:
      'font-sans text-sm/none tracking-widest text-highlight uppercase select-none',
    heading:
      'flex flex-col font-display text-[7vw]/none font-semibold tracking-normal text-transparent select-none [-webkit-text-stroke:1.5px_var(--color-accent)]',
    paragraph: 'font-sans text-2xl/relaxed text-elevated',
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

  const exitProgress = useTransform(scrollYProgress, [0, 0.2], [0, 1])

  return (
    <div
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
            />
          </div>
          <div className={styles.content()}>
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
          </div>
        </section>
      </div>
      {!isReady && <PageLoader onReady={() => setIsReady(true)} />}
    </div>
  )
}

export { HeroSection, heroSectionStyles, type HeroSectionProps }
