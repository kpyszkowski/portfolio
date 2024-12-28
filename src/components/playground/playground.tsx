// @ts-nocheck TODO: Fix types
'use client'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { WindowCard } from '@/components/ui/window-card'
import cn from '@/utils/cn'
import { useRef, useState } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const getStyles = tv({
  slots: {
    container: 'overflow-hidden',
    contentWrapper: 'p-5',
    controlsWrapper:
      'grid grid-flow-col grid-cols-2 gap-x-8 gap-y-3 border-t border-neutral-700 bg-neutral-800 px-8 py-6',
  },
})

const getComponentByValue = (value: PlaygroundValue) => {
  switch (typeof value) {
    default:
    case 'string':
      return Input
    case 'number':
      return Slider
  }
}

type PlaygroundControlProps<V> = Omit<
  V extends string
    ? React.ComponentProps<typeof Input>
    : V extends number
      ? React.ComponentProps<typeof Slider>
      : never,
  'value' | 'onChange'
>

type PlaygroundValue = string | number
type PlaygroundRegistryEntry<V = PlaygroundValue> = [
  value: V,
  setter: (value: V) => void,
  props: PlaygroundControlProps<V>,
]
type PlaygroundControls = {
  [id: string]: PlaygroundValue
}
type PlaygroundRegistry<V = PlaygroundValue> = {
  [id: string]: PlaygroundRegistryEntry<V>
}

type PlaygroundRegisterFn = <V>(
  id: string,
  defaultValue: V,
  props?: PlaygroundControlProps<V>,
) => PlaygroundRegistryEntry<V>

type PlaygroundRenderProps = {
  registerControl: PlaygroundRegisterFn
}
interface PlaygroundProps extends VariantProps<typeof getStyles> {
  className?: string
  children: (props: PlaygroundRenderProps) => React.ReactNode
  title?: string
}

function Playground(props: PlaygroundProps) {
  const { className = '', children, ...restProps } = props

  const styles = getStyles()

  const [controls, setControls] = useState<PlaygroundControls>({})
  const registry = useRef<PlaygroundRegistry>({})

  const isControlRegistered = (id: string) => id in registry.current

  const registerControl: PlaygroundRegisterFn = <V extends PlaygroundValue>(
    id: string,
    defaultValue: V,
    props: PlaygroundControlProps<V> = {},
  ) => {
    if (isControlRegistered(id)) {
      const registryEntry = registry.current[id]
      return registryEntry
    }

    const registryEntry: PlaygroundRegistryEntry = [
      defaultValue,
      (latestValue) => {
        setControls((prev) => ({
          ...prev,
          [id]: latestValue,
        }))
        registry.current[id][0] = latestValue
      },
      props,
    ]

    setControls((prev) => ({ ...prev, [id]: defaultValue }))
    registry.current[id] = registryEntry
    return registryEntry
  }

  const handleValueChange = (id: string, value: PlaygroundValue) => {
    if (!isControlRegistered(id)) return

    const [, setValue] = registry.current[id]
    setValue(value)
  }

  return (
    <WindowCard className={cn(styles.container(), className)} {...restProps}>
      <div className={styles.contentWrapper()}>
        {children({ registerControl })}
      </div>

      <div className={styles.controlsWrapper()}>
        {Object.entries(controls).map(([id, value]) => {
          const [, , props] = registry.current[id]
          const isNumber = typeof value === 'number'
          const Component = getComponentByValue(value)
          return (
            <Component
              value={isNumber ? [value] : value}
              onValueChange={(value) =>
                handleValueChange(id, isNumber ? value[0] : value)
              }
              {...props}
            />
          )
        })}
      </div>
    </WindowCard>
  )
}

export default Playground
