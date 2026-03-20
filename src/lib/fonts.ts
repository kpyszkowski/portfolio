import localFont from 'next/font/local'
import { Fira_Code } from 'next/font/google'

export const satoshiVariable = localFont({
  src: '../fonts/satoshi-variable.ttf',
  fallback: ['system-ui'],
  variable: '--font-satoshi',
})

export const eudoxusSansVariable = localFont({
  src: '../fonts/eudoxus-sans-variable.ttf',
  fallback: ['system-ui'],
  variable: '--font-eudoxus-sans',
})

export const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira-code',
})

export const fontsClassName = [satoshiVariable, eudoxusSansVariable, firaCode]
  .map((font) => font.variable)
  .join(' ')
