import cn from '@/utils/cn'
import { tv, type VariantProps } from 'tailwind-variants'

const getStyles = tv({
  slots: {
    container:
      'neumorphism inline-block rounded-2xl px-3 py-0.5 font-sans text-xs backdrop-blur-sm backdrop-brightness-90 backdrop-contrast-125 sm:py-1',
  },
  variants: {
    color: {
      neutral: {
        container: 'bg-neutral-400/25 text-neutral-200',
      },
      green: {
        container: 'bg-green-400/25 text-green-200',
      },
      yellow: {
        container: 'bg-yellow-400/25 text-yellow-200',
      },
      red: {
        container: 'bg-red-400/25 text-red-200',
      },
      blue: {
        container: 'bg-blue-400/25 text-blue-200',
      },
    },
  },
  defaultVariants: {
    color: 'neutral',
  },
})

interface BadgeProps extends VariantProps<typeof getStyles> {
  className?: string
  children: string
}

function Badge(props: BadgeProps) {
  const { className = '', children, color, ...restProps } = props

  const styles = getStyles({ color })

  return (
    <div className={cn(className, styles.container())} {...restProps}>
      {children}
    </div>
  )
}

export default Badge
