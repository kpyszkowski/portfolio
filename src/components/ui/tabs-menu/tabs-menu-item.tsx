import { Tooltip } from '@/components/ui/tooltip'
import { motion, MotionProps } from 'framer-motion'
import Link from 'next/link'
import { Icon } from 'react-feather'
import { tv, type VariantProps } from 'tailwind-variants'

const getStyles = tv({
  slots: {
    wrapper: 'relative flex gap-2 px-4 py-2',
    icon: 'size-4',
    label: 'font-sans text-sm leading-4',
    highlight: 'inset-0 size-full bg-white/20',
  },
  variants: {
    disabled: {
      true: {
        label: 'text-neutral-400',
        highlight: 'bg-transparent',
        wrapper: 'cursor-not-allowed',
      },
    },
  },
  defaultVariants: {
    disabled: false,
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
  _active?: boolean
  disabled?: boolean
  isExternal?: boolean
  disabledLabel?: string
}

export type TabsMenuItemType = Pick<
  TabsMenuItemProps,
  | 'label'
  | 'icon'
  | 'href'
  | 'onClick'
  | 'disabled'
  | 'disabledLabel'
  | 'isExternal'
> & {
  id: string
}

function TabsMenuItem(props: TabsMenuItemProps) {
  const {
    label,
    icon: IconComponent,
    onClick,
    href,
    _active,
    disabled,
    disabledLabel = '',
    isExternal,
    ...restProps
  } = props

  const styles = getStyles({ disabled })

  const LinkComponent = isExternal ? 'a' : Link
  const Component = href ? LinkComponent : 'button'

  return (
    <motion.li {...restProps}>
      <Tooltip
        label={disabledLabel}
        disabled={!disabled}
        size="xs"
        sideOffset={12}
      >
        <Component
          className={styles.wrapper()}
          href={href!} // `href` is already defined
          onClick={onClick}
          disabled={disabled}
        >
          {IconComponent && <IconComponent className={styles.icon()} />}
          <span className={styles.label()}>{label}</span>

          {_active && (
            <motion.span
              style={{
                borderRadius: 24 - 8 / 2,
              }}
              className={styles.highlight()}
              layoutId="tabs-menu-item-highlight"
            />
          )}
        </Component>
      </Tooltip>
    </motion.li>
  )
}

export default TabsMenuItem
