import { createStyles, type StylesProps } from '~/utils/create-styles'

const windowCardContentStyles = createStyles({
  slots: {
    container: 'not-prose overflow-hidden',
  },
  variants: {
    variant: {
      translucent: {
        container: 'bg-primary/86 dark:bg-primary/64',
      },
      solid: {
        container: 'bg-primary dark:bg-secondary',
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

  return (
    <Component
      className={styles.container({ className })}
      {...restProps}
    >
      {children}
    </Component>
  )
}

export {
  WindowCardContent,
  windowCardContentStyles,
  type WindowCardContentProps,
}
