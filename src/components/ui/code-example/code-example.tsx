import React, { Children } from 'react'
import { tv, VariantProps } from 'tailwind-variants'
import { CopyButton } from '~/components/ui/copy-button'
import { HighlightedCodeAsync } from '~/components/ui/highlighted-code'
import { WindowCard } from '~/components/ui/window-card'
import { BundledLanguage } from '~/lib/code-highlighting'

const getStyles = tv({
  slots: {
    container: 'group',
    content: 'pb-4',
    copyButton: [
      'gap-3 py-1 text-sm opacity-50 group-hover:opacity-100',
      'text-neutral-300 transition-opacity active:text-neutral-50',
    ],
  },
})

type CodeChildElement = React.ReactElement<{
  className: string
  children: string
}>

interface CodeExampleProps extends VariantProps<typeof getStyles> {
  className?: string
  children?: React.ReactNode
  title?: string
}

const CodeExample = async (props: CodeExampleProps) => {
  const { children, className, ...restProps } = props

  const styles = getStyles()

  if (!children) return null

  const codeChild = Children.toArray(children).at(0) as CodeChildElement

  const language = codeChild.props.className?.replace(
    'language-',
    '',
  ) as BundledLanguage
  const code = codeChild.props.children.trim()

  return (
    <WindowCard
      className={styles.container({ className })}
      captionSlot={
        <CopyButton
          className={styles.copyButton()}
          label={{
            default: 'Copy code',
            copied: 'Copied',
          }}
        >
          {code}
        </CopyButton>
      }
      {...restProps}
    >
      <WindowCard.Content
        as="pre"
        className={styles.content()}
      >
        <HighlightedCodeAsync language={language}>{code}</HighlightedCodeAsync>
      </WindowCard.Content>
    </WindowCard>
  )
}

export default CodeExample
