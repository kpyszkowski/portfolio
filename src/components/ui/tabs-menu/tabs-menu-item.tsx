import { motion, MotionProps } from 'motion/react'
import Link from 'next/link'
import { Icon } from 'react-feather'
import { createStyles, type StylesProps } from '~/utils/create-styles'
import { Tooltip } from '~/components/ui/tooltip'

const tabsMenuItemStyles = createStyles({
  slots: {
    wrapper: 'relative flex px-3.5 py-1 md:px-5 md:py-1.5',
    icon: 'size-4',
    label: 'text-xs leading-4 text-main md:text-sm',
    highlight: 'absolute inset-0 -z-10 size-full bg-highlight',
  },
  variants: {
    disabled: {
      true: {
        label: 'text-highlight',
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
  extends StylesProps<typeof tabsMenuItemStyles>,
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

type TabsMenuItemType = Pick<
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
  const styles = tabsMenuItemStyles({ disabled })

  const LinkComponent = isExternal ? 'a' : Link
  const Component = href ? LinkComponent : 'button'

  return (
    <motion.li
      layout="size"
      {...restProps}
    >
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

export {
  TabsMenuItem,
  tabsMenuItemStyles,
  type TabsMenuItemProps,
  type TabsMenuItemType,
}
