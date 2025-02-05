import {
  HighlighterCore,
  ShorthandsBundle as ShorthandsBundleImpl,
  TokensResult,
} from 'shiki'

export type BundledLanguage = 'css' | 'ts' | 'tsx' | 'json'
export type ShorthandsBundle = Omit<
  ShorthandsBundleImpl<BundledLanguage, 'one-dark-pro'>,
  'codeToTokens'
> & {
  codeToTokens: (code: string, lang: BundledLanguage) => Promise<TokensResult>
}

let highlighter: HighlighterCore | null = null

export const createCodeHighlighter = async () => {
  if (!highlighter) {
    const [{ createHighlighterCore }, { createOnigurumaEngine }] =
      await Promise.all([
        import('shiki/core'),
        import('shiki/engine/oniguruma'),
      ])

    const themes = await Promise.all([import('shiki/themes/one-dark-pro.mjs')])

    const langs = await Promise.all([
      import('shiki/langs/css.mjs'),
      import('shiki/langs/ts.mjs'),
      import('shiki/langs/tsx.mjs'),
      import('shiki/langs/json.mjs'),
    ])

    const engine = createOnigurumaEngine(import('shiki/wasm'))

    highlighter = await createHighlighterCore({
      langs,
      themes,
      engine,
    })
  }

  const { codeToTokens: codeToTokensImpl, ...restShorthands } = highlighter

  const codeToTokens = (code: string, lang: BundledLanguage) =>
    codeToTokensImpl(code, {
      lang,
      theme: 'one-dark-pro',
    })

  return { codeToTokens, ...restShorthands }
}
