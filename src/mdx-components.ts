import { CodeBlock } from '@/components/ui/code-block'
import { WritingNavigationTrigger } from '@/components/writing-navigation'
import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    pre: CodeBlock,
    section: WritingNavigationTrigger,
  }
}
