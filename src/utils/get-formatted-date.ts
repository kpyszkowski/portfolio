const DEFAULT_LOCALE = 'en-US'
const DEFAULT_OPTIONS: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  day: 'numeric',
  month: 'short',
}

type GetFormattedDateOptions = Intl.DateTimeFormatOptions & {
  locale?: string
}

/**
 * Returns a formatted date string.
 * @param date - The date to format.
 * @param options - The formatting options with an locale string.
 * @returns The formatted date string.
 */

const getFormattedDate = (date: Date, options?: GetFormattedDateOptions) =>
  date.toLocaleDateString(options?.locale || DEFAULT_LOCALE, {
    ...DEFAULT_OPTIONS,
    ...options,
  })

export default getFormattedDate
