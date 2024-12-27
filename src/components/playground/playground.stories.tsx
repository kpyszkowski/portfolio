import type { Meta, StoryFn, StoryObj } from '@storybook/react'

import Playground from './playground'
import withPlayground from './with-playground'

const meta: Meta<typeof Playground> = {
  title: 'Playground',
  component: Playground,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Playground>

export const Default: Story = {
  args: {},
}

export const WithHOC: StoryFn = () => {
  const ComponentWithPlayground = withPlayground(
    ({ registerControl, ...restProps }) => {
      const [text, setText] = registerControl('text', 21)

      return (
        <div {...restProps}>
          <p>{text}</p>
          <button
            onClick={() => {
              setText(2137)
            }}
          >
            Set sample text
          </button>
        </div>
      )
    },
  )

  return <ComponentWithPlayground />
}
