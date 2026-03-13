import type { Meta, StoryObj } from '@storybook/react'

import WritingTile from '~/components/writing-tile/writing-tile'

const meta: Meta<typeof WritingTile> = {
  title: 'WritingTile',
  component: WritingTile,
  tags: ['autodocs'],
  args: {
    title: '10 Essential Tips for Optimizing Your Next.js App',
    readingTime: 12,
    url: '/asdf',
  },
}

export default meta
type Story = StoryObj<typeof WritingTile>

export const Default: Story = {
  args: {},
}

export const WithTags: Story = {
  args: {
    tags: ['Next.js', 'React', 'JavaScript'],
  },
}

export const WithCustomTitleElement: Story = {
  args: {
    titleElementType: 'h4',
  },
}
