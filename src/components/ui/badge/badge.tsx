import { forwardRef } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const getStyles = tv({
  slots: {
    container:
      'bg-opacity-10 neumorphism dark:bg-opacity-25 inline-block rounded-2xl px-4 py-0.5 text-xs whitespace-nowrap backdrop-blur-sm sm:py-1',
  },
  variants: {
    color: {
      neutral: {
        container: 'bg-tertiary text-secondary',
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
