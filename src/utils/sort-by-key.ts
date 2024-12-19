export type SortOrder = 'asc' | 'desc'
type KeyExtractor<T> = (item: T) => number

/**
 * Sorts an array of items by a key extracted from each item.
 * @param order - The order in which to sort the items.
 * @param keyExtractFunction - A function that extracts a number from an item.
 * @returns A function that compares two items based on the extracted key.
 */
const sortByKey =
  <T>(order: SortOrder, keyExtractor: KeyExtractor<T>) =>
  (primaryItem: T, secondaryItem: T) => {
    const primaryKey = keyExtractor(primaryItem)
    const secondaryKey = keyExtractor(secondaryItem)

    if (order === 'asc') {
      return primaryKey - secondaryKey
    }
    return secondaryKey - primaryKey
  }

export default sortByKey
