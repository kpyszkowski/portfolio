import type { Meta, StoryObj } from '@storybook/react'

import { TabsMenu } from '~/components/ui/tabs-menu/tabs-menu'
import { Book, Home, Send, Box, User } from 'react-feather'

const meta: Meta<typeof TabsMenu> = {
  title: 'UI/TabsMenu',
  component: TabsMenu,
  tags: ['autodocs'],
  args: {
    items: [
      {
        id: 'item-1',
        label: 'Home',
        onClick: () => console.log('Item 1 has callback 📣'),
      },
      {
        id: 'item-2',
        label: 'About',
      },
      {
        id: 'item-3',
        label: 'Experience',
        onClick: () => console.log('Item 3 has callback 📣'),
      },
      {
        id: 'item-4',
        label: 'Writings',
      },
      {
        id: 'item-5',
        label: 'Contact',
      },
    ],
  },
}

export default meta
type Story = StoryObj<typeof TabsMenu>

export const Default: Story = {
  args: {},
}

export const WithDefaultActiveItem: Story = {
  args: {
    defaultActive: 2,
  },
}

export const WithRenderSlot: Story = {
  args: {
    renderBefore: <Box className="mx-4 size-6" />,
  },
}

export const WithIcons: Story = {
  args: {
    items: [
      {
        id: 'item-1',
        icon: Home,
        label: 'Home',
        onClick: () => console.log('Item 1 has callback 📣'),
      },
      {
        id: 'item-2',
        icon: User,
        label: 'Users',
      },
      {
        id: 'item-3',
        icon: Book,
        label: 'Resources',
        onClick: () => console.log('Item 3 has callback 📣'),
      },
      {
        id: 'item-4',
        icon: Send,
        label: 'Contact',
      },
    ],
  },
}
