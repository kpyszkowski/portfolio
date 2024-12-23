import { Header } from '@/components/header'
import type { Metadata } from 'next'

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

export default function WritingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="font-sans">
      <div className="mx-auto flex max-w-screen-lg flex-col px-5">
        <Header />

        <main>{children}</main>
      </div>
    </div>
  )
}
