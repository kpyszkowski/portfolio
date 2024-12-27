import { WindowCard } from '@/components/ui/window-card'
import { getHighlightedSyntaxTokens } from '@/lib/syntax-highlighting'
import cn from '@/utils/cn'
import React, { Children } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

// TODO: Add copy button
// TODO: Add line highlighting

const getStyles = tv({
  slots: {
    pre: 'rounded-none bg-transparent p-0 pb-4',
    code: '[counter-reset:line]',
    line: 'before:sticky before:left-0 before:ml-px before:inline-block before:h-full before:px-5 before:text-neutral-500 before:content-[counter(line)] before:[counter-increment:line]',
  },
})

type CodeChildElement = React.ReactElement<{
  className: string
  children: string
}>

interface CodeBlockProps extends VariantProps<typeof getStyles> {
  className?: string
  children?: React.ReactNode
  title?: string
}

const CodeBlock = async (props: CodeBlockProps) => {
  const { children, ...restProps } = props

  const styles = getStyles()

  if (!children) return null

  const codeChild = Children.toArray(children).at(0) as CodeChildElement

  const language = codeChild.props.className.replace('language-', '')
  const code = codeChild.props.children.trim()

  const { tokens } = await getHighlightedSyntaxTokens(code, language)

  return (
    <WindowCard {...restProps}>
      <pre className={styles.pre()}>
        <code className={styles.code()}>
          {tokens.map((line, index) => (
            <div key={index} className={styles.line()}>
              {line.map(
                (character) =>
                  character.content && (
                    <span
                      key={character.content}
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
        </code>
      </pre>
    </WindowCard>
  )
}

export default CodeBlock
