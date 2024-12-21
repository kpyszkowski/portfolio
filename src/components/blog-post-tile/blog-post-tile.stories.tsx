import type { Meta, StoryObj } from '@storybook/react'

import BlogPostTile from './blog-post-tile'

const meta: Meta<typeof BlogPostTile> = {
  title: 'BlogPostTile',
  component: BlogPostTile,
  tags: ['autodocs'],
  args: {
    title: '10 Essential Tips for Optimizing Your Next.js App',
    readingTime: 12,
    url: '/asdf',
  },
}

export default meta
type Story = StoryObj<typeof BlogPostTile>

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
