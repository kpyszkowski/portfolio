'use client'
import { Watch as WatchIcon } from 'react-feather'
import { createStyles, type StylesProps } from '~/utils/create-styles'
import { Tooltip } from '~/components/ui/tooltip'

const writingTileReadingTimeStyles = createStyles({
  slots: {
    wrapper:
      'flex items-center gap-1.5 self-start justify-self-end text-highlight [grid-area:-2/-2/-1/-1]',
    icon: 'size-3 sm:size-4',
    label: 'text-xs leading-5 sm:text-sm sm:leading-6',
  },
})

interface WritingTileReadingTimeProps
  extends StylesProps<typeof writingTileReadingTimeStyles> {
  minutes: number
  className?: string
}

function WritingTileReadingTime(props: WritingTileReadingTimeProps) {
  const { minutes, className, ...restProps } = props

  const styles = writingTileReadingTimeStyles()

  return (
    <Tooltip
      label="Reading time"
      side="left"
      align="end"
      size="xs"
      sideOffset={12}
      className={styles.wrapper({ className })}
      aria-label={`Reading time: ${minutes} minutes`}
      {...restProps}
    >
      <WatchIcon className={styles.icon()} />
      <span className={styles.label()}>{minutes} mins</span>
    </Tooltip>
  )
}

export {
  WritingTileReadingTime,
  writingTileReadingTimeStyles,
  type WritingTileReadingTimeProps,
}
