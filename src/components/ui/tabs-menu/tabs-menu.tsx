'use client'
import TabsMenuItem, {
  type TabsMenuItemType,
} from '@/components/ui/tabs-menu/tabs-menu-item'
import cn from '@/utils/cn'
import { motion, SpringOptions, useMotionValue, useSpring } from 'framer-motion'
import { useState } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const SPRING_OPTIONS: SpringOptions = {
  damping: 16,
  stiffness: 120,
}

const getStyles = tv({
  slots: {
    container:
      'group inline-block overflow-hidden rounded-3xl bg-neutral-500 bg-opacity-10 backdrop-blur-sm backdrop-brightness-[0.65] backdrop-contrast-[0.85] backdrop-saturate-[1.5] neumorphism md:bg-opacity-25',
    wrapper:
      'relative flex items-center divide-x divide-neutral-500/25 overflow-hidden p-2',
    list: 'inline-flex gap-1 md:gap-3',
    glare:
      'pointer-events-none absolute -inset-12 size-24 rounded-full bg-neutral-500/20 opacity-0 blur-2xl transition-opacity group-hover:opacity-100',
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

  const glareX = useMotionValue(0)
  const glareY = useMotionValue(0)

  const smoothGlareX = useSpring(glareX, SPRING_OPTIONS)
  const smoothGlareY = useSpring(glareY, SPRING_OPTIONS)

  const handleSetGlarePosition: React.MouseEventHandler = (event) => {
    const containerRect = event.currentTarget.getBoundingClientRect()
    if (!containerRect) return

    const x = event.clientX - containerRect.left
    const y = event.clientY - containerRect.top

    glareX.set(x)
    glareY.set(y)
  }

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
      className={cn(className, styles.container())}
      onMouseMove={handleSetGlarePosition}
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

      <motion.span
        className={styles.glare()}
        style={{
          x: smoothGlareX,
          y: smoothGlareY,
        }}
      />
    </div>
  )
}

export default TabsMenu
