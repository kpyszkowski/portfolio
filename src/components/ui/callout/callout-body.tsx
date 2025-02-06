import { tv, type VariantProps } from 'tailwind-variants'

const getStyles = tv({
  slots: {
    container: '',
  },
})

interface CalloutBodyProps extends VariantProps<typeof getStyles> {
  className?: string
  children: React.ReactNode
}

function CalloutBody(props: CalloutBodyProps) {
  const { className = '', children, ...restProps } = props

  const styles = getStyles()

  return (
    <div
      className={styles.container({ className })}
      {...restProps}
    >
      {children}
    </div>
  )
}

export default CalloutBody
