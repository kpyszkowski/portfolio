'use client'
import { useRender } from '@base-ui-components/react/use-render'
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
  extends useRender.ComponentProps<'div'>,
    StylesProps<typeof sectionLayoutWrapperStyles> {
  className?: string
}

function SectionLayoutWrapper(props: SectionLayoutWrapperProps) {
  const { className, width, render, ...restProps } = props
  const styles = sectionLayoutWrapperStyles({ width })

  return useRender({
    defaultTagName: 'div',
    render,
    props: {
      className: styles.wrapper({ className }),
      ...restProps,
    },
  })
}

export {
  SectionLayoutWrapper,
  sectionLayoutWrapperStyles,
  type SectionLayoutWrapperProps,
}
