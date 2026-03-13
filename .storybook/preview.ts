import type { Preview } from '@storybook/react'
import '~/app/globals.css'
import { fontsClassName } from '~/lib/fonts'

import { withThemeByDataAttribute } from '@storybook/addon-themes'

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
    (story) => {
      fontsClassName.split(' ').forEach((font) => {
        document.documentElement.classList.add(font)
      })
      return story()
    },
    withThemeByDataAttribute({
      defaultTheme: 'light',
      themes: {
        light: 'light',
        dark: 'dark',
      },
      attributeName: 'data-theme',
    }),
  ],
}

export default preview
