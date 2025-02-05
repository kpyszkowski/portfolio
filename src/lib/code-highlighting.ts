import { ShorthandsBundle as ShorthandsBundleImpl, TokensResult } from 'shiki'

export type BundledLanguage = 'css' | 'ts' | 'tsx' | 'json'
export type ShorthandsBundle = Omit<
  ShorthandsBundleImpl<BundledLanguage, 'one-dark-pro'>,
  'codeToTokens'
> & {
  codeToTokens: (code: string, lang: BundledLanguage) => Promise<TokensResult>
}

// This function keeps throwing console warning about undisposed instances.
// It's weird since shorthands bundle doesn't even have a dispose method.
// It is (or should be) handled automatically. The warning might be a false
// positive since it doesnt seem to affect the performance.

export const createCodeHighlighter = async () => {
  const [
    { createdBundledHighlighter, createSingletonShorthands },
    { createOnigurumaEngine },
  ] = await Promise.all([
    import('shiki/core'),
    import('shiki/engine/oniguruma'),
  ])

  const theme = await import('shiki/themes/one-dark-pro.mjs')

  const [css, ts, tsx, json] = await Promise.all([
    import('shiki/langs/css.mjs'),
    import('shiki/langs/ts.mjs'),
    import('shiki/langs/tsx.mjs'),
    import('shiki/langs/json.mjs'),
  ])

  const engine = () => createOnigurumaEngine(import('shiki/wasm'))

  const createHighlighter = createdBundledHighlighter({
    langs: {
      css,
      ts,
      tsx,
      json,
    },
    themes: {
      'one-dark-pro': theme,
    },
    engine,
  })

  const { codeToTokens: codeToTokensImpl, ...restShorthands } =
    createSingletonShorthands(createHighlighter)

  const codeToTokens = (code: string, lang: BundledLanguage) =>
    codeToTokensImpl(code, {
      lang,
      theme: 'one-dark-pro',
    })

  return { codeToTokens, ...restShorthands }
}
