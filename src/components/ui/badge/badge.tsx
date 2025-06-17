import { forwardRef } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const getStyles = tv({
  slots: {
    container:
      'inline-block whitespace-nowrap rounded-2xl bg-opacity-10 px-4 py-0.5 font-sans text-xs backdrop-blur-sm neumorphism dark:bg-opacity-25 sm:py-1',
  },
  variants: {
    color: {
      neutral: {
        container:
          'bg-neutral-500 text-neutral-600 dark:bg-neutral-500 dark:text-neutral-200',
      },
      green: {
        container: 'bg-green-500 text-green-200',
      },
      yellow: {
        container: 'bg-yellow-500 text-yellow-200',
      },
      red: {
        container: 'bg-red-500 text-red-200',
      },
      blue: {
        container: 'bg-blue-500 text-blue-200',
      },
    },
  },
  defaultVariants: {
    color: 'neutral',
  },
})

interface BadgeProps extends VariantProps<typeof getStyles> {
  className?: string
  children: React.ReactNode
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>((props, ref) => {
  const { className = '', children, color, ...restProps } = props

  const styles = getStyles({ color })

  return (
    <div
      className={styles.container({ className })}
      ref={ref}
      {...restProps}
    >
      {children}
    </div>
  )
})

Badge.displayName = 'Badge'

export default Badge
