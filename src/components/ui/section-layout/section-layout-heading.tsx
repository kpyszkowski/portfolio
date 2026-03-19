import { type ComponentPropsWithoutRef } from 'react'
import { createStyles, type StylesProps } from '~/utils/create-styles'

const sectionLayoutHeadingStyles = createStyles({
  slots: {
    heading:
      'mb-6 text-sm font-medium tracking-widest text-highlight uppercase md:mb-10 md:text-base',
  },
})

interface SectionLayoutHeadingProps
  extends ComponentPropsWithoutRef<'h2'>,
    StylesProps<typeof sectionLayoutHeadingStyles> {
  className?: string
}

function SectionLayoutHeading(props: SectionLayoutHeadingProps) {
  const { className, children, ...restProps } = props
  const styles = sectionLayoutHeadingStyles()

  return (
    <h2
      className={styles.heading({ className })}
      {...restProps}
    >
      {children}
    </h2>
  )
}

export {
  SectionLayoutHeading,
  sectionLayoutHeadingStyles,
  type SectionLayoutHeadingProps,
}
