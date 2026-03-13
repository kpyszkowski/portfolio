import { TokensResult } from 'shiki'
import { createStyles, type StylesProps } from '~/utils/create-styles'

const highlightedCodeTokensStyles = createStyles({
  slots: {
    container:
      'relative m-0 block brightness-[0.8] contrast-[0.8] saturate-200 dark:filter-none',
    wrapper: 'w-full overflow-x-scroll text-sm md:text-base/7',
    lineIndex:
      'mr-5 ml-3 inline-block w-[3ch] text-right text-neutral-200 select-none dark:text-neutral-500',
  },
})

interface HighlightedCodeTokensProps
  extends StylesProps<typeof highlightedCodeTokensStyles> {
  className?: string
  tokens: TokensResult['tokens']
}

function HighlightedCodeTokens(props: HighlightedCodeTokensProps) {
  const { className, tokens, ...restProps } = props

  const styles = highlightedCodeTokensStyles()

  return (
    <code
      className={styles.container({ className })}
      {...restProps}
    >
      <div className={styles.wrapper()}>
        {tokens.map((line, index) => (
          <div key={index}>
            <span className={styles.lineIndex()}>{index + 1}</span>
            {line.map(
              (character, index) =>
                character.content && (
                  <span
                    key={[character.content, index].join('-')}
                    style={{
                      color: character.color,
                    }}
                  >
                    {character.content}
                  </span>
                ),
            )}
          </div>
        ))}
      </div>
    </code>
  )
}

export {
  HighlightedCodeTokens,
  highlightedCodeTokensStyles,
  type HighlightedCodeTokensProps,
}
