import { Switch as SwitchPrimitive } from '@base-ui-components/react/switch'
import { createStyles, type StylesProps } from '~/utils/create-styles'

const switchStyles = createStyles({
  slots: {
    container: 'flex items-start gap-3',
    switchRoot: [
      'flex min-w-9 rounded-3xl bg-neutral-300 p-0.5',
      'hover:bg-opacity-100 focus-visible:bg-opacity-100',
      'ring-neutral-50/50 outline-none focus-visible:ring-4',
      'transition-colors data-[checked]:bg-orange-300',
      'dark:bg-neutral-600',
    ],

    thumb: [
      'size-4 rounded-full bg-neutral-50 shadow-[0_0_4px] shadow-neutral-600',
      'transition-all data-[checked]:translate-x-full',
    ],
    label: 'text-sm text-main',
  },
})

interface SwitchProps
  extends StylesProps<typeof switchStyles>,
    SwitchPrimitive.Root.Props {
  className?: string
  label: string
}

function Switch(props: SwitchProps) {
  const { className = '', label, ...restProps } = props

  const styles = switchStyles()

  return (
    <label className={styles.container({ className })}>
      <SwitchPrimitive.Root
        className={styles.switchRoot()}
        {...restProps}
      >
        <SwitchPrimitive.Thumb className={styles.thumb()} />
      </SwitchPrimitive.Root>

      <span className={styles.label()}>{label}</span>
    </label>
  )
}

export { Switch, switchStyles, type SwitchProps }
