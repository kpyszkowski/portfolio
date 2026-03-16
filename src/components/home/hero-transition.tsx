'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { HeroSection } from '~/components/home/hero-section'
import { AboutSection } from '~/components/home/about-section'

function HeroTransition() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({ target: containerRef })

  const typographyOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const typographyFilter = useTransform(
    scrollYProgress,
    [0, 0.5],
    ['blur(0px)', 'blur(12px)'],
  )

  const sceneOpacity = useTransform(scrollYProgress, [0.5, 1], [1, 0])
  const groundScrollOpacity = useTransform(scrollYProgress, [0.5, 0.75], [1, 0])

  const aboutOpacity = useTransform(scrollYProgress, [0.75, 1], [0, 1])
  const aboutFilter = useTransform(
    scrollYProgress,
    [0.75, 1],
    ['blur(12px)', 'blur(0px)'],
  )

  return (
    <div
      ref={containerRef}
      className="relative h-[200vh]"
    >
      <div className="sticky top-0 h-svh overflow-hidden">
        <HeroSection
          typographyOpacity={typographyOpacity}
          typographyFilter={typographyFilter}
          sceneOpacity={sceneOpacity}
          groundScrollOpacity={groundScrollOpacity}
        />
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{ opacity: aboutOpacity, filter: aboutFilter }}
        >
          <AboutSection />
        </motion.div>
      </div>
    </div>
  )
}

export { HeroTransition }
