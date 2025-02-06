import * as ProgressPrimititve from '@radix-ui/react-progress'
import {
  isMotionValue,
  motion,
  MotionValue,
  useMotionValue,
  useTransform,
} from 'motion/react'
import { useEffect } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'
import cn from '~/utils/cn'

const getStyles = tv({
  slots: {
    container: 'size-10 rotate-90',
    indicator: 'fill-none',
    indicatorForeground: 'stroke-orange-300',
    indicatorBackground: 'stroke-neutral-600',
  },
  variants: {
    size: {
      sm: {
        container: 'size-6',
        indicator: 'stroke-[0.25rem]',
      },
      md: {
        container: 'size-10',
        indicator: 'stroke-2',
      },
      lg: {
        container: 'size-16',
        indicator: 'stroke-2',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

interface ProgressProps
  extends VariantProps<typeof getStyles>,
    Pick<ProgressPrimititve.ProgressProps, 'getValueLabel' | 'max'> {
  className?: string
  value?: number | MotionValue<number> | null
  transition?: Record<string, unknown>
}

const PROGRESS_PATH_LENGTH = 88

function Progress(props: ProgressProps) {
  const { className = '', value, size, max = 100, ...restProps } = props

  const styles = getStyles({ size })

  const motionValue = useMotionValue(0)
  useEffect(() => {
    if (typeof value === 'number') motionValue.set(value ?? 0)
  }, [motionValue, value])

  const strokeDashoffset = useTransform(
    isMotionValue(value) ? value : motionValue,
    [0, max],
    [PROGRESS_PATH_LENGTH, 0],
  )

  return (
    <ProgressPrimititve.Root
      className={cn(className, styles.container())}
      asChild
      max={max}
      {...restProps}
    >
      <svg viewBox="0 0 32 32">
        <circle
          className={cn(styles.indicator(), styles.indicatorBackground())}
          strokeWidth="2"
          cx="16"
          cy="16"
          r="14"
        />

        <ProgressPrimititve.Indicator
          className={cn(styles.indicator(), styles.indicatorForeground())}
          asChild
        >
          <motion.circle
            strokeWidth="2"
            cx="16"
            cy="16"
            r="14"
            strokeDasharray={PROGRESS_PATH_LENGTH}
            style={{
              strokeDashoffset,
            }}
          />
        </ProgressPrimititve.Indicator>
      </svg>
    </ProgressPrimititve.Root>
  )
}

export default Progress
