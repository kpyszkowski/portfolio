import { Badge } from '@/components/ui/badge'
import cn from '@/utils/cn'
import Link from 'next/link'
import { Watch as WatchIcon, ArrowRight as ArrowIcon } from 'react-feather'
import { tv, type VariantProps } from 'tailwind-variants'

const getStyles = tv({
  slots: {
    container:
      'grid grid-flow-row grid-cols-[1fr,auto] grid-rows-[auto,1fr] items-start gap-3 lg:gap-4',
    arrowIcon: 'size-4 justify-self-end text-neutral-50 sm:size-6',
    title: 'font-sans',
    tags: 'flex flex-wrap gap-1 sm:gap-2',
    readTimeWrapper:
      'flex items-center gap-1.5 justify-self-end text-neutral-400 [grid-area:-2/-2/-1/-1]',
    readTimeIcon: 'size-3 sm:size-4',
    readTimeLabel: 'font-sans text-xs leading-5 sm:text-sm sm:leading-6',
  },
})

interface BlogPostTileProps extends VariantProps<typeof getStyles> {
  className?: string
  title: string
  tags?: string[]
  readingTime: number
  url: string
  titleElementType?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

function BlogPostTile(props: BlogPostTileProps) {
  const {
    className = '',
    title,
    tags,
    readingTime,
    url,
    titleElementType,
    ...restProps
  } = props

  const styles = getStyles()

  const TitleElement = titleElementType || 'h3'

  return (
    <Link
      className={cn(className, styles.container())}
      href={url}
      {...restProps}
    >
      <TitleElement className={styles.title()}>{title}</TitleElement>

      <ArrowIcon className={styles.arrowIcon()} />

      {tags && (
        <div className={styles.tags()}>
          {tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      )}

      <div
        className={styles.readTimeWrapper()}
        aria-label={`Reading time: ${readingTime} minutes`}
      >
        <WatchIcon className={styles.readTimeIcon()} />
        <span className={styles.readTimeLabel()}>{readingTime} mins</span>
      </div>
    </Link>
  )
}

export default BlogPostTile
