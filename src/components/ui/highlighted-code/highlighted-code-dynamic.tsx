// eslint-disable-next-line import/no-cycle
import { HighlightedCodeAsync as ServerComponent } from '@/components/ui/highlighted-code'
import dynamic from 'next/dynamic'
import { ComponentProps, Suspense } from 'react'

const ClientComponent = dynamic(() =>
  import('@/components/ui/highlighted-code').then((mod) => mod.HighlightedCode),
)

function HighlightedCodeDynamic(props: ComponentProps<typeof ServerComponent>) {
  return (
    <Suspense
      fallback={
        <ServerComponent language="ts">
          let banana = &apos;🍌&apos;;
        </ServerComponent>
      }
    >
      <ClientComponent {...props} />
    </Suspense>
  )
}

export default HighlightedCodeDynamic
