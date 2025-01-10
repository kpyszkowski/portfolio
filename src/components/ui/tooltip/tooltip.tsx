'use client'
import cn from '@/utils/cn'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { AnimatePresence, motion, Transition, Variants } from 'motion/react'
import React, { forwardRef, useState } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const getStyles = tv({
  slots: {
    container:
      'rounded-3xl bg-neutral-700/50 px-4 py-1 font-sans text-neutral-200 ring-1 ring-inset ring-neutral-600/50 backdrop-blur-sm',
    arrow: '-m-px fill-neutral-700',
    triggerContent: 'font-sans',
  },
  variants: {
    size: {
      xs: {
        container: 'text-xs',
        arrow: 'h-1 w-2',
      },
      sm: {
        container: 'text-sm',
        arrow: 'h-1 w-2',
      },
      md: {
        container: 'text-base',
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
  triggerAsChild?: boolean
  delayDuration?: number
}

// TODO: Investigate the error - the use of `forwardRef` doesn't help

const Tooltip = forwardRef<HTMLButtonElement, TooltipProps>((props, ref) => {
  const {
    className = '',
    children,
    size,
    label,
    disabled = false,
    sideOffset = 4,
    triggerAsChild = true,
    delayDuration = 400,
    ...restProps
  } = props

  const [isOpen, setIsOpen] = useState(false)

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
    <TooltipPrimitive.Provider delayDuration={delayDuration}>
      <TooltipPrimitive.Root
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <TooltipPrimitive.Trigger
          ref={ref}
          asChild={triggerAsChild}
        >
          {triggerContent}
        </TooltipPrimitive.Trigger>

        <AnimatePresence>
          {isOpen && (
            <TooltipPrimitive.Portal forceMount>
              <TooltipPrimitive.Content
                className={cn(styles.container(), className)}
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
            </TooltipPrimitive.Portal>
          )}
        </AnimatePresence>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
})

Tooltip.displayName = 'Tooltip'

export default Tooltip
