import { Children, isValidElement } from 'react'
import {
  AlertOctagon as DangerIcon,
  Info as InfoIcon,
  CheckCircle as SuccessIcon,
  Zap as TipIcon,
  AlertTriangle as WarningIcon,
} from 'react-feather'
import { createStyles, type StylesProps } from '~/utils/create-styles'
import { BulbIcon } from '~/assets/icons'

const calloutStyles = createStyles({
  slots: {
    container:
      'my-6 rounded-lg border-l-4 border-current px-7 py-5 neumorphism md:-mx-7',
    title: 'flex items-center gap-4 text-base',
    content: 'text-secondary prose-p:my-2',
    icon: '-ml-11 size-7 bg-primary [mask-image:radial-gradient(black_1rem,_transparent_1rem)] p-1.5',
  },
  variants: {
    type: {
      tip: {
        container: 'bg-blue-600/5 text-blue-500',
      },
      note: {
        container: 'bg-zinc-600/5 text-primary dark:bg-zinc-600/15',
      },
      warning: {
        container: 'bg-yellow-600/5 text-yellow-400',
      },
      danger: {
        container: 'bg-red-600/5 text-red-500',
      },
      success: {
        container: 'bg-green-600/5 text-green-500',
      },
      insight: {
        container: 'bg-fuchsia-600/5 text-fuchsia-400',
      },
    },
  },
  defaultVariants: {
    type: 'note',
  },
})

const getIconByType = (type?: CalloutType) => {
  switch (type?.toLowerCase()) {
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
    case 'insight':
      return BulbIcon
  }
}

type CalloutType = 'tip' | 'warning' | 'danger' | 'success' | 'note' | 'insight'

interface CalloutProps extends StylesProps<typeof calloutStyles> {
  className?: string
  type: CalloutType
  children: React.ReactNode
}

function Callout(props: CalloutProps) {
  const { className = '', type, children, ...restProps } = props

  const styles = calloutStyles({ type })

  const Icon = getIconByType(type)

  const [title, content] = Children.toArray(children).filter(isValidElement)

  return (
    <aside
      className={styles.container({ className })}
      {...restProps}
    >
      <div className={styles.title()}>
        {/* eslint-disable-next-line react-hooks/static-components */}
        <Icon className={styles.icon()} />
        {title}
      </div>

      <div className={styles.content()}>{content}</div>
    </aside>
  )
}

export { Callout, calloutStyles, type CalloutProps, type CalloutType }
