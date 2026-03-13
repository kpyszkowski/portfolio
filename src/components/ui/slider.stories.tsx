import type { Meta, StoryObj } from '@storybook/react'

import { Slider } from '~/components/ui/slider'

const meta: Meta<typeof Slider> = {
  title: 'UI/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      options: ['horizontal', 'vertical'],
      control: {
        type: 'select',
      },
    },
  },
  args: {
    children: 'Slider',
    orientation: 'horizontal',
  },
}

export default meta
type Story = StoryObj<typeof Slider>

export const Default: Story = {
  args: {},
}

export const WithLabel: Story = {
  args: {
    label: 'Slider label',
  },
}

export const DualRangeMode: Story = {
  args: {
    defaultValue: [20, 80],
  },
}

export const WithValueLabels: Story = {
  args: {
    defaultValue: [20, 80],
    valueLabel: ['Min value', 'Max value'],
  },
}
