import type { Meta, StoryFn } from '@storybook/react'

import { Button } from '~/components/ui/button'
import { Playground } from '~/components/playground'

const meta: Meta<typeof Playground> = {
  title: 'Playground',
  component: Playground,
  tags: ['autodocs'],
  args: {
    title: 'Example of interactive playground',
  },
}

export default meta
type Story = StoryFn<typeof Playground>

export const Default: Story = (props) => (
  <Playground
    {...props}
    sourceCode={({ text, number }) => [
      '<>',
      ` <p>${text}</p>`,
      ` <p>${number}</p>`,
      '</>',
    ]}
    content={({ registerControl }) => {
      const [text, setText] = registerControl('text', 'Example text', {
        label: 'Sample Text',
      })
      const [number, setNumber] = registerControl('number', 1234, {
        label: 'Sample Number',
      })

      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '1rem',
          }}
        >
          <p>
            The following values can be controlled not only with controls given
            below but also by itself with buttons. The state is shared.
          </p>

          <p>{text}</p>
          <p>{number}</p>

          <Button
            size="sm"
            onClick={() => {
              setText('It was set with button')
            }}
          >
            Set sample text
          </Button>

          <Button
            size="sm"
            onClick={() => {
              setNumber(2137)
              setText('🙈')
            }}
          >
            Set sample number
          </Button>
        </div>
      )
    }}
  />
)
