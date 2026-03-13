import {
  AlertOctagon as DangerIcon,
  Info as InfoIcon,
  CheckCircle as SuccessIcon,
  AlertTriangle as WarningIcon,
} from 'react-feather'
import { createStyles, type StylesProps } from '~/utils/create-styles'
import { CalloutType } from '~/components/ui/callout/callout'

const calloutTitleStyles = createStyles({
  slots: {
    container: '',
  },
})

const getIconByType = (type: CalloutType) => {
  switch (type) {
    default:
    case 'tip':
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

interface CalloutTitleProps extends StylesProps<typeof calloutTitleStyles> {
  className?: string
  children: string
  isFoldable: boolean
  defaultFolded?: boolean
  type: CalloutType
}

function CalloutTitle(props: CalloutTitleProps) {
  const {
    className = '',
    children,
    isFoldable,
    defaultFolded,
    type,
    ...restProps
  } = props

  const styles = calloutTitleStyles()

  const Element = isFoldable ? 'details' : 'span'

  const Icon = getIconByType(type)

  return (
    <Element
      open={!defaultFolded}
      className={styles.container({ className })}
      {...restProps}
    >
      {/* eslint-disable-next-line react-hooks/static-components */}
      <Icon className="mr-2 inline-block" />

      {children}
    </Element>
  )
}

export { CalloutTitle, calloutTitleStyles, type CalloutTitleProps }
