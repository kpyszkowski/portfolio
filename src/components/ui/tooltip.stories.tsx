import type { Meta, StoryObj } from '@storybook/nextjs'

import { Tooltip } from '~/components/ui/tooltip'

const meta: Meta<typeof Tooltip> = {
  title: 'UI/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      options: ['xs', 'sm', 'md'],
      control: {
        type: 'select',
      },
    },
    side: {
      options: ['top', 'right', 'bottom', 'left', 'inline-start', 'inline-end'],
      control: {
        type: 'select',
      },
    },
    defaultOpen: {
      control: {
        type: 'boolean',
      },
    },
  },
  args: {
    children: 'Tooltip trigger',
    label: 'Tooltip content',
    defaultOpen: true,
    side: 'top',
    size: 'md',
  },
}

export default meta
type Story = StoryObj<typeof Tooltip>

export const Default: Story = {}
