import { type ComponentPropsWithoutRef } from 'react'
import { createStyles, type StylesProps } from '~/utils/create-styles'

const sectionLayoutWrapperStyles = createStyles({
  slots: {
    wrapper: 'mx-auto',
  },
  variants: {
    width: {
      '2xl': { wrapper: 'max-w-screen-2xl' },
      xl: { wrapper: 'max-w-screen-xl' },
      md: { wrapper: 'max-w-3xl' },
    },
  },
  defaultVariants: { width: 'xl' },
})

interface SectionLayoutWrapperProps
  extends ComponentPropsWithoutRef<'div'>,
    StylesProps<typeof sectionLayoutWrapperStyles> {
  className?: string
}

function SectionLayoutWrapper(props: SectionLayoutWrapperProps) {
  const { className, children, width, ...restProps } = props
  const styles = sectionLayoutWrapperStyles({ width })

  return (
    <div
      className={styles.wrapper({ className })}
      {...restProps}
    >
      {children}
    </div>
  )
}

export {
  SectionLayoutWrapper,
  sectionLayoutWrapperStyles,
  type SectionLayoutWrapperProps,
}
