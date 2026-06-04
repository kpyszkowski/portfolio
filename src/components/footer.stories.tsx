import type { Meta, StoryObj } from '@storybook/nextjs'

import { Footer } from '~/components/footer'

const meta: Meta<typeof Footer> = {
  title: 'Footer',
  component: Footer,
  tags: ['autodocs'],
  args: {},
}

export default meta
type Story = StoryObj<typeof Footer>

export const Default: Story = {
  args: {},
}
