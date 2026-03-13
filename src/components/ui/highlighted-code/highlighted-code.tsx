'use client'
import { useLayoutEffect, useState } from 'react'
import { TokensResult } from 'shiki'
import { HighlightedCodeTokens } from '~/components/ui/highlighted-code/highlighted-code-tokens'
import { BundledLanguage } from '~/lib/code-highlighting'

interface HighlightedCodeProps {
  children: string
  language: BundledLanguage
}

function HighlightedCode(props: HighlightedCodeProps) {
  const { children, language, ...restProps } = props

  const [tokens, setTokens] = useState<TokensResult['tokens']>([])

  useLayoutEffect(() => {
    const code = children.trim()

    const handleSyntaxHighlighting = async () => {
      const { createCodeHighlighter } = await import('~/lib/code-highlighting')
      const highlighter = await createCodeHighlighter()
      const { tokens } = await highlighter.codeToTokens(code, language)
      setTokens(tokens)
    }

    handleSyntaxHighlighting()
  }, [children, language])

  return (
    <HighlightedCodeTokens
      tokens={tokens}
      {...restProps}
    />
  )
}

export { HighlightedCode, type HighlightedCodeProps }
