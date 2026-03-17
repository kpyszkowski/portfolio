import { forwardRef } from 'react'
import { createStyles, type StylesProps } from '~/utils/create-styles'

const badgeStyles = createStyles({
  slots: {
    container:
      'bg-opacity-10 dark:bg-opacity-25 inline-block rounded-2xl px-4 py-0.5 text-xs whitespace-nowrap neumorphism backdrop-blur-sm sm:py-1',
  },
  variants: {
    color: {
      neutral: {
        container: 'bg-elevated text-elevated',
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

interface BadgeProps extends StylesProps<typeof badgeStyles> {
  className?: string
  children: React.ReactNode
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>((props, ref) => {
  const { className = '', children, color, ...restProps } = props

  const styles = badgeStyles({ color })

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

export { Badge, badgeStyles, type BadgeProps }
