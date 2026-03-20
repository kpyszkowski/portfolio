'use client'
import { useRender } from '@base-ui-components/react/use-render'
import { mergeProps } from '@base-ui-components/react/merge-props'
import { createStyles, type StylesProps } from '~/utils/create-styles'
import { forwardRef } from 'react'

const sectionLayoutRootStyles = createStyles({
  slots: {
    root: '',
  },
  variants: {
    padding: {
      default: { root: 'px-5 py-24 lg:py-32' },
      none: {},
    },
  },
  defaultVariants: { padding: 'default' },
})

interface SectionLayoutRootProps
  extends useRender.ComponentProps<'section'>,
    StylesProps<typeof sectionLayoutRootStyles> {
  className?: string
}

const SectionLayoutRoot = forwardRef<HTMLElement, SectionLayoutRootProps>(
  (props, ref) => {
    const { className, render, padding, ...restProps } = props
    const styles = sectionLayoutRootStyles({ padding })

    return useRender({
      defaultTagName: 'section',
      render,
      ref,
      props: mergeProps<'section'>(
        {
          className: styles.root({ className }),
        },
        restProps,
      ) as Record<string, unknown>,
    })
  },
)

SectionLayoutRoot.displayName = 'SectionLayoutRoot'

export {
  SectionLayoutRoot,
  sectionLayoutRootStyles,
  type SectionLayoutRootProps,
}
