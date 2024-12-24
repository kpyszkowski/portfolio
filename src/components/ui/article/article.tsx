import cn from '@/utils/cn'
import { MDXContent } from 'mdx/types'
import { tv, type VariantProps } from 'tailwind-variants'

const getStyles = tv({
  slots: {
    container: [
      'prose prose-neutral prose-invert mx-auto',
      'prose-inline-code:rounded-md prose-inline-code:bg-neutral-800 prose-inline-code:px-3 prose-inline-code:py-1 prose-inline-code:before:hidden prose-inline-code:after:hidden',
    ],
  },
})

interface ArticleProps extends VariantProps<typeof getStyles> {
  className?: string
  content: MDXContent
}

function Article(props: ArticleProps) {
  const { className = '', content: Content, ...restProps } = props

  const styles = getStyles()

  return (
    <article className={cn(className, styles.container())} {...restProps}>
      <Content />
    </article>
  )
}

export default Article
