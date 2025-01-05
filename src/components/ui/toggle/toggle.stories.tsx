import type { Meta, StoryObj } from '@storybook/react'

import Toggle from './toggle'

const meta: Meta<typeof Toggle> = {
  title: 'UI/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  args: {
    label: 'Example label',
  },
}

export default meta
type Story = StoryObj<typeof Toggle>

export const Default: Story = {
  args: {},
}
export const Toggled: Story = {
  args: {
    defaultChecked: true,
  },
}

export const WithLongLabel: Story = {
  args: {
    label:
      'This is a very very very very very very very very very very very very very very very very very very long label for this toggle component',
  },
}
