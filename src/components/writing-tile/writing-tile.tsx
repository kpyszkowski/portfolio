import Link from 'next/link'
import { type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { ArrowRight as ArrowIcon } from 'react-feather'
import { createStyles, type StylesProps } from '~/utils/create-styles'

const writingTileStyles = createStyles({
  slots: {
    container:
      'grid grid-flow-row grid-cols-[1fr_auto] grid-rows-[auto_1fr] items-center gap-3 lg:gap-4',
    arrowIcon:
      'col-start-2 row-start-1 size-4 justify-self-end text-main sm:size-5',
  },
})

interface WritingTileProps
  extends StylesProps<typeof writingTileStyles>,
    Omit<ComponentPropsWithoutRef<typeof Link>, 'href'> {
  className?: string
  href: string
  children: ReactNode
}

function WritingTile(props: WritingTileProps) {
  const { className, href, children, ...restProps } = props

  const styles = writingTileStyles()

  return (
    <Link
      className={styles.container({ className })}
      href={href}
      {...restProps}
    >
      {children}
      <ArrowIcon className={styles.arrowIcon()} />
    </Link>
  )
}

export { WritingTile, writingTileStyles, type WritingTileProps }
