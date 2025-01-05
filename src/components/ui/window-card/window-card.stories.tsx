import type { Meta, StoryFn } from '@storybook/react'

import WindowCard from './window-card'

const meta: Meta<typeof WindowCard> = {
  title: 'UI/WindowCard',
  component: WindowCard,
  tags: ['autodocs'],
}

export default meta
type Story = StoryFn<typeof WindowCard>

export const Default: Story = (props) => (
  <WindowCard {...props}>
    <WindowCard.Content>
      <p>WindowCard.Content</p>
    </WindowCard.Content>
  </WindowCard>
)
