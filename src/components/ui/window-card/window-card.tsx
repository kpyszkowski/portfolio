import cn from '@/utils/cn'
import { tv, type VariantProps } from 'tailwind-variants'

const getStyles = tv({
  slots: {
    container:
      'code-block-background relative -mx-20 my-6 rounded-3xl bg-cover p-20',
    wrapper:
      'm-0 rounded-xl bg-black/[0.64] shadow-lg backdrop-blur-lg backdrop-contrast-[0.52] backdrop-saturate-[1.24] neumorphism',
    captionWrapper: 'm-0 flex px-5 pb-6 pt-4 leading-6',
    decorator: 'w-12',
    label: 'flex-1 text-center text-xs text-neutral-300',
  },
})

interface WindowCardProps extends VariantProps<typeof getStyles> {
  className?: string
  children?: React.ReactNode
  title?: string
}

function WindowCard(props: WindowCardProps) {
  const { className = '', title, children, ...restProps } = props

  const styles = getStyles()

  return (
    <div className={cn(styles.container(), className)} {...restProps}>
      <figure className={cn(className, styles.wrapper())}>
        <figcaption className={styles.captionWrapper()}>
          <svg
            className={styles.decorator()}
            viewBox="0 0 48 12"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
          >
            <circle cx="6" cy="6" r="6" fill="#FF5F57" />
            <circle cx="24" cy="6" r="6" fill="#FFBD2E" />
            <circle cx="42" cy="6" r="6" fill="#28C840" />
          </svg>

          {title && <span className={styles.label()}>{title}</span>}
        </figcaption>

        {children}
      </figure>
    </div>
  )
}

export default WindowCard
