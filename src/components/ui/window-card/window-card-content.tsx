import React from 'react'
import { createStyles, type StylesProps } from '~/utils/create-styles'

const windowCardContentStyles = createStyles({
  slots: {
    container: 'not-prose overflow-hidden',
  },
  variants: {
    variant: {
      translucent: {
        container: 'bg-main/86 dark:bg-main/64',
      },
      solid: {
        container: 'bg-main dark:bg-elevated',
      },
    },
  },
  defaultVariants: {
    variant: 'translucent',
  },
})

interface WindowCardContentProps
  extends StylesProps<typeof windowCardContentStyles> {
  className?: string
  children?: React.ReactNode
  as?: React.ElementType
}

function WindowCardContent(props: WindowCardContentProps) {
  const {
    className = '',
    children,
    as: Component = 'div',
    variant,
    ...restProps
  } = props

  const styles = windowCardContentStyles({ variant })

  const Tag = Component as React.ElementType<{
    className?: string
    children?: React.ReactNode
  }>

  return (
    <Tag
      className={styles.container({ className })}
      {...restProps}
    >
      {children}
    </Tag>
  )
}

export {
  WindowCardContent,
  windowCardContentStyles,
  type WindowCardContentProps,
}
