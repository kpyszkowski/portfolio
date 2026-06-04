import type { Preview } from '@storybook/nextjs'
import '~/app/globals.css'

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
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/',
      },
    },
  },
  decorators: [
    (story) => {
      if (!document.getElementById('sb-fonts')) {
        const style = document.createElement('style')
        style.id = 'sb-fonts'
        style.textContent = `
          @font-face {
            font-family: 'Satoshi Variable';
            src: url('/fonts/satoshi-variable.ttf') format('truetype');
            font-weight: 300 900;
            font-style: normal;
          }
          @font-face {
            font-family: 'Eudoxus Sans Variable';
            src: url('/fonts/eudoxus-sans-variable.ttf') format('truetype');
            font-weight: 200 800;
            font-style: normal;
          }
          :root {
            --font-satoshi: 'Satoshi Variable', system-ui, sans-serif;
            --font-eudoxus-sans: 'Eudoxus Sans Variable', system-ui, sans-serif;
            --font-fira-code: 'Fira Code Variable', monospace;
          }
        `
        document.head.appendChild(style)

        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href =
          'https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&display=swap'
        document.head.appendChild(link)
      }
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
