import { createStyles, type StylesProps } from '~/utils/create-styles'

const calloutBodyStyles = createStyles({
  slots: {
    container: '',
  },
})

interface CalloutBodyProps extends StylesProps<typeof calloutBodyStyles> {
  className?: string
  children: React.ReactNode
}

function CalloutBody(props: CalloutBodyProps) {
  const { className = '', children, ...restProps } = props

  const styles = calloutBodyStyles()

  return (
    <div
      className={styles.container({ className })}
      {...restProps}
    >
      {children}
    </div>
  )
}

export { CalloutBody, calloutBodyStyles, type CalloutBodyProps }
