import type { Meta, StoryObj } from '@storybook/react'

import { WritingIntro } from '~/components/writing-intro'

const meta: Meta<typeof WritingIntro> = {
  title: 'WritingIntro',
  component: WritingIntro,
  tags: ['autodocs'],
  args: {
    publishedAt: new Date('2021-06-01'),
    title: 'How I built my blog with Next.js and MDX',
    modifiedAt: new Date('2021-06-02'),
    readingTime: 5,
  },
}

export default meta
type Story = StoryObj<typeof WritingIntro>

export const Default: Story = {
  args: {},
}
