import type { Meta, StoryObj } from '@storybook/react'

import HighlightedCode from './highlighted-code'

const meta: Meta<typeof HighlightedCode> = {
  title: 'UI/HighlightedCode',
  component: HighlightedCode,
  tags: ['autodocs'],
  args: {
    children: 'let banana = "🍌"',
    language: 'javascript',
  },
}

export default meta
type Story = StoryObj<typeof HighlightedCode>

export const Default: Story = {
  args: {},
}
