'use client'
import { motion } from 'motion/react'
import { useState } from 'react'
import { createStyles, type StylesProps } from '~/utils/create-styles'
import {
  TabsMenuItem,
  type TabsMenuItemType,
} from '~/components/ui/tabs-menu/tabs-menu-item'
import cn from '~/utils/cn'

const tabsMenuStyles = createStyles({
  slots: {
    container:
      'group bg-opacity-60 md:bg-opacity-75 relative inline-block overflow-hidden rounded-3xl bg-elevated neumorphism',
    wrapper:
      'flex items-center divide-x divide-highlight/25 overflow-hidden p-2',
    list: 'relative isolate inline-flex gap-1 md:gap-3',
  },
})

interface TabsMenuProps extends StylesProps<typeof tabsMenuStyles> {
  className?: string
  items: TabsMenuItemType[]
  defaultActive?: number
  renderBefore?: React.ReactNode
  renderAfter?: React.ReactNode
}

function TabsMenu(props: TabsMenuProps) {
  const {
    className = '',
    items,
    defaultActive = 0,
    renderBefore,
    renderAfter,
    ...restProps
  } = props

  const styles = tabsMenuStyles()

  const [activeItemIndex, setActiveItemIndex] = useState(defaultActive)

  const getItemClickHandler =
    (
      index: number,
      callback?: React.MouseEventHandler,
    ): React.MouseEventHandler =>
    (event) => {
      setActiveItemIndex(index)
      callback?.(event)
    }

  return (
    <div
      className={styles.container({ className })}
      {...restProps}
    >
      <div className={styles.wrapper()}>
        {renderBefore && renderBefore}

        <motion.ul
          className={cn(
            styles.list(),
            renderBefore && 'ml-2 pl-2',
            renderAfter && 'mr-2 pr-2',
          )}
          role="tablist"
          aria-orientation="horizontal"
        >
          {items.map(({ id, onClick, ...restItem }, index) => (
            <TabsMenuItem
              key={id}
              initial={{
                filter: 'blur(32px) opacity(25%)',
              }}
              animate={{
                filter: 'blur(0) opacity(100%)',
                transition: {
                  ease: 'easeOut',
                  duration: 1.24,
                  delay: index * 0.16,
                },
              }}
              {...restItem}
              _active={activeItemIndex === index}
              onClick={getItemClickHandler(index, onClick)}
            />
          ))}
        </motion.ul>

        {renderAfter && renderAfter}
      </div>
    </div>
  )
}

export { TabsMenu, tabsMenuStyles, type TabsMenuProps }
