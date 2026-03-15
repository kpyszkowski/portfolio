import { MDXContent } from 'mdx/types'
import { forwardRef } from 'react'
import { createStyles, type StylesProps } from '~/utils/create-styles'

const articleStyles = createStyles({
  slots: {
    container:
      'mx-auto prose prose-sm prose-neutral md:prose-base dark:prose-invert prose-inline-code:rounded-md prose-inline-code:bg-highlight prose-inline-code:px-1.5 prose-inline-code:py-0.5 prose-inline-code:font-medium prose-inline-code:before:hidden prose-inline-code:after:hidden',
  },
})

interface ArticleProps extends StylesProps<typeof articleStyles> {
  className?: string
  content: MDXContent
}

const Article = forwardRef<HTMLElement, ArticleProps>((props, ref) => {
  const { className = '', content: Content, ...restProps } = props

  const styles = articleStyles()

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

export { Article, articleStyles, type ArticleProps }
