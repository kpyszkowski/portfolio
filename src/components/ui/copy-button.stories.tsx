import type { Meta, StoryObj } from '@storybook/nextjs'

import { CopyButton } from '~/components/ui/copy-button'

const meta: Meta<typeof CopyButton> = {
  title: 'UI/CopyButton',
  component: CopyButton,
  tags: ['autodocs'],
  args: {
    children: 'CopyButton',
  },
}

export default meta
type Story = StoryObj<typeof CopyButton>

export const Default: Story = {
  args: {},
}
