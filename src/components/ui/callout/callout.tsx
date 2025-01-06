'use-client'
import cn from '@/utils/cn'
import { Children, isValidElement } from 'react'
import {
  AlertOctagon as DangerIcon,
  Info as InfoIcon,
  CheckCircle as SuccessIcon,
  AlertTriangle as WarningIcon,
} from 'react-feather'
import { tv, type VariantProps } from 'tailwind-variants'

const getStyles = tv({
  slots: {
    container:
      'rounded-lg border-l-4 border-current px-7 py-5 neumorphism md:-mx-7',
    title: 'flex items-center gap-4 text-base',
    content: 'text-neutral-200 prose-p:my-2',
    icon: '-ml-[2.85rem] size-8 bg-neutral-900 p-1.5 [mask-image:radial-gradient(black_1rem,_transparent_1rem)]',
  },
  variants: {
    type: {
      note: {
        container: 'bg-blue-600/5 text-blue-400',
      },
      warning: {
        container: 'bg-yellow-600/5 text-yellow-400',
      },
      danger: {
        container: 'bg-red-600/5 text-red-400',
      },
      success: {
        container: 'bg-green-600/5 text-green-400',
      },
    },
  },
})

const getIconByType = (type: CalloutType) => {
  switch (type) {
    default:
    case 'note':
      return InfoIcon
    case 'warning':
      return WarningIcon
    case 'danger':
      return DangerIcon
    case 'success':
      return SuccessIcon
  }
}

export type CalloutType = 'note' | 'warning' | 'danger' | 'success'

interface CalloutProps extends VariantProps<typeof getStyles> {
  className?: string
  type: CalloutType
  children: React.ReactNode
}

function Callout(props: CalloutProps) {
  const { className = '', type, children, ...restProps } = props

  const styles = getStyles({ type })
  const Icon = getIconByType(type)

  const [title, content] = Children.toArray(children).filter(isValidElement)

  return (
    <aside className={cn(styles.container(), className)} {...restProps}>
      <div className={styles.title()}>
        <Icon className={styles.icon()} />
        {title}
      </div>

      <div className={styles.content()}>{content}</div>
    </aside>
  )
}

export default Callout
