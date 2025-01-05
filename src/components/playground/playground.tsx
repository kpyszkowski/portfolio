'use client'
import { HighlightedCode } from '@/components/ui/highlighted-code'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Toggle } from '@/components/ui/toggle'
import { WindowCard } from '@/components/ui/window-card'
import cn from '@/utils/cn'
import { useRef, useState } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const getStyles = tv({
  slots: {
    container: 'overflow-hidden',
    contentWrapper: 'p-5',
    controlsWrapper: 'grid grid-flow-row gap-8 px-8 py-6 md:grid-cols-2',
    sourceCodeWrapper: 'py-4',
  },
})

const getControlComponent = (
  id: string,
  value: PlaygroundValue,
  handler: (id: string, value: PlaygroundValue) => void,
): [React.ComponentType<never>, unknown] => {
  switch (typeof value) {
    default:
    case 'string':
      return [
        Input,
        {
          value,
          onValueChange: (newValue: string) => handler(id, newValue),
        },
      ]
    case 'number':
      return [
        Slider,
        {
          value: [value],
          onValueChange: ([newValue]: number[]) => handler(id, newValue),
        },
      ]
    case 'boolean':
      return [
        Toggle,
        {
          checked: value,
          onCheckedChange: (newValue: boolean) => handler(id, newValue),
        },
      ]
  }
}

type PlaygroundControlProps<V> = Omit<
  V extends string
    ? React.ComponentProps<typeof Input>
    : V extends number
      ? React.ComponentProps<typeof Slider>
      : V extends boolean
        ? React.ComponentProps<typeof Toggle>
        : never,
  'value' | 'onChange' | 'onValueChange' | 'checked' | 'onCheckedChange'
>

type PlaygroundValue = string | number | boolean
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
  content: (props: PlaygroundRenderProps) => React.ReactNode
  title?: string
  sourceCode?: (controls: PlaygroundControls) => string[]
}

function Playground(props: PlaygroundProps) {
  const { className = '', content, sourceCode, ...restProps } = props

  const styles = getStyles()

  const [controls, setControls] = useState<PlaygroundControls>({})
  const registry = useRef<PlaygroundRegistry>({})

  const isControlRegistered = (id: string) => id in registry.current

  // @ts-expect-error TODO: Fix typings
  const registerControl: PlaygroundRegisterFn = <V extends PlaygroundValue>(
    id: string,
    defaultValue: V,
    // @ts-expect-error TODO: Fix typings
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
      <WindowCard.Content className={styles.contentWrapper()}>
        {content({ registerControl })}
      </WindowCard.Content>

      <WindowCard.Content variant="solid" className={styles.controlsWrapper()}>
        {Object.entries(controls).map(([id, value]) => {
          const [, , props] = registry.current[id]

          const [Component, controlProps] = getControlComponent(
            id,
            value,
            handleValueChange,
          )
          // @ts-expect-error TODO: Fix typings
          return <Component key={id} {...controlProps} {...props} />
        })}
      </WindowCard.Content>

      {sourceCode && (
        <WindowCard.Content as="pre" className={styles.sourceCodeWrapper()}>
          <HighlightedCode language="tsx">
            {sourceCode(controls).join('\n')}
          </HighlightedCode>
        </WindowCard.Content>
      )}
    </WindowCard>
  )
}

export default Playground
