import type { Meta, StoryObj } from '@storybook/react'

import Callout from '~/components/ui/callout/callout'

const meta: Meta<typeof Callout> = {
  title: 'UI/Callout',
  component: Callout,
  tags: ['autodocs'],
  args: {
    children: <p>Lorem ipsum dolor sit amet</p>,
  },
  decorators: [
    (Story) => (
      <div
        style={{
          paddingInline: '2rem',
        }}
      >
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Callout>

export const Default: Story = {
  args: {},
}
