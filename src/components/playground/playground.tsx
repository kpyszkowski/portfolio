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

type PlaygroundControl<S> = [S, (value: S) => void]

type PlaygroundControlRegisterFn = <S = unknown>(
  name: string,
  defaultValue: S,
) => PlaygroundControl<S>

type PlaygroundValues = Record<string, unknown>

type PlaygroundControls = Record<string, PlaygroundControl<unknown>>

type PlaygroundRenderProps = {
  registerControl: PlaygroundControlRegisterFn
}
interface PlaygroundProps extends VariantProps<typeof getStyles> {
  className?: string
  children: (props: PlaygroundRenderProps) => React.ReactNode
  title?: string
}

function Playground(props: PlaygroundProps) {
  const { className = '', children, ...restProps } = props

  const styles = getStyles()

  // Controls state stores the current value of each control to ensure the UI
  // is reactive
  const [controls, setControls] = useState<PlaygroundValues>({})
  // Controls ref stores the control value and setter function to update the
  // value
  const controlsRef = useRef<PlaygroundControls>({})

  const isControlRegistered = (name: string) => name in controlsRef.current

  const setControl = (name: string, value: unknown) => {
    const control: PlaygroundControl<typeof value> = [
      value,
      (value: unknown) => {
        setControls((prev) => ({
          ...prev,
          [name]: value,
        }))
        controlsRef.current[name][0] = value
      },
    ]

    controlsRef.current[name] = control
    setControls((prev) => ({ ...prev, [name]: value }))
  }

  const getControl = (name: string) => {
    return controlsRef.current[name]
  }

  const registerControl: PlaygroundControlRegisterFn = (name, defaultValue) => {
    if (!isControlRegistered(name)) {
      setControl(name, defaultValue)
    }

    return getControl(name) as PlaygroundControl<typeof defaultValue>
  }

  const handleValueChange = (name: string, value: string) => {
    if (!isControlRegistered(name)) return
    const [, setValue] = getControl(name)
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
