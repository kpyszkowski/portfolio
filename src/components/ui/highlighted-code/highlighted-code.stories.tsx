import type { Meta, StoryObj } from '@storybook/nextjs'

import { HighlightedCode } from '~/components/ui/highlighted-code/highlighted-code'

const meta: Meta<typeof HighlightedCode> = {
  title: 'UI/HighlightedCode',
  component: HighlightedCode,
  tags: ['autodocs'],
  args: {
    children: 'let banana = "🍌"',
    language: 'ts',
  },
}

export default meta
type Story = StoryObj<typeof HighlightedCode>

export const Default: Story = {
  args: {},
}
