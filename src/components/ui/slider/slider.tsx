import cn from '@/utils/cn'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { tv, type VariantProps } from 'tailwind-variants'

// TODO: Disable outline and style custom ring

const getStyles = tv({
  slots: {
    container: 'flex flex-col gap-3',
    sliderRoot: 'relative flex items-center',
    label: 'block text-sm text-neutral-50',
    track: 'relative flex-grow overflow-hidden rounded bg-neutral-50/25',
    range: 'absolute bg-neutral-50',
    thumb:
      'relative block size-4 rounded-full bg-neutral-50 shadow-[0_0_4px] shadow-neutral-600',
    valueLabelsWrapper: 'text-xs text-neutral-400',
    valueLabel: '',
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
        track: 'h-1 w-full',
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
    SliderPrimitive.SliderProps {
  className?: string
  label?: string
  defaultValue?: [number] | [number, number]
  valueLabel?: [string] | [string, string]
}

function Slider(props: SliderProps) {
  const {
    className = '',
    label,
    defaultValue,
    valueLabel,
    orientation,
    ...restProps
  } = props

  const styles = getStyles({ orientation })

  const isDualRangeMode =
    Array.isArray(defaultValue) && defaultValue.length === 2

  const [minValueLabel, maxValueLabel] = valueLabel || []

  return (
    <div className={styles.container()}>
      {label && <span className={styles.label()}>{label}</span>}

      <SliderPrimitive.Root
        className={cn(styles.sliderRoot(), className)}
        defaultValue={defaultValue}
        minStepsBetweenThumbs={isDualRangeMode ? 1 : undefined}
        orientation={orientation}
        {...restProps}
      >
        <SliderPrimitive.Track className={styles.track()}>
          <SliderPrimitive.Range className={styles.range()} />
        </SliderPrimitive.Track>

        <SliderPrimitive.Thumb className={styles.thumb()} />
        {isDualRangeMode && (
          <SliderPrimitive.Thumb className={styles.thumb()} />
        )}
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
