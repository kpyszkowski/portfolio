import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: "%s - Kamil Pyszkowski's writings",
    default: "Kamil Pyszkowski's writings",
  },
}

export default function WritingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      <Header />

      {children}

      <Footer />
    </div>
  )
}
