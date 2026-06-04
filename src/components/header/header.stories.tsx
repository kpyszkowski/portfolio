import type { Meta, StoryObj } from '@storybook/nextjs'

import { Header } from '~/components/header'

const meta: Meta<typeof Header> = {
  title: 'Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof Header>

export const Default: Story = {
  args: {},
}
