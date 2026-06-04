import type { Meta, StoryObj } from '@storybook/nextjs'

import {
  WritingTile,
  WritingTileHeading,
  WritingTileTags,
  WritingTileReadingTime,
} from '~/components/writing-tile'
import { DatedList } from '~/components/ui/dated-list'

const meta: Meta<typeof DatedList> = {
  title: 'UI/DatedList',
  component: DatedList,
  tags: ['autodocs'],
  args: {
    items: [
      {
        id: 'item-1',
        date: new Date('2022-01-02'),
        content: 'Ran half marathon',
      },
      {
        id: 'item-2',
        date: new Date('2021-01-01'),
        content: 'Bought a new car',
      },
      {
        id: 'item-3',
        date: new Date('2022-01-03'),
        content: 'Got a new job at Acme Corp',
      },
      {
        id: 'item-4',
        date: new Date('2023-01-05'),
        content: 'Got married to my best friend',
      },
      {
        id: 'item-5',
        date: new Date('2023-01-04'),
        content: 'Started a new business',
      },
    ],
  },
}

export default meta
type Story = StoryObj<typeof DatedList>

export const Default: Story = {
  args: {},
}

export const WithCustomHeadingElement: Story = {
  args: {
    headingType: 'h3',
  },
}

export const WithAscendingOrder: Story = {
  args: {
    order: 'asc',
  },
}

const blogPostContent = (
  <WritingTile href="/asdf">
    <WritingTileHeading>
      10 Essential Tips for Optimizing Your Next.js App
    </WritingTileHeading>
    <WritingTileTags tags={['Next.js', 'React', 'JavaScript']} />
    <WritingTileReadingTime minutes={12} />
  </WritingTile>
)

export const WithBlogPosts: Story = {
  args: {
    items: [
      {
        id: 'item-1',
        date: new Date('2022-01-02'),
        content: blogPostContent,
      },
      {
        id: 'item-2',
        date: new Date('2021-01-01'),
        content: blogPostContent,
      },
      {
        id: 'item-3',
        date: new Date('2022-01-03'),
        content: blogPostContent,
      },
      {
        id: 'item-4',
        date: new Date('2023-01-05'),
        content: blogPostContent,
      },
      {
        id: 'item-5',
        date: new Date('2023-01-04'),
        content: blogPostContent,
      },
    ],
  },
}
