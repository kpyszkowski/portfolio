import React from 'react'
import type { Preview } from '@storybook/react'
import '../src/app/globals.css'
import { fontsClassName } from '../src/lib/fonts'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    background: {
      default: 'dark',
    },
  },
  decorators: [
    (Story) => (
      <div className={fontsClassName}>
        <Story />
      </div>
    ),
  ],
}

export default preview
