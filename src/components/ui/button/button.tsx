import cn from '@/utils/cn'
import dynamic from 'next/dynamic'
import { Icon } from 'react-feather'
import { tv, type VariantProps } from 'tailwind-variants'

const getStyles = tv({
  slots: {
    container: '',
    content: 'flex items-center whitespace-nowrap',
    icon: 'text-current',
  },
  variants: {
    variant: {
      solid: {},
      outline: {},
    },
    size: {
      sm: {
        content: 'gap-2',
        icon: '-mx-1 size-3.5',
      },
      md: {
        content: 'gap-3',
        icon: '-mx-1.5 size-4',
      },
      lg: {
        content: 'gap-4',
        icon: '-mx-2 size-5',
      },
    },
    iconPosition: {
      left: {
        content: 'flex-row-reverse',
        icon: 'ml-0',
      },
      right: {
        content: 'flex-row',
        icon: 'mr-0',
      },
    },
  },
  defaultVariants: {
    variant: 'outline',
    size: 'md',
    iconPosition: 'left',
  },
})

export interface ButtonProps extends VariantProps<typeof getStyles> {
  className?: string
  children: string
  icon?: Icon
}

function Button(props: ButtonProps) {
  const {
    className = '',
    variant,
    icon: IconComponent,
    size,
    iconPosition,
    children: label,
    ...restProps
  } = props

  const styles = getStyles({ variant, size, iconPosition })

  const children = (
    <div className={styles.content()}>
      {label}
      {IconComponent && <IconComponent className={styles.icon()} />}
    </div>
  )

  if (variant === 'solid') {
    const ButtonSolid = dynamic(() =>
      import('./button-solid').then((mod) => mod.default),
    )

    return (
      <ButtonSolid className={className} size={size} {...restProps}>
        {children}
      </ButtonSolid>
    )
  }

  return (
    <button className={cn(className, styles.container())} {...restProps}>
      {children}
    </button>
  )
}

export default Button
