import type { Meta, StoryObj } from '@storybook/react'

import Signature from './signature'

const meta: Meta<typeof Signature> = {
  title: 'Signature',
  component: Signature,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Signature>

export const Default: Story = {
  args: {},
}

export const WithoutOnMountAnimation: Story = {
  args: {
    initial: false,
  },
}

export const AnimateWhileInView: Story = {
  args: {
    whileInView: true,
  },
  decorators: [
    (Component) => (
      <div style={{ height: '150vh', position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            transform: 'translateY(calc(-100% - 25vh))',
          }}
        >
          <Component />
        </div>
      </div>
    ),
  ],
}
