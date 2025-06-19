'use client'
import { Slider as SliderPrimitive } from '@base-ui-components/react/slider'
import { tv, type VariantProps } from 'tailwind-variants'
import { Badge } from '~/components/ui/badge'

const getStyles = tv({
  slots: {
    container: 'flex touch-none select-none flex-col',
    sliderRoot: 'relative flex cursor-grab flex-wrap items-center py-3',
    label: 'block text-sm text-neutral-950 dark:text-neutral-50',
    track: 'relative rounded bg-neutral-300 dark:bg-neutral-50/25',
    range: 'absolute bg-orange-300',
    control: 'w-full py-5',
    thumb: [
      'relative block size-4 rounded-full bg-neutral-50 transition-shadow',
      'outline-none ring-neutral-50/50 focus-visible:ring-4',
      'shadow-[0_0_4px] shadow-neutral-600',
    ],
    valueLabelsWrapper: 'text-xs text-neutral-600 dark:text-neutral-400',
    valueLabel: '',
    valuesWrapper: 'flex flex-1 justify-between',
    value: 'ml-auto min-w-12 px-2 text-center',
  },
  variants: {
    orientation: {
      vertical: {
        container: 'w-max items-center',
        label: 'order-last text-center',
        sliderRoot: 'order-2 h-32 w-5 flex-col',
        track: 'h-full w-1',
        range: 'w-full',
        valueLabelsWrapper: 'contents',
        valueLabel: 'odd:order-2 even:order-1',
      },
      horizontal: {
        sliderRoot: 'flex-row',
        label: 'mb-1',
        track: 'w-full',
        range: 'h-full',
        valueLabelsWrapper: 'flex w-full justify-between',
      },
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
})

interface SliderProps
  extends VariantProps<typeof getStyles>,
    SliderPrimitive.Root.Props {
  className?: string
  label?: string
  valueLabel?: [string] | [string, string]
}

function Slider(props: SliderProps) {
  const {
    className = '',
    label,
    value,
    valueLabel,
    orientation = 'horizontal',
    ...restProps
  } = props

  const styles = getStyles({ orientation })

  const isDualRangeMode = Array.isArray(value) && value.length === 2

  const [minValueLabel, maxValueLabel] = valueLabel || []

  // TODO: Adapt to dual range mode and vertical orientation
  const showValue = !isDualRangeMode && orientation === 'horizontal'

  return (
    <div className={styles.container()}>
      <SliderPrimitive.Root
        className={styles.sliderRoot({ className })}
        value={value}
        minStepsBetweenValues={isDualRangeMode ? 1 : undefined}
        orientation={orientation}
        {...restProps}
      >
        <div className={styles.valuesWrapper()}>
          {label && <span className={styles.label()}>{label}</span>}

          {showValue && (
            <Badge className={styles.value()}>
              <SliderPrimitive.Value />
            </Badge>
          )}
        </div>

        <SliderPrimitive.Control className={styles.control()}>
          <SliderPrimitive.Track className={styles.track()}>
            <SliderPrimitive.Indicator className={styles.range()} />
            <SliderPrimitive.Thumb className={styles.thumb()} />
          </SliderPrimitive.Track>
        </SliderPrimitive.Control>
      </SliderPrimitive.Root>

      {valueLabel && (
        <div className={styles.valueLabelsWrapper()}>
          {minValueLabel && (
            <span className={styles.valueLabel()}>{minValueLabel}</span>
          )}
          {maxValueLabel && (
            <span className={styles.valueLabel()}>{maxValueLabel}</span>
          )}
        </div>
      )}
    </div>
  )
}

export default Slider
