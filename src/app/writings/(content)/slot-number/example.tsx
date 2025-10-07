'use client'
import { Playground } from '~/components/playground'
import SlotNumber from './slot-number'

const Example = () => (
  <Playground
    content={({ registerControl }) => {
      const [value] = registerControl('value', 12.3, {
        label: 'Value',
        step: 0.1,
      })
      const formatFunction = (value: number) =>
        value.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })

      const [isFormatted] = registerControl('isFormatted', false, {
        label: 'Format as currency',
      })

      return (
        <>
          {isFormatted && <p className="mb-2">Your balance</p>}
          <SlotNumber
            className="text-4xl leading-none font-semibold"
            formatFunction={isFormatted ? formatFunction : undefined}
          >
            {value}
          </SlotNumber>
        </>
      )
    }}
    sourceCodeLanguage="tsx"
    sourceCode={({ value, isFormatted }) => [
      `<SlotNumber formatFunction={${isFormatted ? '[Function]' : 'undefined'}}>`,
      `  {${value}}`,
      `</SlotNumber>`,
    ]}
  />
)

export default Example
