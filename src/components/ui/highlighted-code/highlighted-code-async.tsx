import HighlightedCodeImpl from '@/components/ui/highlighted-code/highlighted-code-impl'
import {
  BundledLanguage,
  requestCodeHighlighter,
} from '@/lib/syntax-highlighting'

interface HighlightedCodeAsyncProps {
  className?: string
  children: string
  language: BundledLanguage
}

async function HighlightedCodeAsync(props: HighlightedCodeAsyncProps) {
  const { children, language, ...restProps } = props

  const code = children.trim()
  const { codeToTokens } = await requestCodeHighlighter()
  const { tokens } = await codeToTokens(code, language)

  return <HighlightedCodeImpl tokens={tokens} {...restProps} />
}

export default HighlightedCodeAsync
