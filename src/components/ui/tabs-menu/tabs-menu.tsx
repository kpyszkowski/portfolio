'use client'
import { motion } from 'motion/react'
import { useState } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'
import TabsMenuItem, {
  type TabsMenuItemType,
} from '~/components/ui/tabs-menu/tabs-menu-item'
import cn from '~/utils/cn'

const getStyles = tv({
  slots: {
    container:
      'group bg-opacity-60 neumorphism md:bg-opacity-75 bg-secondary relative inline-block overflow-hidden rounded-3xl',
    wrapper:
      'flex items-center divide-x divide-neutral-500/25 overflow-hidden p-2',
    list: 'inline-flex gap-1 md:gap-3',
    glare:
      'bg-tertiary/48 pointer-events-none absolute -inset-12 size-24 rounded-full opacity-0 blur-2xl transition-opacity group-hover:opacity-100',
  },
})

interface TabsMenuProps extends VariantProps<typeof getStyles> {
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

  const styles = getStyles()

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

export default TabsMenu
