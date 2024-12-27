import React, { useRef, useState } from 'react'

type PlaygroundControl<S> = [S, (value: S) => void]

type PlaygroundControlRegisterFn = <S = unknown>(
  name: string,
  defaultValue: S,
) => PlaygroundControl<S>

type PlaygroundInjectedProps = {
  registerControl: PlaygroundControlRegisterFn
}

type PlaygroundValues = {
  [id: string]: unknown
}

type PlaygroundControls = {
  [id: string]: PlaygroundControl<unknown>
}

type PlaygroundProps = {
  children: React.ReactNode
  registry: PlaygroundValues
  onValueChange: (name: string, value: string) => void
}

const Playground = ({ children, registry, onValueChange }: PlaygroundProps) => {
  return (
    <div>
      {children}
      {Object.entries(registry).map(([name, value]) => (
        <label key={name}>
          <span>{name}</span>
          <input
            className="text-black"
            type="text"
            value={value as string}
            onChange={(e) => onValueChange(name, e.target.value)}
          />
        </label>
      ))}
    </div>
  )
}

const withPlayground =
  <P extends object>(
    Component: React.ComponentType<P & PlaygroundInjectedProps>,
  ) =>
  (props: P) => {
    const [values, setValues] = useState<PlaygroundValues>({})
    const controls = useRef<PlaygroundControls>({})

    const isControlRegistered = (name: string) => name in controls.current

    const setControl = (name: string, value: unknown) => {
      const control: PlaygroundControl<typeof value> = [
        value,
        (value: unknown) => {
          setValues((prev) => ({
            ...prev,
            [name]: value,
          }))
          controls.current[name][0] = value
        },
      ]

      controls.current[name] = control
      setValues((prev) => ({ ...prev, [name]: value }))
    }

    const getControl = (name: string) => {
      return controls.current[name]
    }

    const registerControl: PlaygroundControlRegisterFn = (
      name,
      defaultValue,
    ) => {
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
      <Playground registry={values} onValueChange={handleValueChange}>
        <Component registerControl={registerControl} {...props} />
      </Playground>
    )
  }

export default withPlayground
