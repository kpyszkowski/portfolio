import { BundledLanguage, codeToTokens } from 'shiki'

export const getHighlightedSyntaxTokens = (code: string, lang: string) =>
  codeToTokens(code, { lang: lang as BundledLanguage, theme: 'one-dark-pro' })
