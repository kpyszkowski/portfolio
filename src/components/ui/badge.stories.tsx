import type { Meta, StoryObj } from '@storybook/nextjs'

import { Badge } from '~/components/ui/badge'

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    color: {
      options: ['green', 'yellow', 'red', 'blue', 'neutral'],
      control: { type: 'radio' },
    },
  },
  args: {
    children: 'Badge',
  },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {
  args: {},
}
