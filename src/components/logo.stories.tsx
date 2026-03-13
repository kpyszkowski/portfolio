import type { Meta, StoryObj } from '@storybook/react'

import { Logo } from '~/components/logo'

const meta: Meta<typeof Logo> = {
  title: 'Logo',
  component: Logo,
  tags: ['autodocs'],
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'radio' },
    },
  },
}

export default meta
type Story = StoryObj<typeof Logo>

export const Default: Story = {
  args: {},
}
