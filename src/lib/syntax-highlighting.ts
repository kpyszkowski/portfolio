export type BundledLanguage = 'css' | 'ts' | 'tsx' | 'json'

export const requestCodeHighlighter = async () => {
  const [{ createHighlighterCore }, loadWasm] = await Promise.all([
    import('shiki/core'),
    import('shiki/wasm'),
  ])

  const themes = await Promise.all([import('shiki/themes/one-dark-pro.mjs')])

  const langs = await Promise.all([
    import('shiki/langs/css.mjs'),
    import('shiki/langs/ts.mjs'),
    import('shiki/langs/tsx.mjs'),
    import('shiki/langs/json.mjs'),
  ])

  const { codeToTokens } = await createHighlighterCore({
    themes,
    langs,
    loadWasm,
  })

  return {
    codeToTokens: (code: string, language: BundledLanguage) =>
      codeToTokens(code, { theme: 'one-dark-pro', lang: language }),
  }
}
