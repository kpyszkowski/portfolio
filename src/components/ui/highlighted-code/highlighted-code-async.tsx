import HighlightedCodeImpl from '@/components/ui/highlighted-code/highlighted-code-impl'
import { getHighlightedSyntaxTokens } from '@/lib/syntax-highlighting'

interface HighlightedCodeAsyncProps {
  className?: string
  children: string
  language: string
}

async function HighlightedCodeAsync(props: HighlightedCodeAsyncProps) {
  const { children, language, ...restProps } = props

  const code = children.trim()
  const { tokens } = await getHighlightedSyntaxTokens(code, language)

  return <HighlightedCodeImpl tokens={tokens} {...restProps} />
}

export default HighlightedCodeAsync
