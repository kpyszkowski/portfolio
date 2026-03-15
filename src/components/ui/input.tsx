import { useCallback, useRef } from 'react'
import { XCircle as ClearIcon, HelpCircle as HelpIcon } from 'react-feather'
import { createStyles, type StylesProps } from '~/utils/create-styles'
import { Tooltip } from '~/components/ui/tooltip'

const inputStyles = createStyles({
  slots: {
    container: 'flex flex-col gap-2',
    label: 'flex w-full items-center gap-2 text-sm text-main',
    helpIcon: 'text- size-3.5',
    inputWrapper: [
      'flex rounded bg-elevated/75 transition-all focus-within:bg-elevated hover:bg-elevated',
      'dark:bg-neutral-600/75 dark:focus-within:bg-neutral-600 dark:hover:bg-neutral-600',
    ],
    input:
      'peer flex-grow bg-transparent py-1 pl-3 text-sm outline-none placeholder:text-highlight',
    clearButton:
      'visible p-1 text-highlight transition-colors outline-none peer-placeholder-shown:invisible hover:text-neutral-50 focus-visible:text-neutral-50',
    clearButtonIcon: 'mx-2 size-4',
  },
})

interface InputProps extends StylesProps<typeof inputStyles> {
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

  const styles = inputStyles()

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

export { Input, inputStyles, type InputProps }
