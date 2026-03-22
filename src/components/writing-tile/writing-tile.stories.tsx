import type { Meta, StoryObj } from '@storybook/react'
import { WritingTile } from '~/components/writing-tile/writing-tile'
import { WritingTileHeading } from '~/components/writing-tile/writing-tile-heading'
import { WritingTileTags } from '~/components/writing-tile/writing-tile-tags'
import { WritingTileReadingTime } from '~/components/writing-tile/writing-tile-reading-time'

const meta: Meta<typeof WritingTile> = {
  title: 'Components/WritingTile',
  component: WritingTile,
  tags: ['autodocs'],
  args: {
    href: '/writings/example',
  },
}

export default meta
type Story = StoryObj<typeof WritingTile>

export const Default: Story = {
  render: (args) => (
    <WritingTile {...args}>
      <WritingTileHeading>
        10 Essential Tips for Optimizing Your Next.js App
      </WritingTileHeading>
      <WritingTileReadingTime minutes={12} />
    </WritingTile>
  ),
}

export const WithTags: Story = {
  render: (args) => (
    <WritingTile {...args}>
      <WritingTileHeading>
        10 Essential Tips for Optimizing Your Next.js App
      </WritingTileHeading>
      <WritingTileTags tags={['Next.js', 'React', 'JavaScript']} />
      <WritingTileReadingTime minutes={12} />
    </WritingTile>
  ),
}

export const WithColoredTags: Story = {
  render: (args) => (
    <WritingTile {...args}>
      <WritingTileHeading>
        10 Essential Tips for Optimizing Your Next.js App
      </WritingTileHeading>
      <WritingTileTags
        tags={['Next.js', 'React', 'JavaScript']}
        color="blue"
      />
      <WritingTileReadingTime minutes={12} />
    </WritingTile>
  ),
}

export const WithH4Heading: Story = {
  render: (args) => (
    <WritingTile {...args}>
      <WritingTileHeading as="h4">
        10 Essential Tips for Optimizing Your Next.js App
      </WritingTileHeading>
      <WritingTileTags tags={['Next.js', 'React']} />
      <WritingTileReadingTime minutes={12} />
    </WritingTile>
  ),
}
