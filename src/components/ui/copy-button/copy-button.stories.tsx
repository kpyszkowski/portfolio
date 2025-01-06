import type { Meta, StoryObj } from '@storybook/react'

import CopyButton from './copy-button'

const meta: Meta<typeof CopyButton> = {
  title: 'UI/CopyButton',
  component: CopyButton,
  tags: ['autodocs'],
  args: {
    children: 'CopyButton',
  },
}

export default meta
type Story = StoryObj<typeof CopyButton>

export const Default: Story = {
  args: {},
}
