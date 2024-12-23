'use client'
import cn from '@/utils/cn'
import { tv, type VariantProps } from 'tailwind-variants'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import React from 'react'
import { AnimatePresence, motion, Transition, Variants } from 'framer-motion'

const getStyles = tv({
  slots: {
    container:
      'rounded-3xl bg-neutral-500/50 px-5 py-0.5 font-sans text-neutral-200 backdrop-blur-sm',
    arrow: 'fill-neutral-500/50 backdrop-blur-sm',
    triggerContent: 'font-sans',
  },
  variants: {
    size: {
      xs: {
        container: 'px-3 py-0.5 text-xs',
        arrow: 'h-1 w-2',
      },
      sm: {
        container: 'px-4 py-0.5 text-sm',
        arrow: 'h-1 w-2',
      },
      md: {
        container: 'px-4 py-1 text-base',
        arrow: 'h-1.5 w-3',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const contentVariants: Variants = {
  hidden: { opacity: 0, scale: 0.75 },
  visible: { opacity: 1, scale: 1 },
}

const contentTransition: Transition = {
  ease: [1, 0, 0.4, 0.8],
  duration: 0.24,
}

interface TooltipProps
  extends VariantProps<typeof getStyles>,
    Omit<TooltipPrimitive.TooltipContentProps, 'asChild' | 'forceMount'> {
  className?: string
  children: React.ReactNode
  label: string
  disabled?: boolean
}

function Tooltip(props: TooltipProps) {
  const {
    className = '',
    children,
    size,
    label,
    disabled = false,
    sideOffset = 4,
    ...restProps
  } = props

  const [isOpen, setIsOpen] = React.useState(false)

  const styles = getStyles({ size })

  if (disabled) {
    return children
  }

  const triggerContent =
    typeof children === 'string' ? (
      <span className={styles.triggerContent()}>{children}</span>
    ) : (
      children
    )

  return (
    <TooltipPrimitive.Provider delayDuration={400}>
      <TooltipPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
        <TooltipPrimitive.Trigger asChild>
          {triggerContent}
        </TooltipPrimitive.Trigger>

        <TooltipPrimitive.Portal forceMount>
          <AnimatePresence>
            {isOpen && (
              <TooltipPrimitive.Content
                className={cn(className, styles.container())}
                asChild
                sideOffset={sideOffset}
                {...restProps}
              >
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={contentVariants}
                  transition={contentTransition}
                  style={{
                    transformOrigin:
                      'var(--radix-tooltip-content-transform-origin)',
                  }}
                >
                  <TooltipPrimitive.Arrow className={styles.arrow()} />
                  {label}
                </motion.div>
              </TooltipPrimitive.Content>
            )}
          </AnimatePresence>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
}

export default Tooltip
