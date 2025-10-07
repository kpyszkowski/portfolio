'use client'
import { Tooltip as TooltipPrimitive } from '@base-ui-components/react/tooltip'
import { AnimatePresence, motion, Transition, Variants } from 'motion/react'
import React, { forwardRef, useState } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const getStyles = tv({
  slots: {
    container:
      'rounded-3xl bg-neutral-200/50 px-4 py-1 text-neutral-800 ring-1 ring-neutral-300/50 backdrop-blur-sm ring-inset dark:bg-neutral-700/50 dark:text-neutral-200 dark:ring-neutral-600/50',
    arrow: '-m-px fill-neutral-200 dark:fill-neutral-700',
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
    side: {
      top: { arrow: '-bottom-1' },
      right: { arrow: '-left-1.5 rotate-90' },
      bottom: { arrow: '-top-1 rotate-180' },
      left: { arrow: '-right-1.5 -rotate-90' },
      ['inline-start']: { arrow: '-right-1.5 -rotate-90' },
      ['inline-end']: { arrow: '-left-1.5 rotate-90' },
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

type TooltipRenderProp =
  | React.ReactNode
  | ((isOpen: boolean) => React.ReactNode)

interface TooltipProps
  extends VariantProps<typeof getStyles>,
    Omit<TooltipPrimitive.Positioner.Props, 'children'>,
    Pick<TooltipPrimitive.Root.Props, 'delay' | 'defaultOpen'> {
  className?: string
  children: TooltipRenderProp
  label: TooltipRenderProp
  disabled?: boolean
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
    delay = 400,
    defaultOpen = false,
    ...restProps
  } = props

  const [isOpen, setIsOpen] = useState(defaultOpen)

  const styles = getStyles({ size })

  const triggerContent =
    typeof children === 'function' ? children(isOpen) : children

  const labelContent = typeof label === 'function' ? label(isOpen) : label

  return (
    <TooltipPrimitive.Provider delay={delay}>
      <TooltipPrimitive.Root
        open={!disabled && isOpen}
        onOpenChange={disabled ? undefined : setIsOpen}
      >
        <TooltipPrimitive.Trigger
          ref={ref}
          render={<div />}
        >
          {triggerContent}
        </TooltipPrimitive.Trigger>

        <AnimatePresence>
          {isOpen && (
            <TooltipPrimitive.Portal>
              <TooltipPrimitive.Positioner
                sideOffset={sideOffset}
                {...restProps}
              >
                <TooltipPrimitive.Popup
                  render={
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={contentVariants}
                      transition={contentTransition}
                      style={{
                        transformOrigin: 'var(--transform-origin)',
                      }}
                    />
                  }
                >
                  <div className={styles.container({ className })}>
                    {labelContent}
                  </div>

                  <TooltipPrimitive.Arrow
                    className={(state) =>
                      styles.arrow({
                        side: state.side,
                      })
                    }
                    render={
                      <svg viewBox="0 0 16 8">
                        <polygon points="0,0 16,0 8,8"></polygon>
                      </svg>
                    }
                  />
                </TooltipPrimitive.Popup>
              </TooltipPrimitive.Positioner>
            </TooltipPrimitive.Portal>
          )}
        </AnimatePresence>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
})

Tooltip.displayName = 'Tooltip'

export default Tooltip
