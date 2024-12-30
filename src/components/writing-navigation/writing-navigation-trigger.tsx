'use client'
import { WritingNavigationContext } from './writing-navigation'
import { useMotionValueEvent, useScroll } from 'framer-motion'
import { useContext, useRef } from 'react'

interface WritingNavigationTriggerProps {
  className?: string
  children?: React.ReactNode
}

function WritingNavigationTrigger(props: WritingNavigationTriggerProps) {
  const ref = useRef<HTMLElement>(null)
  const { setCurrentItemId, currentProgress } = useContext(
    WritingNavigationContext,
  )

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    currentProgress.set(progress)

    setCurrentItemId((previousId) => {
      const id = ref.current?.querySelector('* > h2')?.id
      if (id && id !== previousId) {
        return id
      }
      return previousId
    })
  })

  return <section ref={ref} {...props} />
}

export default WritingNavigationTrigger
