import { clsx } from 'clsx'
import { twMerge, type ClassNameValue } from 'tailwind-merge'

/**
 * Combines multiple class names into a single string.
 *
 * @param inputs - The class names to be combined.
 * @returns A string containing the combined class names.
 */
const cn = (...inputs: ClassNameValue[]) => clsx(twMerge(inputs))

export default cn
