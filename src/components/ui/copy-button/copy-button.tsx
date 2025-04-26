'use client'
import { AnimatePresence, motion } from 'motion/react'
import { Copy as CopyIcon } from 'react-feather'
import { tv, type VariantProps } from 'tailwind-variants'
import useClipboard from '~/hooks/use-clipboard'

const getStyles = tv({
  slots: {
    container: 'mx-1 flex items-center gap-1',
    icon: 'size-4',
    labelsWrapper: 'relative',
    copiedLabel:
      'absolute inset-0 text-nowrap text-center text-sm leading-[inherit]',
  },
})

interface CopyButtonProps extends VariantProps<typeof getStyles> {
  className?: string
  children: string
  label?: {
    default?: string
    copied?: string
  }
}

function CopyButton(props: CopyButtonProps) {
  const {
    className = '',
    children,
    label = {
      default: children,
      copied: 'Copied to clipboard!',
    },
    ...restProps
  } = props

  const { hasCopied, onCopy } = useClipboard(children)

  const styles = getStyles()

  return (
    <button
      type="button"
      onClick={() => onCopy()}
      className={styles.container({ className })}
      {...restProps}
    >
      <CopyIcon className={styles.icon()} />

      <div className={styles.labelsWrapper()}>
        <AnimatePresence>
          {hasCopied && (
            <motion.span
              initial={false}
              animate={{ filter: 'blur(0px) opacity(1)' }}
              exit={{ filter: 'blur(4px) opacity(0)' }}
              className={styles.copiedLabel()}
            >
              {label.copied}
            </motion.span>
          )}
        </AnimatePresence>

        <motion.span
          initial={false}
          animate={{
            filter: hasCopied
              ? 'blur(12px) opacity(0.45)'
              : 'blur(0px) opacity(1)',
          }}
        >
          {label.default}
        </motion.span>
      </div>
    </button>
  )
}

export default CopyButton
