import type { Meta, StoryObj } from '@storybook/react'

import Callout from './callout'

const meta: Meta<typeof Callout> = {
  title: 'UI/Callout',
  component: Callout,
  tags: ['autodocs'],
  args: {
    children: 'Callout',
  },
}

export default meta
type Story = StoryObj<typeof Callout>

export const Default: Story = {
  args: {},
}
