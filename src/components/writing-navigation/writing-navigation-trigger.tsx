'use client'
import { useMotionValueEvent, useScroll } from 'motion/react'
import { useContext, useRef } from 'react'
import { WritingNavigationContext } from '~/components/writing-navigation/writing-navigation'

interface WritingNavigationTriggerProps {
  className?: string
  children?: React.ReactNode
}

function WritingNavigationTrigger(props: WritingNavigationTriggerProps) {
  const ref = useRef<HTMLElement>(null)
  const {
    setCurrentItemId,
    currentProgress,
    itemsCount,
    setIsVisible,
    getItemIndexById,
  } = useContext(WritingNavigationContext)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    currentProgress.set(progress)

    const id = ref.current?.querySelector('* > h2')?.id
    if (!id) return

    setCurrentItemId((previousId) => (id !== previousId ? id : previousId))

    const itemIndex = getItemIndexById(id)
    const lastItemIndex = itemsCount - 1

    const isInProgress = itemIndex !== 0 && itemIndex < lastItemIndex
    const hasFirstItemStarted = itemIndex === 0 && progress > 0.45
    const hasLastItemFinished = itemIndex === lastItemIndex && progress < 1

    setIsVisible(isInProgress || hasFirstItemStarted || hasLastItemFinished)
  })

  return (
    <section
      ref={ref}
      {...props}
    />
  )
}

export default WritingNavigationTrigger
