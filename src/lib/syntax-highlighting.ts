import { BundledLanguage } from 'shiki'

export const getHighlightedSyntaxTokens = async (
  code: string,
  lang: string,
) => {
  const { codeToTokens } = await import('shiki')

  return codeToTokens(code, {
    lang: lang as BundledLanguage,
    theme: 'one-dark-pro',
  })
}
