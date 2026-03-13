import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: {
    template: "%s - Kamil's writings",
    default: "Kamil's writings",
  },
}

export default function WritingsLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return children
}
