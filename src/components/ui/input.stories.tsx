import type { Meta, StoryObj } from '@storybook/nextjs'

import { Input } from '~/components/ui/input'

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  args: {},
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    label: 'Input',
    onValueChange: (value) => console.log(`Value has changed to: ${value}`),
  },
}

export const WithPlaceholder: Story = {
  args: {
    label: 'Input with placeholder',
    placeholder: 'Placeholder',
  },
}

export const WithHelpNote: Story = {
  args: {
    label: 'Input with help note',
    helpNote: 'Help note',
  },
}

export const WithClearButton: Story = {
  args: {
    label: 'Input with clear button',
    withClearButton: true,
  },
}
