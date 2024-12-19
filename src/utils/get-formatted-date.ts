const DEFAULT_LOCALE = 'en-US'
const DEFAULT_OPTIONS: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  day: 'numeric',
  month: 'short',
}

/**
 * Returns a formatted date string.
 * @param date - The date to format.
 * @param locale - The locale to use.
 * @param options - The formatting options.
 * @returns The formatted date string.
 */

const getFormattedDate = (
  date: Date,
  locale: string = DEFAULT_LOCALE,
  options: Intl.DateTimeFormatOptions = DEFAULT_OPTIONS,
) => date.toLocaleDateString(locale, options)

export default getFormattedDate
