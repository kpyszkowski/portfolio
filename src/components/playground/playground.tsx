import cn from '@/utils/cn'
import { tv, type VariantProps } from 'tailwind-variants'

const getStyles = tv({
  slots: {
    container: '',
  }
})

interface PlaygroundProps extends VariantProps<typeof getStyles> {
  className?: string
}

function Playground(props: PlaygroundProps) {
  const { className = '', ...restProps } = props

  const styles = getStyles()

  return (
  <div className={cn(className, styles.container())} {...restProps}>

  </div>
  )
}

export default Playground