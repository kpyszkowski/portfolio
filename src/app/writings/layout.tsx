import type { Metadata } from 'next'
import { Footer } from '~/components/footer'
import { Header } from '~/components/header'

export const metadata: Metadata = {
  title: {
    template: "%s - Kamil's writings",
    default: "Kamil's writings",
  },
}

export default function WritingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {children}

      <Footer />
    </div>
  )
}
