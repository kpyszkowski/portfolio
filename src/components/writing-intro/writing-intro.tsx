'use client'
import { Badge } from '@/components/ui/badge'
import { Tooltip } from '@/components/ui/tooltip'
import { WritingNavigationContext } from '@/components/writing-navigation/writing-navigation'
import cn from '@/utils/cn'
import getFormattedDate from '@/utils/get-formatted-date'
import { useInView } from 'framer-motion'
import Image from 'next/image'
import { useContext, useEffect, useRef } from 'react'
import {
  Edit3 as EditIcon,
  Share as ShareIcon,
  Watch as WatchIcon,
} from 'react-feather'
import { tv, type VariantProps } from 'tailwind-variants'

// TODO: Add mobile styles

const getStyles = tv({
  slots: {
    container: 'grid grid-cols-2 grid-rows-[repeat(3,auto)] gap-x-12 gap-y-6',
    datesWrapper: 'flex items-center gap-8 whitespace-nowrap',
    publishDate: 'text-2xl text-neutral-400',
    modifiedDate: 'flex items-center gap-3 text-sm text-neutral-400',
    modifiedIcon: 'size-3',
    shareButton: 'justify-self-end',
    title: 'col-span-2 mb-4 text-6xl/tight',
    author: 'flex items-center gap-4',
    authorImage: 'size-12 rounded-full bg-neutral-600 p-0.5',
    authorName: 'text-md text-neutral-400',
    readingTime:
      'flex items-center gap-2 justify-self-end text-sm text-neutral-400',
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

  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef)

  const { setIsVisible: setNavigationVisible } = useContext(
    WritingNavigationContext,
  )

  useEffect(() => setNavigationVisible(!isInView), [isInView])

  return (
    <div
      className={cn(className, styles.container())}
      ref={containerRef}
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
          <Tooltip label="Last modified" size="xs" side="right">
            <Badge className={styles.modifiedDate()}>
              <EditIcon className={styles.modifiedIcon()} />
              {getFormattedDate(modifiedAt, {
                weekday: 'short',
                year: 'numeric',
              })}
            </Badge>
          </Tooltip>
        )}
      </div>

      <button className={styles.shareButton()}>
        <ShareIcon />
      </button>

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
