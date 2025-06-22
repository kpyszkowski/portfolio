'use client'
import React from 'react'
import { Toast } from '@base-ui-components/react/toast'
import { tv } from 'tailwind-variants'
import {
  AnimatePresence,
  motion,
  type MotionProps,
  type Transition,
  type Variants,
} from 'motion/react'

export const toastManager = Toast.createToastManager()

const getStyles = tv({
  slots: {
    viewport: 'fixed bottom-5 right-5 w-full max-w-xs',
    toastContainer: [
      'absolute bottom-0 flex w-full flex-col rounded-xl border border-neutral-200 bg-neutral-100 p-4 shadow-md dark:border-neutral-700 dark:bg-neutral-800',
      // To create hoverable area between toasts preventing glitches when moving cursor between them
      'before:absolute before:-bottom-3 before:left-0 before:h-3 before:w-full first:before:hidden',
    ],
    label: 'text-sm text-neutral-900 dark:text-neutral-50',
    description:
      'mask-r-from-90% overflow-hidden text-ellipsis whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400',
  },
})

type ToastState = Toast.Root.State & {
  index: number
}

const toastVariants: Variants = {
  idle: (state: ToastState) => ({
    y: state.expanded
      ? `calc((-100% - 0.75rem) * ${state.index})`
      : `${-16 * state.index}%`,
    scale: state.expanded ? 1 : 1 - state.index * 0.1,
    opacity: state.limited ? 0 : 1,
  }),
  slide: (state: ToastState) => ({
    y: `calc((100% + 0.75rem) * ${state.index + 1})`,
    opacity: 0,
  }),
}

const toastTransition: Transition = {
  type: 'spring',
  damping: 24,
  stiffness: 280,
}

function ToastList() {
  const { toasts } = Toast.useToastManager()

  const styles = getStyles()

  return (
    <Toast.Viewport className={styles.viewport()}>
      <AnimatePresence mode="popLayout">
        {toasts.map((toast, index) => (
          <Toast.Root
            className={styles.toastContainer()}
            swipeDirection={[]} // Disabled swipe gestures
            key={toast.id}
            toast={toast}
            render={(props, state) => (
              <motion.div
                custom={{ ...state, index }}
                animate="idle"
                initial="slide"
                exit="slide"
                variants={toastVariants}
                transition={toastTransition}
                {...(props as MotionProps)}
                style={{
                  zIndex: 1000 - index,
                }}
              />
            )}
          >
            <Toast.Title className={styles.label()} />
            <Toast.Description className={styles.description()} />
          </Toast.Root>
        ))}
      </AnimatePresence>
    </Toast.Viewport>
  )
}

type ToastProps = Toast.Provider.Props

export function ToastProvider(props: ToastProps) {
  const { children, ...restProps } = props

  return (
    <Toast.Provider
      toastManager={toastManager}
      {...restProps}
    >
      {children}

      <Toast.Portal>
        <ToastList />
      </Toast.Portal>
    </Toast.Provider>
  )
}

export const useToast = Toast.useToastManager
