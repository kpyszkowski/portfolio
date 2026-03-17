'use client'
import { ThemeProvider } from 'next-themes'
import ReactLenis from 'lenis/react'
import { Leva } from 'leva'
import type { ReactNode } from 'react'

function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="data-theme">
      <ReactLenis root />
      <Leva
        collapsed
        hidden={process.env.NODE_ENV === 'production'}
        flat
      />
      {children}
    </ThemeProvider>
  )
}

export { Providers }
