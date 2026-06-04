import type { Meta, StoryObj } from '@storybook/nextjs'

import { WritingOutro } from '~/components/writing-outro'

const meta: Meta<typeof WritingOutro> = {
  title: 'WritingOutro',
  component: WritingOutro,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof WritingOutro>

export const Default: Story = {
  args: {},
}
