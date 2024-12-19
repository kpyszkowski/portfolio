import { motion, MotionProps } from 'framer-motion'
import { Icon } from 'react-feather'
import { tv, type VariantProps } from 'tailwind-variants'

const getStyles = tv({
  slots: {
    wrapper: 'relative flex gap-2 px-4 py-2',
    icon: 'size-4',
    label: 'font-sans text-sm leading-4',
    highlight: 'absolute inset-0 size-full bg-white/20',
  },
})

interface TabsMenuItemProps
  extends VariantProps<typeof getStyles>,
    MotionProps {
  className?: string
  label: string
  icon?: Icon
  href?: string
  onClick?: React.MouseEventHandler
  _isActive?: boolean
}

export type TabsMenuItemType = Pick<
  TabsMenuItemProps,
  'label' | 'icon' | 'href' | 'onClick'
> & {
  id: string
}

function TabsMenuItem(props: TabsMenuItemProps) {
  const {
    label,
    icon: IconComponent,
    onClick,
    href,
    _isActive,
    ...restProps
  } = props

  const styles = getStyles()

  const Component = href ? 'a' : 'button'

  return (
    <motion.li {...restProps}>
      <Component className={styles.wrapper()} href={href} onClick={onClick}>
        {IconComponent && <IconComponent className={styles.icon()} />}
        <span className={styles.label()}>{label}</span>

        {_isActive && (
          <motion.span
            style={{
              borderRadius: 24 - 8 / 2,
            }}
            className={styles.highlight()}
            layoutId="tabs-menu-item-highlight"
          />
        )}
      </Component>
    </motion.li>
  )
}

export default TabsMenuItem
