import Link from 'next/link'
import { ArrowRight as ArrowIcon, Watch as WatchIcon } from 'react-feather'
import { tv, type VariantProps } from 'tailwind-variants'
import { Badge } from '~/components/ui/badge'
import { Tooltip } from '~/components/ui/tooltip'

const getStyles = tv({
  slots: {
    container:
      'grid grid-flow-row grid-cols-[1fr_auto] grid-rows-[auto_1fr] items-center gap-3 lg:gap-4',
    arrowIcon: 'size-4 justify-self-end text-neutral-50 sm:size-5',
    tags: 'flex gap-1 overflow-hidden sm:gap-2',
    readTimeWrapper:
      'relative flex items-center gap-1.5 self-start justify-self-end text-neutral-500 [grid-area:-2/-2/-1/-1] dark:text-neutral-400',
    readTimeIcon: 'size-3 sm:size-4',
    readTimeLabel: 'text-xs leading-5 sm:text-sm sm:leading-6',
    readTimeMask:
      'absolute top-0 -left-8 h-full w-8 bg-gradient-to-l from-neutral-50 from-50% dark:from-neutral-900',
  },
})

interface WritingTileProps extends VariantProps<typeof getStyles> {
  className?: string
  title: string
  tags?: string[]
  readingTime: number
  url: string
  titleElementType?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

function WritingTile(props: WritingTileProps) {
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
      className={styles.container({ className })}
      href={url}
      {...restProps}
    >
      <TitleElement>{title}</TitleElement>

      <ArrowIcon className={styles.arrowIcon()} />

      {tags && (
        <div className={styles.tags()}>
          {tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      )}

      <Tooltip
        label="Reading time"
        side="left"
        align="end"
        size="xs"
      >
        <div
          className={styles.readTimeWrapper()}
          aria-label={`Reading time: ${readingTime} minutes`}
        >
          <WatchIcon className={styles.readTimeIcon()} />
          <span className={styles.readTimeLabel()}>{readingTime} mins</span>
          <span className={styles.readTimeMask()} />
        </div>
      </Tooltip>
    </Link>
  )
}

export default WritingTile
