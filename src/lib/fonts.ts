import { DM_Sans, Fira_Code } from 'next/font/google'

export const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
})

export const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira-code',
})

export const fontsClassName = [dmSans, firaCode]
  .map((font) => font.variable)
  .join(' ')
