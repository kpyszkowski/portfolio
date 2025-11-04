'use client'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  Edit3 as EditIcon,
  Share as ShareIcon,
  Watch as WatchIcon,
} from 'react-feather'
import { tv, type VariantProps } from 'tailwind-variants'
import { Badge } from '~/components/ui/badge'
import { Tooltip } from '~/components/ui/tooltip'
import useBreakpoint from '~/hooks/use-breakpoint'
import useClipboard from '~/hooks/use-clipboard'
import getFormattedDate from '~/utils/get-formatted-date'

// TODO: Add mobile styles

const getStyles = tv({
  slots: {
    container:
      'grid grid-cols-2 grid-rows-[repeat(3,auto)] gap-x-12 gap-y-4 md:gap-y-6',
    datesWrapper: 'flex items-center gap-4 whitespace-nowrap md:gap-8',
    publishDate: 'text-md text-tertiary md:text-2xl',
    modifiedDate: 'flex items-center gap-3 text-sm',
    modifiedIcon: 'size-3',
    shareButtonWrapper: 'justify-self-end',
    shareButtonIcon: 'size-4 justify-self-end md:size-5',
    title: 'col-span-2 mb-4 text-4xl/snug md:text-6xl/tight',
    author: 'flex items-center gap-3 md:gap-4',
    authorImage: 'bg-tertiary size-10 rounded-full p-0.5 md:size-12',
    authorName: 'text-tertiary text-sm md:text-base',
    readingTime:
      'text-tertiary flex items-center gap-2 justify-self-end text-sm',
    readingTimeIcon: 'size-4',
  },
})

interface WritingIntroProps extends VariantProps<typeof getStyles> {
  className?: string
  publishedAt: Date
  title: string
  modifiedAt?: Date
  readingTime: number
}

function WritingIntro(props: WritingIntroProps) {
  const {
    className = '',
    publishedAt,
    title,
    modifiedAt,
    readingTime,
    ...restProps
  } = props

  const styles = getStyles()

  const isDesktop = useBreakpoint('md')
  const formattedModifiedDate = modifiedAt
    ? getFormattedDate(modifiedAt, {
        weekday: 'short',
        year: 'numeric',
      })
    : ''
  const modifiedTooltipLabel =
    'Last modified' + (isDesktop ? '' : `: ${formattedModifiedDate}`)

  const pathname = usePathname()
  const shareableUrl = [pathname].join()

  const copyShareableUrl = useClipboard(shareableUrl)

  const handleShare = async () => {
    const shareData: ShareData = {
      title,
      url: shareableUrl,
    }

    if (!navigator.canShare(shareData)) {
      copyShareableUrl.onCopy()
      return
    }

    try {
      await navigator.share(shareData)
    } catch (error) {
      return error
    }
  }

  return (
    <div
      className={styles.container({ className })}
      {...restProps}
    >
      <div className={styles.datesWrapper()}>
        <time className={styles.publishDate()}>
          {getFormattedDate(publishedAt, {
            year: 'numeric',
            month: 'long',
          })}
        </time>

        {modifiedAt && (
          <Tooltip
            label={modifiedTooltipLabel}
            size="xs"
            side="right"
          >
            <Badge className={styles.modifiedDate()}>
              <EditIcon className={styles.modifiedIcon()} />
              {isDesktop && formattedModifiedDate}
            </Badge>
          </Tooltip>
        )}
      </div>

      <div className={styles.shareButtonWrapper()}>
        <Tooltip
          label="Copied URL to clipboard!"
          open={copyShareableUrl.hasCopied}
          size="sm"
          sideOffset={8}
          side="bottom"
        >
          <button
            aria-label="Share the writing"
            type="button"
            onClick={handleShare}
          >
            <ShareIcon className={styles.shareButtonIcon()} />
          </button>
        </Tooltip>
      </div>

      <h1 className={styles.title()}>{title}</h1>

      <div className={styles.author()}>
        <Image
          className={styles.authorImage()}
          src="/author-image.jpg"
          width={48}
          height={48}
          alt="Kamil Pyszkowski's picture"
        />

        <span className={styles.authorName()}>Kamil Pyszkowski</span>
      </div>

      <span className={styles.readingTime()}>
        <WatchIcon className={styles.readingTimeIcon()} />
        {readingTime} mins
      </span>
    </div>
  )
}

export default WritingIntro
