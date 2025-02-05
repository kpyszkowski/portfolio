'use client'
import { BundledLanguage } from '@/lib/code-highlighting'
import { useLayoutEffect, useState } from 'react'
import { TokensResult } from 'shiki'
import HighlightedCodeAsync from './highlighted-code-async'
import HighlightedCodeTokens from './highlighted-code-tokens'

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
      const { createCodeHighlighter } = await import('@/lib/code-highlighting')
      const highlighter = await createCodeHighlighter()
      const { tokens } = await highlighter.codeToTokens(code, language)
      setTokens(tokens)
    }

    handleSyntaxHighlighting()
  }, [children, language])

  if (!tokens.length) return <HighlightedCodeAsync {...props} />

  return (
    <HighlightedCodeTokens
      tokens={tokens}
      {...restProps}
    />
  )
}

export default HighlightedCode
