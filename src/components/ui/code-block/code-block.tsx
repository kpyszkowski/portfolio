import { getHighlightedSyntaxTokens } from '@/lib/syntax-highlighting'
import cn from '@/utils/cn'
import { MDXComponents } from 'mdx/types'
import React, { Children } from 'react'
import { tv } from 'tailwind-variants'

// TODO: Find/create copyright-free alternative background image
// TODO: Add copy button
// TODO: Add line highlighting

const getStyles = tv({
  slots: {
    container:
      'relative -mx-20 my-6 rounded-3xl bg-[url(https://4kwallpapers.com/images/walls/thumbs_3t/5584.jpg)] bg-cover p-20',
    figure:
      'm-0 rounded-xl bg-black/[0.64] shadow-lg backdrop-blur-lg backdrop-contrast-[0.52] backdrop-saturate-[1.24] neumorphism',
    figcaption: 'm-0 flex px-5 py-6 leading-6',
    decorator: 'w-12',
    label: 'flex-1 text-center text-xs text-neutral-300',
    pre: 'rounded-none bg-transparent p-0 pb-6',
    code: '[counter-reset:line]',
    line: 'before:sticky before:left-0 before:ml-px before:inline-block before:h-full before:px-5 before:text-neutral-500 before:content-[counter(line)] before:[counter-increment:line]',
  },
})

type CodeChildElement = React.ReactElement<{
  className: string
  children: string
}>

const CodeBlock: MDXComponents['pre'] = async (props) => {
  const { className = '', children, title, ...restProps } = props

  const styles = getStyles()

  const codeChild = Children.toArray(children).at(0) as CodeChildElement

  const language = codeChild.props.className.replace('language-', '')
  const code = codeChild.props.children.trim()

  const { tokens } = await getHighlightedSyntaxTokens(code, language)

  return (
    <div className={cn(className, styles.container())}>
      <figure className={cn(className, styles.figure())}>
        <figcaption className={styles.figcaption()}>
          <svg
            className={styles.decorator()}
            viewBox="0 0 48 12"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
          >
            <circle cx="6" cy="6" r="6" fill="#FF5F57" />
            <circle cx="24" cy="6" r="6" fill="#FFBD2E" />
            <circle cx="42" cy="6" r="6" fill="#28C840" />
          </svg>

          {title && <span className={styles.label()}>{title}</span>}
        </figcaption>

        <pre className={styles.pre()} {...restProps}>
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
      </figure>
    </div>
  )
}

export default CodeBlock
