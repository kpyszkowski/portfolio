import cn from '@/utils/cn'
import { tv, type VariantProps } from 'tailwind-variants'

const getStyles = tv({
  slots: {
    container: 'not-prose overflow-hidden',
  },
  variants: {
    variant: {
      translucent: {
        container: 'bg-neutral-800/[0.32]',
      },
      solid: {
        container: 'bg-neutral-800',
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
    <Component className={cn(styles.container(), className)} {...restProps}>
      {children}
    </Component>
  )
}

export default WindowCardContent
