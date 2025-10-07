import { motion, MotionProps } from 'motion/react'
import Link from 'next/link'
import { Icon } from 'react-feather'
import { tv, type VariantProps } from 'tailwind-variants'
import { Tooltip } from '~/components/ui/tooltip'

const getStyles = tv({
  slots: {
    wrapper: 'relative flex px-3.5 py-1 md:px-5 md:py-1.5',
    icon: 'size-4',
    label: 'text-primary text-xs leading-4 md:text-sm',
    highlight: 'bg-tertiary absolute inset-0 -z-10 size-full',
  },
  variants: {
    disabled: {
      true: {
        label: 'text-tertiary',
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

const TabsMenuItem = (props: TabsMenuItemProps) => {
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
        sideOffset={16}
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
