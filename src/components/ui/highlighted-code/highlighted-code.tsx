'use client'
import HighlightedCodeImpl from '@/components/ui/highlighted-code/highlighted-code-impl'
import { getHighlightedSyntaxTokens } from '@/lib/syntax-highlighting'
import { useLayoutEffect, useState } from 'react'
import { TokensResult } from 'shiki'

interface HighlightedCodeProps {
  children: string
  language: string
}

function HighlightedCode(props: HighlightedCodeProps) {
  const { children, language, ...restProps } = props

  const [tokens, setTokens] = useState<TokensResult['tokens']>([])

  useLayoutEffect(() => {
    const code = children.trim()

    void getHighlightedSyntaxTokens(code, language).then(({ tokens }) =>
      setTokens(tokens),
    )
  }, [children, language])

  return <HighlightedCodeImpl tokens={tokens} {...restProps} />
}

export default HighlightedCode
