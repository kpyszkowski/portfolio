import { MDXContent } from 'mdx/types'
import { forwardRef } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const getStyles = tv({
  slots: {
    container: [
      'prose prose-sm prose-neutral mx-auto dark:prose-invert md:prose-base',
      'prose-inline-code:rounded-md prose-inline-code:px-1.5 prose-inline-code:py-0.5 prose-inline-code:font-medium prose-inline-code:before:hidden prose-inline-code:after:hidden',
      'prose-inline-code:bg-neutral-200 dark:prose-inline-code:bg-neutral-700',
    ],
  },
})

interface ArticleProps extends VariantProps<typeof getStyles> {
  className?: string
  content: MDXContent
}

const Article = forwardRef<HTMLElement, ArticleProps>((props, ref) => {
  const { className = '', content: Content, ...restProps } = props

  const styles = getStyles()

  return (
    <article
      className={styles.container({ className })}
      ref={ref}
      {...restProps}
    >
      <Content />
    </article>
  )
})

Article.displayName = 'Article'

export default Article
