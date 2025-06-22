import type { Metadata, Viewport } from 'next'
import { fontsClassName } from '~/lib/fonts'
import './globals.css'
import { ThemeProvider } from 'next-themes'

export const metadata: Metadata = {
  title: 'Kamil Pyszkowski - Software Engineer',
  description: 'Personal website of Kamil Pyszkowski, a software engineer.',
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/favicon-light.svg',
        href: '/favicon-light.svg',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/favicon-dark.svg',
        href: '/favicon-dark.svg',
      },
    ],
  },
}

export const viewport: Viewport = {
  userScalable: false,
  themeColor: [
    {
      media: '(prefers-color-scheme: light)',
      color: '#e5e5e5', // colors.neutral.200
    },
    {
      media: '(prefers-color-scheme: dark)',
      color: '#171717', // colors.neutral.900
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={fontsClassName}
    >
      <body>
        <ThemeProvider attribute="data-theme">{children}</ThemeProvider>
      </body>
    </html>
  )
}
