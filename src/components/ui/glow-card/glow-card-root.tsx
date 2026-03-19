'use client'
import { createContext, useContext } from 'react'
import { useRender } from '@base-ui-components/react/use-render'
import { mergeProps } from '@base-ui-components/react/merge-props'
import { useMotionValue, type MotionValue } from 'motion/react'
import { createStyles, type StylesProps } from '~/utils/create-styles'

type GlowCardRootContextValue = {
  glowX: MotionValue<number>
  glowY: MotionValue<number>
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
}

function GlowCardRoot(props: GlowCardRootProps) {
  const { className, render, ...restProps } = props
  const styles = glowCardRootStyles()

  const glowX = useMotionValue(-1000)
  const glowY = useMotionValue(-1000)

  const element = useRender({
    defaultTagName: 'div',
    render,
    props: mergeProps<'div'>(
      {
        className: styles.container({ className }),
        onMouseMove(e) {
          const rect = e.currentTarget.getBoundingClientRect()
          glowX.set(e.clientX - rect.left)
          glowY.set(e.clientY - rect.top)
        },
      },
      restProps,
    ) as Record<string, unknown>,
  })

  return (
    <GlowCardRootContext.Provider value={{ glowX, glowY }}>
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
