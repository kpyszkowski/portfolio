import HighlightedCodeTokens from '@/components/ui/highlighted-code/highlighted-code-tokens'
import { BundledLanguage, getCodeHighlighter } from '@/lib/syntax-highlighting'

interface HighlightedCodeAsyncProps {
  className?: string
  children: string
  language: BundledLanguage
}

async function HighlightedCodeAsync(props: HighlightedCodeAsyncProps) {
  const { children, language, ...restProps } = props

  const code = children.trim()
  const highlighter = await getCodeHighlighter()
  const { tokens = [] } =
    highlighter?.codeToTokens(code, {
      lang: language,
      theme: 'one-dark-pro',
    }) || {}

  return (
    <HighlightedCodeTokens
      tokens={tokens}
      {...restProps}
    />
  )
}

export default HighlightedCodeAsync
