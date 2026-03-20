'use client'
import { forwardRef, isValidElement, type ReactNode } from 'react'
import { Button as ButtonPrimitive } from '@base-ui-components/react/button'
import { type Icon } from 'react-feather'
import { createStyles, type StylesProps } from '~/utils/create-styles'
import { isMotionComponent, motion } from 'motion/react'

const buttonStyles = createStyles({
  slots: {
    container: 'inline-block',
    content: 'flex items-center whitespace-nowrap',
    icon: 'text-current',
    wrapper: 'relative',
  },
  variants: {
    variant: {
      solid: {
        container:
          'relative bg-elevated transition-[filter] hover:brightness-90 active:brightness-85 dark:hover:brightness-110 dark:active:brightness-115',
        wrapper: 'overflow-hidden text-main',
      },
      outline: {
        container:
          '-m-0.5 border-2 border-highlight text-main transition-colors outline-none',
      },
      ghost: {
        container:
          'text-main transition-[background-color] outline-none hover:bg-elevated active:bg-elevated',
      },
      unstyled: {
        container: 'inline',
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
    {
      variant: 'unstyled',
      size: 'sm',
      class: {
        container: 'rounded-none',
        wrapper: 'inline rounded-none p-0',
        content: 'inline-flex items-baseline',
        icon: 'mx-0',
      },
    },
    {
      variant: 'unstyled',
      size: 'md',
      class: {
        container: 'rounded-none',
        wrapper: 'inline rounded-none p-0',
        content: 'inline-flex items-baseline',
        icon: 'mx-0',
      },
    },
    {
      variant: 'unstyled',
      size: 'lg',
      class: {
        container: 'rounded-none',
        wrapper: 'inline rounded-none p-0',
        content: 'inline-flex items-baseline',
        icon: 'mx-0',
      },
    },
  ],
  defaultVariants: {
    variant: 'outline',
    size: 'md',
    iconPosition: 'left',
  },
})

type ButtonProps = Omit<ButtonPrimitive.Props, 'nativeButton'> &
  StylesProps<typeof buttonStyles> & {
    children: ReactNode
    icon?: Icon
    nativeButton?: boolean
  }

const Button = forwardRef<HTMLElement, ButtonProps>((props, ref) => {
  const {
    className = '',
    variant,
    icon: Icon,
    size,
    iconPosition,
    children: label,
    render,
    ...restProps
  } = props

  const styles = buttonStyles({ variant, size, iconPosition })

  const renderType = render && isValidElement(render) ? render.type : null
  const nativeButton =
    !renderType ||
    renderType === 'button' ||
    (typeof renderType !== 'string' && isMotionComponent(renderType))

  return (
    <ButtonPrimitive
      ref={ref}
      render={render}
      nativeButton={nativeButton}
      className={
        typeof className === 'function'
          ? (state) => styles.container({ className: className(state) })
          : styles.container({ className })
      }
      {...restProps}
    >
      <div className={styles.wrapper()}>
        <div className={styles.content()}>
          {label}
          {Icon && (
            <motion.span layout>
              <Icon className={styles.icon()} />
            </motion.span>
          )}
        </div>
      </div>
    </ButtonPrimitive>
  )
})
Button.displayName = 'Button'

export { Button, buttonStyles, type ButtonProps }
