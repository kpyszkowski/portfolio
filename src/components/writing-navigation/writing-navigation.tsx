'use client'
import {
  AnimatePresence,
  motion,
  MotionValue,
  Transition,
  useMotionValue,
} from 'motion/react'
import { createContext, useCallback, useMemo, useState } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'
import { Progress } from '~/components/ui/progress'
import useOutsideClick from '~/hooks/use-outside-click'
import getSelectorFromId from '~/utils/get-selector-from-id'

// TODO: Investigate and improve a11y

const HUD_HEIGHT = 72 // px, height of the HUD

const getStyles = tv({
  slots: {
    container:
      'fixed bottom-4 left-4 z-30 overflow-hidden border border-neutral-200 bg-neutral-100/85 shadow-md backdrop-blur-md dark:border-neutral-700 dark:bg-neutral-800/75',
    chaptersWrapper: 'p-4',
    chaptersLabel: 'mb-2 text-xs text-neutral-400 uppercase',
    chaptersList: 'flex flex-col text-sm',
    chaptersListButton:
      'block w-full py-1 text-start transition-transform hover:translate-x-1 focus-visible:translate-x-1 active:translate-x-2',
    chaptersTriggerButton: 'relative flex items-center gap-4 p-4',
    indicatorLabelsWrapper: 'flex flex-col gap-1 text-left',
    indicatorChapterLabel:
      'text-xs text-neutral-500 uppercase dark:text-neutral-400',
    indicatorChapterName: 'text-sm whitespace-nowrap',
  },
})

const transition: Transition = {
  type: 'spring',
  stiffness: 180,
  damping: 20,
}

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
        animate={{
          y: isVisible ? 0 : HUD_HEIGHT * 1.5,
          borderRadius: 8,
        }}
        className={styles.container({ className })}
        layout
        transition={transition}
        {...restProps}
      >
        <AnimatePresence
          mode="popLayout"
          initial={false}
          custom={isExpanded}
        >
          {isExpanded && isVisible ? (
            <motion.div
              className={styles.chaptersWrapper()}
              ref={chaptersWrapperRef}
              initial={{ y: HUD_HEIGHT }}
              exit={{ y: HUD_HEIGHT }}
              animate={{ y: 0 }}
              transition={transition}
              layout
              key="chapters-wrapper"
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
          ) : (
            <motion.button
              onClick={() => setIsExpanded(true)}
              className={styles.chaptersTriggerButton()}
              initial={{
                y: -HUD_HEIGHT,
              }}
              animate={{ y: 0 }}
              exit={{
                y: -HUD_HEIGHT,
              }}
              transition={transition}
              layout="position"
              key={`chapters-trigger-button=${currentItemId}`}
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
