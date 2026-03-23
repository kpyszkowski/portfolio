'use client'
import { AnimatePresence, motion } from 'motion/react'
import { Copy as CopyIcon } from 'react-feather'
import useClipboard from '~/hooks/use-clipboard'
import { Button, type ButtonProps } from '~/components/ui/button'
import { createStyles, type StylesProps } from '~/utils/create-styles'

const copyButtonStyles = createStyles({
  slots: {
    labelsWrapper: 'relative overflow-hidden',
    spacer:
      'pointer-events-none invisible block leading-tight whitespace-nowrap select-none',
    label: 'absolute inset-0 flex items-center leading-tight whitespace-nowrap',
  },
})

const transition = {
  type: 'spring' as const,
  stiffness: 320,
  damping: 28,
  mass: 0.8,
}

interface CopyButtonProps
  extends Omit<ButtonProps, 'children' | 'icon'>,
    StylesProps<typeof copyButtonStyles> {
  children: string
  label?: {
    default?: string
    copied?: string
  }
}

function CopyButton(props: CopyButtonProps) {
  const {
    className,
    children,
    label = {
      default: children,
      copied: 'Copied to clipboard',
    },
    variant = 'ghost',
    ...restProps
  } = props

  const { hasCopied, onCopy } = useClipboard(children)
  const styles = copyButtonStyles()

  return (
    <Button
      render={
        <motion.button
          layoutRoot
          layout
        />
      }
      icon={CopyIcon}
      onClick={() => onCopy()}
      className={className}
      variant={variant}
      {...restProps}
    >
      <span className={styles.labelsWrapper()}>
        <span
          aria-hidden
          className={styles.spacer()}
        >
          {label.default}
        </span>
        <AnimatePresence
          mode="popLayout"
          initial={false}
        >
          <motion.span
            key={hasCopied ? 'copied' : 'default'}
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '-100%' }}
            transition={transition}
            className={styles.label()}
          >
            {hasCopied ? label.copied : label.default}
          </motion.span>
        </AnimatePresence>
      </span>
    </Button>
  )
}

export { CopyButton, type CopyButtonProps }
