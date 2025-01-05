import cn from '@/utils/cn'
import { TokensResult } from 'shiki'
import { tv, type VariantProps } from 'tailwind-variants'

const getStyles = tv({
  slots: {
    container: [
      'relative m-0 [counter-reset:line]',
      'before:absolute before:-top-1/4 before:block before:h-[150%] before:w-16 md:before:hidden',
      'before:backdrop-contrast-80 before:backdrop-blur-md',
      'before:[mask:linear-gradient(90deg,black_65%,transparent)]',
    ],
    wrapper: 'block w-full overflow-x-scroll',
    line: [
      'before:sticky before:left-0 before:inline-block before:h-full before:w-14 before:px-5',
      'before:text-right before:text-neutral-500',
      'before:content-[counter(line)] before:[counter-increment:line]',
    ],
  },
})

interface HighlightedCodeImplProps extends VariantProps<typeof getStyles> {
  className?: string
  tokens: TokensResult['tokens']
}

function HighlightedCodeImpl(props: HighlightedCodeImplProps) {
  const { className, tokens = [], ...restProps } = props

  const styles = getStyles()

  return (
    <code className={cn(styles.container(), className)} {...restProps}>
      <div className={styles.wrapper()}>
        {tokens.map((line, index) => (
          <div key={index} className={styles.line()}>
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
