import { createStyles, type StylesProps } from '~/utils/create-styles'
import { Badge, type BadgeProps } from '~/components/ui/badge'

const writingTileTagsStyles = createStyles({
  slots: {
    container: 'flex gap-1 overflow-hidden mask-r-from-75% sm:gap-2',
  },
})

interface WritingTileTagsProps
  extends Pick<BadgeProps, 'color'>,
    StylesProps<typeof writingTileTagsStyles> {
  tags: string[]
  className?: string
}

function WritingTileTags(props: WritingTileTagsProps) {
  const { tags, color, className, ...restProps } = props

  const styles = writingTileTagsStyles()

  return (
    <div
      className={styles.container({ className })}
      {...restProps}
    >
      {tags.map((tag) => (
        <Badge
          key={tag}
          color={color}
        >
          {tag}
        </Badge>
      ))}
    </div>
  )
}

export { WritingTileTags, writingTileTagsStyles, type WritingTileTagsProps }
