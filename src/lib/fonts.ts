import localFont from 'next/font/local'
import { Fira_Code, Figtree } from 'next/font/google'

export const satoshiVariable = localFont({
  src: '../fonts/satoshi-variable.ttf',
  fallback: ['system-ui'],
  variable: '--font-satoshi',
})

export const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira-code',
})

export const figtree = Figtree({
  subsets: ['latin'],
  variable: '--font-figtree',
})

export const fontsClassName = [satoshiVariable, firaCode, figtree]
  .map((font) => font.variable)
  .join(' ')
