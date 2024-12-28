import cn from '@/utils/cn'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Icon } from 'react-feather'
import { tv, type VariantProps } from 'tailwind-variants'

const getStyles = tv({
  slots: {
    container: 'inline-block',
    content: 'flex items-center whitespace-nowrap',
    icon: 'text-current',
  },
  variants: {
    variant: {
      solid: {},
      outline: {
        container:
          '-m-0.5 border-2 border-neutral-500 text-neutral-50 outline-none transition-colors hover:border-neutral-400 focus-visible:border-neutral-400 active:border-neutral-200',
      },
    },
    size: {
      sm: {
        container: 'rounded-3xl px-6 py-2',
        content: 'gap-3 font-sans text-sm font-medium',
        icon: '-mx-1.5 size-3.5',
      },
      md: {
        container: 'rounded-3xl px-8 py-2.5', // 18px
        content: 'gap-4 font-sans text-base font-medium',
        icon: '-mx-2 size-4',
      },
      lg: {
        container: 'rounded-[2rem] px-10 py-3', // 32px
        content: 'gap-6 font-sans text-lg font-medium',
        icon: '-mx-3 size-5',
      },
    },
    iconPosition: {
      left: {
        content: 'flex-row-reverse',
        icon: 'mr-0',
      },
      right: {
        content: 'flex-row',
        icon: 'ml-0',
      },
    },
  },
  compoundVariants: [
    {
      variant: 'solid',
      size: ['sm', 'md', 'lg'],
      class: {
        container: 'rounded-none p-0',
      },
    },
    {
      variant: 'solid',
      size: 'md',
      class: {
        container: 'bg-primary-500 text-neutral-50',
      },
    },
    {
      variant: 'solid',
      size: 'lg',
      class: {
        container: 'bg-primary-500 text-neutral-50',
      },
    },
    {
      variant: 'outline',
      size: 'sm',
      class: {
        container: '-m-px border',
      },
    },
  ],
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
  href?: string
  isExternal?: boolean
  onClick?: React.MouseEventHandler
}

function Button(props: ButtonProps) {
  const {
    className = '',
    variant,
    icon: IconComponent,
    size,
    iconPosition,
    children: label,
    href,
    isExternal,
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
      <ButtonSolid
        className={className}
        size={size}
        href={href}
        isExternal={isExternal}
        {...restProps}
      >
        {children}
      </ButtonSolid>
    )
  }

  const LinkComponent = isExternal ? 'a' : Link
  const Component = href ? LinkComponent : 'button'

  return (
    <Component
      className={cn(className, styles.container())}
      href={href!} // `href` is defined
      target={href && isExternal ? '_blank' : undefined}
      {...restProps}
    >
      {children}
    </Component>
  )
}

export default Button
