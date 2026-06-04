import type { Meta, StoryObj } from '@storybook/nextjs'

import { Progress } from '~/components/ui/progress'

const meta: Meta<typeof Progress> = {
  title: 'UI/Progress',
  component: Progress,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: {
        type: 'range',
        min: 0,
        max: 100,
      },
    },
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'radio' },
    },
  },
  args: {
    value: 0,
    size: 'md',
  },
}

export default meta
type Story = StoryObj<typeof Progress>

export const Default: Story = {
  args: {},
}

export const WithCustomMax: Story = {
  argTypes: {
    value: {
      control: {
        type: 'range',
        min: 0,
        max: 2137,
      },
    },
  },
  args: {
    max: 2137,
  },
}
