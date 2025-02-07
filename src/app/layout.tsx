import type { Metadata, Viewport } from 'next'
import { fontsClassName } from '~/lib/fonts'
import './globals.css'

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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={fontsClassName}>{children}</body>
    </html>
  )
}
