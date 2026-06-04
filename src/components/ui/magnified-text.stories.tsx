import type { Meta, StoryObj } from '@storybook/nextjs'
import { MagnifiedText } from '~/components/ui/magnified-text'

const meta: Meta<typeof MagnifiedText> = {
  title: 'UI/MagnifiedText',
  component: MagnifiedText,
  tags: ['autodocs'],
  argTypes: {
    strength: { control: { type: 'range', min: 0, max: 2, step: 0.05 } },
    stiffness: { control: { type: 'range', min: 10, max: 400, step: 10 } },
    damping: { control: { type: 'range', min: 5, max: 80, step: 5 } },
    minWeight: { control: { type: 'range', min: 100, max: 900, step: 50 } },
    maxWeight: { control: { type: 'range', min: 100, max: 1000, step: 50 } },
  },
  args: {
    children: 'Hello world',
    strength: 0.5,
  },
  decorators: [
    (Story) => (
      <div className="p-8">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof MagnifiedText>

export const Default: Story = { args: {} }

export const Tracked: Story = {
  args: {
    children: 'Always active',
    mode: 'tracked',
    origin: 'relative',
  },
}

export const LowStrength: Story = {
  args: {
    children: 'Subtle effect',
    strength: 0.3,
  },
}

export const ThinAtRest: Story = {
  args: {
    children: 'Hover me',
    idle: 'min',
  },
}

export const MultiWord: Story = {
  args: {
    children: 'Move your cursor here',
  },
}
