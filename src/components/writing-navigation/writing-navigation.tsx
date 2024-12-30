'use client'
import cn from '@/utils/cn'
import getSelectorFromId from '@/utils/get-selector-from-id'
import {
  AnimatePresence,
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import { createContext, useMemo, useState } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const getStyles = tv({
  slots: {
    container: 'fixed inset-0 mx-auto w-full max-w-[1800px]',
    wrapper:
      'absolute bottom-0 left-0 z-30 m-4 flex flex-col justify-end overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900/75 p-4 shadow-md backdrop-blur-md',
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
  currentProgress: MotionValue<number>
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export const WritingNavigationContext =
  createContext<WritingNavigationContextValue>({
    currentItemId: '',
    setCurrentItemId: () => {},
    currentProgress: new MotionValue(),
    setIsVisible: () => {},
  })

function WritingNavigation(props: WritingNavigationProps) {
  const { className = '', children, items, ...restProps } = props

  const styles = getStyles()

  const [currentItemId, setCurrentItemId] = useState<string>(items[0].id)
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const currentChapterNumber =
    items.findIndex((item) => item.id === currentItemId) + 1

  const currentProgress = useMotionValue(0)
  const smoothCurrentProgress = useSpring(currentProgress, {
    damping: 20,
    stiffness: 160,
  })
  const strokeDashoffset = useTransform(smoothCurrentProgress, [0, 1], [88, 0])

  const contextValue = useMemo<WritingNavigationContextValue>(
    () => ({
      currentItemId,
      setCurrentItemId,
      currentProgress,
      setIsVisible,
    }),
    [currentItemId, currentProgress],
  )

  return (
    <WritingNavigationContext.Provider value={contextValue}>
      {children}

      <AnimatePresence>
        {isVisible && (
          <motion.div
            layoutRoot
            className={cn(className, styles.container())}
            initial={{ opacity: 0, y: 96 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 96 }}
          >
            <motion.div
              className={styles.wrapper()}
              onClick={() => setIsExpanded((isExpanded) => !isExpanded)}
              layout
              {...restProps}
            >
              <AnimatePresence mode="popLayout">
                {isExpanded && (
                  <motion.div
                    layout="position"
                    initial={{ y: 64, opacity: 0 }}
                    exit={{ y: 64, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                  >
                    <h2 className="mb-3 text-xs uppercase text-neutral-400">
                      Table of Contents{' '}
                    </h2>
                    <ul className="flex flex-col gap-2 text-sm">
                      {props.items.map((item) => (
                        <li key={item.id}>
                          <a href={getSelectorFromId(item.id)}>{item.title}</a>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence mode="popLayout" initial={false}>
                {!isExpanded && (
                  <motion.div
                    layout="position"
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, y: 32 }}
                    exit={{ opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <svg viewBox="0 0 32 32" className="size-10 rotate-90">
                      <circle
                        className="fill-none stroke-neutral-600 stroke-2"
                        strokeWidth="2"
                        cx="16"
                        cy="16"
                        r="14"
                      />

                      <motion.circle
                        className="fill-none stroke-red-500 stroke-2"
                        strokeWidth="2"
                        cx="16"
                        cy="16"
                        r="14"
                        strokeDasharray="88"
                        style={{
                          strokeDashoffset,
                        }}
                      />
                    </svg>

                    <div className="flex flex-col gap-1">
                      <span className="text-xs uppercase text-neutral-400">
                        Chapter {currentChapterNumber}
                      </span>

                      <span className="text-sm">
                        {items.find((item) => item.id === currentItemId)?.title}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </WritingNavigationContext.Provider>
  )
}

export default WritingNavigation
