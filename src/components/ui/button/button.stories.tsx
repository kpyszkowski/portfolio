import type { Meta, StoryObj } from '@storybook/react'

import Button from './button'
import {
  BarChart2,
  ChevronLeft,
  ChevronRight,
  Home,
  Smile,
} from 'react-feather'

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['solid', 'outline'],
      control: { type: 'radio' },
    },
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'radio' },
    },
  },
  args: {
    children: 'Button',
    variant: 'outline',
    size: 'md',
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {},
}

export const WithIcon: Story = {
  argTypes: {
    icon: {
      control: {
        type: 'select',
      },
      options: ['Smile', 'ChevronRight', 'ChevronLeft', 'BarChart2', 'Home'],
      mapping: {
        Smile,
        ChevronRight,
        ChevronLeft,
        BarChart2,
        Home,
      },
    },
    iconPosition: {
      options: ['left', 'right'],
      control: { type: 'radio' },
    },
  },
  args: {
    icon: Smile,
    children: 'Button with icon',
    iconPosition: 'left',
  },
}
