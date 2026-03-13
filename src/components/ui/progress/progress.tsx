import { Progress as ProgressPrimititve } from '@base-ui-components/react/progress'
import { isMotionValue, motion, MotionValue, useTransform } from 'motion/react'
import { tv, type VariantProps } from 'tailwind-variants'
import cn from '~/utils/cn'

const getStyles = tv({
  slots: {
    container: 'size-10 rotate-90',
    indicator: 'fill-none',
    indicatorForeground: 'stroke-orange-300',
    indicatorBackground: 'stroke-tertiary/25',
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
    Pick<ProgressPrimititve.Root.Props, 'getAriaValueText' | 'max'> {
  className?: string
  value?: number | MotionValue<number> | null
  transition?: Record<string, unknown>
}

const PROGRESS_PATH_LENGTH = 88

// TODO: Fix aria attributes - use of MotionValue makes it difficult to reflect in DOM

function Progress(props: ProgressProps) {
  const { className = '', value, size, max = 100, ...restProps } = props

  const styles = getStyles({ size })

  const strokeDashoffset = useTransform(
    isMotionValue(value) ? value : new MotionValue(),
    [0, max],
    [PROGRESS_PATH_LENGTH, 0],
  )

  const unwrappedValue = isMotionValue(value) ? value.get() : value

  return (
    <ProgressPrimititve.Root
      className={styles.container({ className })}
      max={max}
      value={unwrappedValue}
      render={<svg viewBox="0 0 32 32" />}
      {...restProps}
    >
      <circle
        className={cn(styles.indicator(), styles.indicatorBackground())}
        strokeWidth="2"
        cx="16"
        cy="16"
        r="14"
      />

      <ProgressPrimititve.Indicator
        className={cn(styles.indicator(), styles.indicatorForeground())}
        render={
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
        }
      />
    </ProgressPrimititve.Root>
  )
}

export default Progress
