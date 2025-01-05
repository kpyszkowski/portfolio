'use client'
import HighlightedCodeImpl from './highlighted-code-impl'
import {
  BundledLanguage,
  requestCodeHighlighter,
} from '@/lib/syntax-highlighting'
import { use, useLayoutEffect, useState } from 'react'
import { TokensResult } from 'shiki'

interface HighlightedCodeProps {
  children: string
  language: BundledLanguage
}

function HighlightedCode(props: HighlightedCodeProps) {
  const { children, language, ...restProps } = props

  const [tokens, setTokens] = useState<TokensResult['tokens']>([])

  const { codeToTokens } = use(requestCodeHighlighter())

  useLayoutEffect(() => {
    const code = children.trim()
    const { tokens } = codeToTokens(code, language)
    setTokens(tokens)
  }, [children, codeToTokens, language])

  return <HighlightedCodeImpl tokens={tokens} {...restProps} />
}

export default HighlightedCode
