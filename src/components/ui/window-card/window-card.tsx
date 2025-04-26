import { ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'
import WindowCardContent from '~/components/ui/window-card/window-card-content'

const getStyles = tv({
  slots: {
    container:
      'window-card-background relative -mx-16 my-10 rounded-3xl bg-cover px-16 py-3',
    wrapper: [
      'm-0 rounded-2xl backdrop-blur-2xl backdrop-saturate-200 neumorphism [clip-path:inset(0_round_1rem)]',
      'dark:backdrop-brightness-75',
    ],
    captionWrapper: 'm-0 flex items-baseline px-5 pb-6 pt-4 leading-6',
    contentWrapper: 'divide-y divide-neutral-200 dark:divide-neutral-700',
    decorator: 'z-10 w-12',
    label: 'flex-1 text-center text-xs text-neutral-600 dark:text-neutral-300',
    captionSlot: 'ml-auto',
  },
})

interface WindowCardProps extends VariantProps<typeof getStyles> {
  className?: string
  children?: React.ReactNode
  title?: string
  captionSlot?: React.ReactNode
  captionVariant?: ComponentProps<typeof WindowCardContent>['variant']
}

function WindowCardRoot(props: WindowCardProps) {
  const {
    className = '',
    title,
    captionSlot,
    children,
    captionVariant,
    ...restProps
  } = props

  const styles = getStyles()

  return (
    <div
      className={styles.container({ className })}
      {...restProps}
    >
      <figure className={styles.wrapper()}>
        <WindowCardContent
          as="figcaption"
          className={styles.captionWrapper()}
          variant={captionVariant}
        >
          <svg
            className={styles.decorator()}
            viewBox="0 0 48 12"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
          >
            <circle
              cx="6"
              cy="6"
              r="6"
              fill="#FF5F57"
            />
            <circle
              cx="24"
              cy="6"
              r="6"
              fill="#FFBD2E"
            />
            <circle
              cx="42"
              cy="6"
              r="6"
              fill="#28C840"
            />
          </svg>
          {title && <span className={styles.label()}>{title}</span>}

          {captionSlot && (
            <div className={styles.captionSlot()}>{captionSlot}</div>
          )}
        </WindowCardContent>

        <div className={styles.contentWrapper()}>{children}</div>
      </figure>
    </div>
  )
}

const WindowCard = Object.assign(WindowCardRoot, { Content: WindowCardContent })

export default WindowCard
