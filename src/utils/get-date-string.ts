/**
 * Returns a string representation of the date in the format 'YYYY-MM-DD'
 * @param date - The date to convert
 * @returns The date string in the format 'YYYY-MM-DD'
 */
const getDateString = (date: Date) => date.toISOString().split('T')[0]

export default getDateString
