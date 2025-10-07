import { useCallback, useRef } from 'react'
import { XCircle as ClearIcon, HelpCircle as HelpIcon } from 'react-feather'
import { tv, type VariantProps } from 'tailwind-variants'
import { Tooltip } from '~/components/ui/tooltip'

const getStyles = tv({
  slots: {
    container: 'flex flex-col gap-2',
    label:
      'flex w-full items-center gap-2 text-sm text-neutral-950 dark:text-neutral-50',
    helpIcon: 'text- size-3.5',
    inputWrapper: [
      'flex rounded bg-neutral-200/75 transition-all focus-within:bg-neutral-200 hover:bg-neutral-200',
      'dark:bg-neutral-600/75 dark:focus-within:bg-neutral-600 dark:hover:bg-neutral-600',
    ],
    input:
      'peer flex-grow bg-transparent py-1 pl-3 text-sm outline-none placeholder:text-neutral-400',
    clearButton:
      'visible p-1 text-neutral-400 transition-colors outline-none peer-placeholder-shown:invisible hover:text-neutral-50 focus-visible:text-neutral-50',
    clearButtonIcon: 'mx-2 size-4',
  },
})

interface InputProps extends VariantProps<typeof getStyles> {
  className?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  onValueChange?: (value: string) => void
  label?: string
  placeholder?: string
  withClearButton?: boolean
  helpNote?: string
}

function Input(props: InputProps) {
  const {
    className = '',
    label,
    onValueChange,
    withClearButton,
    onChange,
    helpNote,
    ...restProps
  } = props

  const inputRef = useRef<HTMLInputElement>(null)

  const handleClear = useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >(() => {
    if (!inputRef.current) return

    if (onValueChange) onValueChange('')
    inputRef.current.value = ''

    inputRef.current.focus()
  }, [onValueChange])

  const handleOnChange = useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(
    (event) => {
      if (onValueChange) onValueChange(event.target.value)
      if (onChange) onChange(event)
    },
    [onChange, onValueChange],
  )

  const styles = getStyles()

  return (
    <label className={styles.container({ className })}>
      <span className={styles.label()}>
        {label}
        {helpNote && (
          <Tooltip
            label={helpNote}
            size="xs"
            side="right"
            delay={0}
          >
            <HelpIcon className={styles.helpIcon()} />
          </Tooltip>
        )}
      </span>

      <div className={styles.inputWrapper()}>
        <input
          ref={inputRef}
          className={styles.input()}
          onChange={handleOnChange}
          {...restProps}
        />

        {withClearButton && (
          <button
            className={styles.clearButton()}
            onClick={handleClear}
            type="button"
          >
            <ClearIcon className={styles.clearButtonIcon()} />
          </button>
        )}
      </div>
    </label>
  )
}

export default Input
