'use client'
import { WindowCard } from '@/components/ui/window-card'
import cn from '@/utils/cn'
import { useState, useRef } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const getStyles = tv({
  slots: {
    container: 'overflow-hidden',
    contentWrapper: 'p-5',
    controlsWrapper:
      'grid grid-flow-col grid-cols-2 gap-x-5 gap-y-3 border-t border-neutral-700 bg-neutral-800 p-5',
  },
})

type PlaygroundValue = string | number
type PlaygroundRegistryEntry<V = PlaygroundValue> = [
  value: V,
  setter: (value: V) => void,
]
type PlaygroundControls = {
  [name: string]: PlaygroundValue
}
type PlaygroundRegistry<V = PlaygroundValue> = {
  [name: string]: PlaygroundRegistryEntry<V>
}

type PlaygroundRegisterFn = <V>(
  name: string,
  defaultValue: V,
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

  const isControlRegistered = (name: string) => name in registry.current

  // @ts-expect-error Dunno how to type this, generic are awkward 🤷🏻‍♂️
  const registerControl: PlaygroundRegisterFn = <V extends PlaygroundValue>(
    name: string,
    defaultValue: V,
  ) => {
    if (isControlRegistered(name)) {
      const registryEntry = registry.current[name]
      return registryEntry
    }

    const registryEntry: PlaygroundRegistryEntry = [
      defaultValue,
      (latestValue) => {
        setControls((prev) => ({
          ...prev,
          [name]: latestValue,
        }))
        registry.current[name][0] = latestValue
      },
    ]

    setControls((prev) => ({ ...prev, [name]: defaultValue }))
    registry.current[name] = registryEntry
    return registryEntry
  }

  const handleValueChange = (name: string, value: string) => {
    if (!isControlRegistered(name)) return

    const [, setValue] = registry.current[name]
    setValue(value)
  }

  return (
    <WindowCard className={cn(styles.container(), className)} {...restProps}>
      <div className={styles.contentWrapper()}>
        {children({ registerControl })}
      </div>

      <div className={styles.controlsWrapper()}>
        {Object.entries(controls).map(([name, value]) => (
          // TODO: Implement controls components such as Input, Range, Toggle etc.
          <label key={name}>
            <span>{name}</span>
            <input
              style={{ color: 'black' }}
              type="text"
              value={value as string}
              onChange={(e) => handleValueChange(name, e.target.value)}
            />
          </label>
        ))}
      </div>
    </WindowCard>
  )
}

export default Playground
