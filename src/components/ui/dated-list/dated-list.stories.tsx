import type { Meta, StoryObj } from '@storybook/react'

import DatedList from './dated-list'

const meta: Meta<typeof DatedList> = {
  title: 'UI/DatedList',
  component: DatedList,
  tags: ['autodocs'],
  args: {
    items: [
      {
        id: 'item-1',
        date: new Date('2022-01-02'),
        content: '10 Essential Tips for Optimizing Your Next.js App',
      },
      {
        id: 'item-2',
        date: new Date('2021-01-01'),
        content: 'Building a RESTful API with Node.js and Express in 2024',
      },
      {
        id: 'item-3',
        date: new Date('2022-01-03'),
        content:
          'Top JavaScript Frameworks to Watch in 2024: Which One Is Right for You?',
      },
      {
        id: 'item-4',
        date: new Date('2023-01-05'),
        content:
          'Serverless Explained: Deploying Scalable Applications with AWS Lambda',
      },
      {
        id: 'item-5',
        date: new Date('2023-01-04'),
        content: 'Enhancing User Experience with Intersection Observer API',
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
