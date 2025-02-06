'use client'
import {
  AnimatePresence,
  motion,
  MotionValue,
  useMotionValue,
} from 'motion/react'
import { createContext, useCallback, useMemo, useState } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'
import { Progress } from '~/components/ui/progress'
import useOutsideClick from '~/hooks/use-outside-click'
import cn from '~/utils/cn'
import getSelectorFromId from '~/utils/get-selector-from-id'

// TODO: Investigate and improve a11y

const getStyles = tv({
  slots: {
    container: [
      'fixed bottom-0 left-0 z-30 m-4 rounded-lg p-4 shadow-md backdrop-blur-md',
      'overflow-hidden',
      'border border-neutral-800 bg-neutral-900/85',
    ],
    chaptersLabel: 'mb-2 text-xs uppercase text-neutral-400',
    chaptersList: 'flex flex-col text-sm',
    chaptersListButton:
      'block w-full py-1 text-start transition-transform hover:translate-x-1 focus-visible:translate-x-1 active:translate-x-2',
    chaptersTriggerButton: 'relative -m-4 flex items-center gap-4 p-4',
    indicatorLabelsWrapper: 'flex flex-col gap-1 text-left',
    indicatorChapterLabel: 'text-xs uppercase text-neutral-400',
    indicatorChapterName: 'text-sm',
  },
})

export type WritingNavigationItem = {
  id: string
  title: string
}

interface WritingNavigationProps extends VariantProps<typeof getStyles> {
  className?: string
  items: WritingNavigationItem[]
  children: React.ReactNode
}

type WritingNavigationContextValue = {
  currentItemId: string
  setCurrentItemId: React.Dispatch<React.SetStateAction<string>>
  currentProgress: MotionValue
  isVisible: boolean
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
  itemsCount: number
  getItemIndexById: (id: string) => number
}

export const WritingNavigationContext =
  createContext<WritingNavigationContextValue>({
    currentItemId: '',
    setCurrentItemId: () => {},
    currentProgress: new MotionValue(),
    isVisible: false,
    setIsVisible: () => {},
    itemsCount: 0,
    getItemIndexById: () => 0,
  })

function WritingNavigation(props: WritingNavigationProps) {
  const { className = '', children, items, ...restProps } = props

  const styles = getStyles()

  const [currentItemId, setCurrentItemId] = useState(items[0].id)
  const currentProgress = useMotionValue(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const currentChapterNumber =
    items.findIndex((item) => item.id === currentItemId) + 1

  const itemsCount = items.length

  const getItemIndexById = useCallback(
    (id: string) => items.findIndex((item) => item.id === id),
    [items],
  )

  const contextValue = useMemo<WritingNavigationContextValue>(
    () => ({
      currentItemId,
      setCurrentItemId,
      currentProgress,
      isVisible,
      setIsVisible,
      itemsCount,
      getItemIndexById,
    }),
    [currentItemId, currentProgress, getItemIndexById, isVisible, itemsCount],
  )

  const chaptersWrapperRef = useOutsideClick<HTMLDivElement>(() =>
    setIsExpanded(false),
  )

  const handleGoToChapter = (id: string) => {
    const element = document.querySelector(getSelectorFromId(id))
    if (!element) return
    element.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <WritingNavigationContext.Provider value={contextValue}>
      {children}

      <motion.div
        initial={false}
        animate={{ y: isVisible ? 0 : 256, opacity: isVisible ? 1 : 0 }}
        transition={{
          type: 'spring',
          damping: 14,
          stiffness: 72,
        }}
        className={cn(styles.container(), className)}
        layout
        {...restProps}
      >
        <AnimatePresence mode="popLayout">
          {isExpanded && (
            <motion.div
              ref={chaptersWrapperRef}
              layout="position"
              initial={{ y: 64 }}
              exit={{ y: 64 }}
              animate={{ y: 0 }}
            >
              <h2 className={styles.chaptersLabel()}>Chapters</h2>
              <ul className={styles.chaptersList()}>
                {items.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => handleGoToChapter(item.id)}
                      className={styles.chaptersListButton()}
                    >
                      {item.title}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence
          mode="popLayout"
          initial={false}
        >
          {!isExpanded && (
            <motion.button
              onClick={() => setIsExpanded(true)}
              layout="position"
              className={styles.chaptersTriggerButton()}
              initial={{ y: -128 }}
              exit={{ y: -128 }}
              animate={{ y: 0 }}
            >
              <Progress
                value={currentProgress}
                max={1}
              />

              <div className={styles.indicatorLabelsWrapper()}>
                <span className={styles.indicatorChapterLabel()}>
                  Chapter {currentChapterNumber}
                </span>

                <span className={styles.indicatorChapterName()}>
                  {items.find((item) => item.id === currentItemId)?.title}
                </span>
              </div>
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </WritingNavigationContext.Provider>
  )
}

export default WritingNavigation
