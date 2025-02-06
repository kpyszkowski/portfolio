import type { MDXComponents } from 'mdx/types'
import { Callout } from '~/components/ui/callout'
import { CodeExample } from '~/components/ui/code-example'
import { WritingNavigationTrigger } from '~/components/writing-navigation'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    pre: CodeExample,
    section: WritingNavigationTrigger,
    callout: Callout,
  }
}
