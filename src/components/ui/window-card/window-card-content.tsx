import { tv, type VariantProps } from 'tailwind-variants'

const getStyles = tv({
  slots: {
    container: 'not-prose overflow-hidden',
  },
  variants: {
    variant: {
      translucent: {
        container: 'bg-primary/86 dark:bg-primary/64',
      },
      solid: {
        container: 'bg-secondary/85',
      },
    },
  },
  defaultVariants: {
    variant: 'translucent',
  },
})

interface WindowCardContentProps extends VariantProps<typeof getStyles> {
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

  const styles = getStyles({ variant })

  return (
    <Component
      className={styles.container({ className })}
      {...restProps}
    >
      {children}
    </Component>
  )
}

export default WindowCardContent
