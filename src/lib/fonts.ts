import { DM_Sans } from 'next/font/google'

export const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
})

export const fontsClassName = [dmSans].map((font) => font.variable).join(' ')
