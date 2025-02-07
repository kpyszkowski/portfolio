import HighlightedCodeTokens from '~/components/ui/highlighted-code/highlighted-code-tokens'
import { BundledLanguage, createCodeHighlighter } from '~/lib/code-highlighting'

interface HighlightedCodeAsyncProps {
  className?: string
  children: string
  language: BundledLanguage
}

async function HighlightedCodeAsync(props: HighlightedCodeAsyncProps) {
  const { children, language, ...restProps } = props

  const code = children.trim()

  const highlighter = await createCodeHighlighter()
  const { tokens } = await highlighter.codeToTokens(code, language)

  return (
    <HighlightedCodeTokens
      tokens={tokens}
      {...restProps}
    />
  )
}

export default HighlightedCodeAsync
