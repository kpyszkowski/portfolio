import { Inter } from 'next/font/google'

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const fontsClassName = [inter].map((font) => font.variable).join(' ')
