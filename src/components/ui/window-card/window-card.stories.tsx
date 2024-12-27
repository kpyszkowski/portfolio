import type { Meta, StoryObj } from '@storybook/react'

import WindowCard from './window-card'

const meta: Meta<typeof WindowCard> = {
  title: 'UI/WindowCard',
  component: WindowCard,
  tags: ['autodocs'],
  args: {
    children: 'WindowCard',
  },
}

export default meta
type Story = StoryObj<typeof WindowCard>

export const Default: Story = {
  args: {},
}