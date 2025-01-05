'use client'
import { Badge } from '@/components/ui/badge'
import cn from '@/utils/cn'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { useCallback, useState } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const getStyles = tv({
  slots: {
    container: 'flex flex-col gap-3',
    sliderRoot: 'relative flex items-center',
    label: 'block text-sm text-neutral-50',
    track: 'relative flex-grow overflow-hidden rounded bg-neutral-50/25',
    range: 'absolute bg-neutral-50',
    thumb: [
      'relative block size-4 rounded-full bg-neutral-50 transition-shadow',
      'outline-none ring-neutral-50/50 focus-visible:ring-4',
      'shadow-[0_0_4px] shadow-neutral-600',
    ],
    valueLabelsWrapper: 'text-xs text-neutral-400',
    valueLabel: '',
    valuesWrapper: 'flex justify-between',
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

type SliderValue = [number] | [number, number]
interface SliderProps
  extends VariantProps<typeof getStyles>,
    SliderPrimitive.SliderProps {
  className?: string
  label?: string
  defaultValue?: SliderValue
  valueLabel?: [string] | [string, string]
}

function Slider(props: SliderProps) {
  const {
    className = '',
    label,
    defaultValue = [0],
    valueLabel,
    orientation = 'horizontal',
    onValueChange,
    ...restProps
  } = props

  const [_value, _setValue] = useState(defaultValue)

  const styles = getStyles({ orientation })

  const isDualRangeMode =
    Array.isArray(defaultValue) && defaultValue.length === 2

  const [minValueLabel, maxValueLabel] = valueLabel || []

  const handleValueChange = useCallback(
    (value: SliderValue) => {
      _setValue(value)
      if (onValueChange) onValueChange(value)
    },
    [onValueChange],
  )

  // TODO: Adapt to dual range mode and vertical orientation
  const showValue = !isDualRangeMode && orientation === 'horizontal'

  return (
    <div className={styles.container()}>
      <div className={styles.valuesWrapper()}>
        {label && <span className={styles.label()}>{label}</span>}

        {showValue && <Badge className={styles.value()}>{_value}</Badge>}
      </div>

      <SliderPrimitive.Root
        className={cn(styles.sliderRoot(), className)}
        defaultValue={defaultValue}
        minStepsBetweenThumbs={isDualRangeMode ? 1 : undefined}
        orientation={orientation}
        value={_value}
        onValueChange={handleValueChange}
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
