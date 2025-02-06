import { TokensResult } from 'shiki'
import { tv, type VariantProps } from 'tailwind-variants'

const getStyles = tv({
  slots: {
    container: 'relative m-0 block',
    wrapper: 'w-full overflow-x-scroll text-sm md:text-base/7',
    lineIndex:
      'ml-3 mr-5 inline-block w-[3ch] select-none text-right text-neutral-500',
  },
})

interface HighlightedCodeImplProps extends VariantProps<typeof getStyles> {
  className?: string
  tokens: TokensResult['tokens']
}

function HighlightedCodeImpl(props: HighlightedCodeImplProps) {
  const { className, tokens, ...restProps } = props

  const styles = getStyles()

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

export default HighlightedCodeImpl
