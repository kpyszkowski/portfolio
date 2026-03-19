import Link from 'next/link'
import { ArrowRight as ArrowIcon, Watch as WatchIcon } from 'react-feather'
import { createStyles, type StylesProps } from '~/utils/create-styles'
import { Badge } from '~/components/ui/badge'
import { Tooltip } from '~/components/ui/tooltip'

const writingTileStyles = createStyles({
  slots: {
    container:
      'grid grid-flow-row grid-cols-[1fr_auto] grid-rows-[auto_1fr] items-center gap-3 lg:gap-4',
    arrowIcon: 'size-4 justify-self-end text-main sm:size-5',
    tags: 'flex gap-1 overflow-hidden mask-r-from-75% sm:gap-2',
    readTimeWrapper:
      'flex items-center gap-1.5 self-start justify-self-end text-highlight [grid-area:-2/-2/-1/-1]',
    readTimeIcon: 'size-3 sm:size-4',
    readTimeLabel: 'text-xs leading-5 sm:text-sm sm:leading-6',
  },
})

interface WritingTileProps extends StylesProps<typeof writingTileStyles> {
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

  const styles = writingTileStyles()

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
        sideOffset={12}
        className={styles.readTimeWrapper()}
        aria-label={`Reading time: ${readingTime} minutes`}
      >
        <WatchIcon className={styles.readTimeIcon()} />
        <span className={styles.readTimeLabel()}>{readingTime} mins</span>
      </Tooltip>
    </Link>
  )
}

export { WritingTile, writingTileStyles, type WritingTileProps }
