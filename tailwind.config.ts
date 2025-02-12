import type { Config } from 'tailwindcss'
import holographicPlugin from './tailwind-plugins/utilities/holographic'
import neumorphismPlugin from './tailwind-plugins/utilities/neumorphism'
import typographyPlugin from '@tailwindcss/typography'
import proseInlineCode from './tailwind-plugins/utilities/prose-inline-code'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-fira-code)', 'monospace'],
      },
    },
  },
  plugins: [
    holographicPlugin,
    neumorphismPlugin,
    typographyPlugin,
    proseInlineCode,
  ],
}
export default config
