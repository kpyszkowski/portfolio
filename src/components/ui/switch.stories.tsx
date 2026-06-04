import type { Meta, StoryObj } from '@storybook/nextjs'

import { Switch } from '~/components/ui/switch'

const meta: Meta<typeof Switch> = {
  title: 'UI/Switch',
  component: Switch,
  tags: ['autodocs'],
  args: {
    label: 'Example label',
  },
}

export default meta
type Story = StoryObj<typeof Switch>

export const Default: Story = {
  args: {},
}
export const Switched: Story = {
  args: {
    defaultChecked: true,
  },
}

export const WithLongLabel: Story = {
  args: {
    label:
      'This is a very very very very very very very very very very very very very very very very very very long label for this Switch component',
  },
}
