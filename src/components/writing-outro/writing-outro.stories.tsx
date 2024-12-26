import type { Meta, StoryObj } from '@storybook/react'

import WritingOutro from './writing-outro'

const meta: Meta<typeof WritingOutro> = {
  title: 'WritingOutro',
  component: WritingOutro,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof WritingOutro>

export const Default: Story = {
  args: {},
}
