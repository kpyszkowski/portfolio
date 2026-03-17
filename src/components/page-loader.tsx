'use client'
import { useState } from 'react'
import { useProgress } from '@react-three/drei'
import { motion, useMotionValue, useTransform } from 'motion/react'
import { Logo } from '~/components/logo'
import { createStyles } from '~/utils/create-styles'

const pageLoaderStyles = createStyles({
  slots: {
    root: 'fixed inset-0 z-50',
    backdrop: 'absolute inset-0 bg-black/25 backdrop-blur-md',
    panel: 'absolute inset-0 flex items-center justify-center bg-main',
    inner: 'flex w-full max-w-sm flex-col gap-3 px-4',
    header: 'flex items-center justify-between',
    percentage: 'text-highlight tabular-nums',
    track: 'relative h-px w-full overflow-hidden bg-elevated',
    fill: 'absolute inset-y-0 left-0 w-full origin-left bg-[var(--color-main)]',
    hint: 'font-sans text-xs/snug text-highlight',
  },
})

const isMobile =
  typeof navigator !== 'undefined' &&
  /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)

interface PageLoaderProps {
  onReady: () => void
}

function PageLoader(props: PageLoaderProps) {
  const { onReady } = props

  const styles = pageLoaderStyles()
  const { active, progress, loaded } = useProgress()
  const isComplete = loaded > 0 && !active && progress >= 100

  const [isFilled, setIsFilled] = useState(false)

  const fillScale = useMotionValue(0)
  const displayPct = useTransform(fillScale, (v) => Math.round(v * 100))

  return (
    <div className={styles.root()}>
      <motion.div
        className={styles.backdrop()}
        animate={{ opacity: isFilled ? 0 : 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
      <motion.div
        className={styles.panel()}
        initial={false}
        animate={{ y: isFilled ? '-100%' : 0 }}
        transition={{ type: 'spring', stiffness: 180, damping: 28, mass: 0.9 }}
        onAnimationComplete={(definition) => {
          const def = definition as { y?: string | number }
          if (def.y === '-100%') onReady()
        }}
      >
        <div className={styles.inner()}>
          <div className={styles.header()}>
            <Logo />
            <motion.span className={styles.percentage()}>
              {displayPct}
            </motion.span>
          </div>
          <div className={styles.track()}>
            <motion.div
              className={styles.fill()}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isComplete ? 1 : 0.82 }}
              transition={
                isComplete
                  ? { type: 'spring', stiffness: 200, damping: 28 }
                  : { type: 'spring', stiffness: 18, damping: 14, mass: 1 }
              }
              onUpdate={({ scaleX }) => fillScale.set(scaleX as number)}
              onAnimationComplete={(definition) => {
                const def = definition as { scaleX?: number }
                if (def.scaleX === 1) setIsFilled(true)
              }}
            />
          </div>
          {isMobile && (
            <p className={styles.hint()}>
              Disable low power mode for best experience
            </p>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export { PageLoader, type PageLoaderProps }
