'use-client'
import { Children, isValidElement } from 'react'
import {
  AlertOctagon as DangerIcon,
  Info as InfoIcon,
  CheckCircle as SuccessIcon,
  Zap as TipIcon,
  AlertTriangle as WarningIcon,
} from 'react-feather'
import { tv, type VariantProps } from 'tailwind-variants'

const getStyles = tv({
  slots: {
    container:
      'my-6 rounded-lg border-l-4 border-current px-7 py-5 neumorphism md:-mx-7',
    title: 'flex items-center gap-4 text-base',
    content: 'text-neutral-800 prose-p:my-2 dark:text-neutral-200',
    icon: '-ml-[2.85rem] size-8 bg-neutral-50 p-1.5 [mask-image:radial-gradient(black_1rem,_transparent_1rem)] dark:bg-neutral-900',
  },
  variants: {
    type: {
      tip: {
        container: 'bg-blue-600/5 text-blue-500',
      },
      note: {
        container: 'bg-zinc-600/15 text-zinc-950 dark:text-zinc-50',
      },
      warning: {
        container: 'bg-yellow-600/5 text-yellow-500',
      },
      danger: {
        container: 'bg-red-600/5 text-red-500',
      },
      success: {
        container: 'bg-green-600/5 text-green-500',
      },
    },
  },
  defaultVariants: {
    type: 'note',
  },
})

const getIconByType = (type: CalloutType) => {
  switch (type.toLowerCase()) {
    default:
    case 'note':
      return InfoIcon
    case 'tip':
      return TipIcon
    case 'warning':
      return WarningIcon
    case 'danger':
      return DangerIcon
    case 'success':
      return SuccessIcon
  }
}

export type CalloutType = 'tip' | 'warning' | 'danger' | 'success' | 'note'

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
    <aside
      className={styles.container({ className })}
      {...restProps}
    >
      <div className={styles.title()}>
        <Icon className={styles.icon()} />
        {title}
      </div>

      <div className={styles.content()}>{content}</div>
    </aside>
  )
}

export default Callout
