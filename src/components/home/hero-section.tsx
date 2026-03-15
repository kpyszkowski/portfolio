'use client'
import { createStyles, type StylesProps } from '~/utils/create-styles'
import { HeroScene } from '~/components/home/hero-scene/hero-scene'

const heroSectionStyles = createStyles({
  slots: {
    container:
      'relative flex min-h-[100dvh] flex-col items-center justify-center px-5',
  },
})

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
      <HeroScene />
    </section>
  )
}

export { HeroSection, heroSectionStyles, type HeroSectionProps }
