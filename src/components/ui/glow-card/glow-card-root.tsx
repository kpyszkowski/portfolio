'use client'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react'
import { useRender } from '@base-ui-components/react/use-render'
import { mergeProps } from '@base-ui-components/react/merge-props'
import { useMotionValue, type MotionValue } from 'motion/react'
import { createStyles, type StylesProps } from '~/utils/create-styles'
import useMousePosition from '~/hooks/use-mouse-position'

type GlowCardRootContextValue = {
  glowX: MotionValue<number>
  glowY: MotionValue<number>
  animate: boolean
}

const GlowCardRootContext = createContext<GlowCardRootContextValue | null>(null)

const useGlowCardRootContext = () => useContext(GlowCardRootContext)

const glowCardRootStyles = createStyles({
  slots: {
    container: 'relative',
  },
})

interface GlowCardRootProps
  extends useRender.ComponentProps<'div'>,
    StylesProps<typeof glowCardRootStyles> {
  className?: string
  animate?: boolean
}

function GlowCardRoot(props: GlowCardRootProps) {
  const { className, render, animate = false, ...restProps } = props
  const styles = glowCardRootStyles()

  const glowX = useMotionValue(-1000)
  const glowY = useMotionValue(-1000)

  const containerRef = useRef<HTMLDivElement | null>(null)
  const { x: mouseX, y: mouseY } = useMousePosition()

  const setContainerRef = useCallback((el: HTMLDivElement | null) => {
    containerRef.current = el
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const updateGlow = () => {
      if (animate) return
      const rect = el.getBoundingClientRect()
      glowX.set(mouseX.get() - rect.left)
      glowY.set(mouseY.get() - rect.top)
    }

    const unsubX = mouseX.on('change', updateGlow)
    const unsubY = mouseY.on('change', updateGlow)
    window.addEventListener('scroll', updateGlow, { passive: true })

    return () => {
      unsubX()
      unsubY()
      window.removeEventListener('scroll', updateGlow)
    }
  }, [animate, glowX, glowY, mouseX, mouseY])

  const element = useRender({
    defaultTagName: 'div',
    render,
    ref: setContainerRef,
    props: mergeProps<'div'>(
      { className: styles.container({ className }) },
      restProps,
    ) as Record<string, unknown>,
  })

  return (
    <GlowCardRootContext.Provider value={{ glowX, glowY, animate }}>
      {element}
    </GlowCardRootContext.Provider>
  )
}

export {
  GlowCardRoot,
  glowCardRootStyles,
  useGlowCardRootContext,
  type GlowCardRootProps,
  type GlowCardRootContextValue,
}
