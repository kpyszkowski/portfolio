'use client'
import HighlightedCodeImpl from './highlighted-code-impl'
import { BundledLanguage, getCodeHighlighter } from '@/lib/syntax-highlighting'
import { useLayoutEffect, useState } from 'react'
import { TokensResult } from 'shiki'

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

  return <HighlightedCodeImpl tokens={tokens} {...restProps} />
}

export default HighlightedCode
