import useClipboard from '@/hooks/use-clipboard'
import cn from '@/utils/cn'
import { AnimatePresence, motion } from 'motion/react'
import { Copy as CopyIcon } from 'react-feather'
import { tv, type VariantProps } from 'tailwind-variants'

const getStyles = tv({
  slots: {
    container: 'mx-1 flex items-center gap-1',
    icon: 'size-4',
    labelsWrapper: 'relative',
    copiedLabel: 'absolute inset-0 text-center text-sm/loose',
  },
})

interface CopyButtonProps extends VariantProps<typeof getStyles> {
  className?: string
  children: string
  copiedLabel?: string
}

function CopyButton(props: CopyButtonProps) {
  const {
    className = '',
    children,
    copiedLabel = 'Copied to clipboard',
    ...restProps
  } = props

  const { hasCopied, onCopy } = useClipboard()

  const styles = getStyles()

  return (
    <button
      type="button"
      onClick={() => onCopy(children)}
      className={cn(styles.container(), className)}
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
              {copiedLabel}
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
          {children}
        </motion.span>
      </div>
    </button>
  )
}

export default CopyButton
