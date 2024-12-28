import type { Meta, StoryFn, StoryObj } from '@storybook/react'

import Playground from './playground'
import { Button } from '@/components/ui/button'

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
  <Playground {...props}>
    {({ registerControl }) => {
      const [text, setText] = registerControl('text', 'Example text')
      const [number, setNumber] = registerControl('number', 1234)

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
  </Playground>
)
