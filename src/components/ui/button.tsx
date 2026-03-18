'use client'
import Link from 'next/link'
import { Icon } from 'react-feather'
import { createStyles, type StylesProps } from '~/utils/create-styles'

const buttonStyles = createStyles({
  slots: {
    container: 'inline-block transition-all',
    content: 'flex items-center whitespace-nowrap',
    icon: 'text-current',
    wrapper: '',
  },
  variants: {
    variant: {
      solid: {
        container:
          'relative bg-elevated hover:brightness-90 active:brightness-85 dark:hover:brightness-110 dark:active:brightness-115',
        wrapper: 'relative overflow-hidden text-main',
      },
      outline: {
        container:
          '-m-0.5 border-2 border-elevated text-main transition-colors outline-none',
      },
    },
    size: {
      sm: {
        container: 'rounded-3xl',
        content: 'gap-3 text-sm font-medium',
        icon: '-mx-1.5 size-3.5',
        wrapper: 'rounded-2xl px-6 py-2',
      },
      md: {
        container: 'rounded-3xl',
        content: 'gap-4 text-base font-medium',
        icon: '-mx-2 size-4',
        wrapper: 'rounded-3xl px-8 py-2.5',
      },
      lg: {
        container: 'rounded-[2rem]',
        content: 'gap-6 text-lg font-medium',
        icon: '-mx-3 size-5',
        wrapper: 'rounded-[2rem] px-10 py-3',
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

interface ButtonProps extends StylesProps<typeof buttonStyles> {
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

  const styles = buttonStyles({ variant, size, iconPosition })

  const LinkComponent = isExternal ? 'a' : Link
  const Component = href ? LinkComponent : 'button'

  return (
    <Component
      className={styles.container({ className })}
      href={href!}
      target={href && isExternal ? '_blank' : undefined}
      {...restProps}
    >
      <div className={styles.wrapper()}>
        <div className={styles.content()}>
          {label}
          {IconComponent && <IconComponent className={styles.icon()} />}
        </div>
      </div>
    </Component>
  )
}

export { Button, buttonStyles, type ButtonProps }
