'use client'
import { BundledLanguage, getCodeHighlighter } from '@/lib/syntax-highlighting'
import { useLayoutEffect, useState } from 'react'
import { TokensResult } from 'shiki'
import HighlightedCodeTokens from './highlighted-code-tokens'
import HighlightedCodeAsync from './highlighted-code-async'

interface HighlightedCodeProps {
  children: string
  language: BundledLanguage
}

function HighlightedCode(props: HighlightedCodeProps) {
  const { children, language: lang, ...restProps } = props

  const [tokens, setTokens] = useState<TokensResult['tokens']>([])

  useLayoutEffect(() => {
    const code = children.trim()

    const handleSyntaxHighlighting = async () => {
      const highlighter = await getCodeHighlighter()

      const { tokens } =
        highlighter?.codeToTokens(code, {
          lang,
          theme: 'one-dark-pro',
        }) || {}
      setTokens(tokens || [])
      highlighter.dispose()
    }

    handleSyntaxHighlighting()
  }, [children, lang])

  if (!tokens.length) return <HighlightedCodeAsync {...props} />

  return <HighlightedCodeTokens tokens={tokens} {...restProps} />
}

export default HighlightedCode
