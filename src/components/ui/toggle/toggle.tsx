import cn from '@/utils/cn'
import * as TogglePrimitive from '@radix-ui/react-switch'
import { tv, type VariantProps } from 'tailwind-variants'

const getStyles = tv({
  slots: {
    container: 'flex items-start gap-3',
    switchRoot: [
      'flex min-w-9 rounded-3xl bg-neutral-600/75 p-0.5',
      'hover:bg-neutral-600 focus-visible:bg-neutral-600',
      'outline-none ring-neutral-50/50 focus-visible:ring-4',
      'transition-colors data-[state=checked]:bg-orange-300/85',
    ],

    thumb: [
      'size-4 rounded-full bg-neutral-50 shadow-[0_0_4px] shadow-neutral-600',
      'transition-all data-[state=checked]:translate-x-full',
    ],
    label: 'text-sm text-neutral-50',
  },
})

interface ToggleProps
  extends VariantProps<typeof getStyles>,
    TogglePrimitive.SwitchProps {
  className?: string
  label: string
}

function Toggle(props: ToggleProps) {
  const { className = '', label, ...restProps } = props

  const styles = getStyles()

  return (
    <label className={cn(className, styles.container())}>
      <TogglePrimitive.Root className={styles.switchRoot()} {...restProps}>
        <TogglePrimitive.Thumb className={styles.thumb()} />
      </TogglePrimitive.Root>

      <span className={styles.label()}>{label}</span>
    </label>
  )
}

export default Toggle
