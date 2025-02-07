import React, { Children } from 'react'
import { tv, VariantProps } from 'tailwind-variants'
import { HighlightedCodeAsync } from '~/components/ui/highlighted-code'
import { WindowCard } from '~/components/ui/window-card'
import { BundledLanguage } from '~/lib/code-highlighting'

// TODO: Add copy button

const getStyles = tv({
  slots: {
    content: 'pb-4',
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
  const { children, ...restProps } = props

  const styles = getStyles()

  if (!children) return null

  const codeChild = Children.toArray(children).at(0) as CodeChildElement

  const language = codeChild.props.className.replace(
    'language-',
    '',
  ) as BundledLanguage
  const code = codeChild.props.children.trim()

  return (
    <WindowCard {...restProps}>
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
