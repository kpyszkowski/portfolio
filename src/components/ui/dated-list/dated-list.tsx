import cn from '@/utils/cn'
import getDateString from '@/utils/get-date-string'
import getFormattedDate from '@/utils/get-formatted-date'
import sortByKey, { type SortOrder } from '@/utils/sort-by-key'
import { tv, type VariantProps } from 'tailwind-variants'

const getStyles = tv({
  slots: {
    container: 'flex flex-col divide-y divide-neutral-700 font-sans',
    wrapper: 'flex flex-col items-baseline py-6 sm:flex-row sm:py-4',
    year: 'font-mediun basis-1/4 select-none text-xl text-neutral-400',
    list: 'group flex flex-1 flex-col',
    item: 'flex flex-col py-2 transition-opacity hover:!opacity-100 group-hover:opacity-65 lg:flex-row', // TODO: Find replacement for !important
    itemDate: 'basis-1/4 select-none text-sm/loose text-neutral-400',
    itemContent: 'flex-1',
  },
})

export type DatedListItem = {
  id: string
  date: Date
  content: React.ReactNode
}

type GroupedItems = Record<number, DatedListItem[]>

interface DatedListProps extends VariantProps<typeof getStyles> {
  className?: string
  headingType?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  items: DatedListItem[]
  order?: SortOrder
}

const getItemsGroupedByYear = (items: DatedListItem[], order: SortOrder) => {
  const sortedItems = items.sort(
    sortByKey(order, (item) => item.date.getTime()),
  )

  const groupedItems = sortedItems.reduce<GroupedItems>((acc, item) => {
    const year = item.date.getFullYear()
    const yearRegistry = acc[year] || []

    return {
      ...acc,
      [year]: [...yearRegistry, item],
    }
  }, {})

  const sortedEntries = Object.entries(groupedItems).sort(
    sortByKey(order, ([year]) => Number(year)),
  )

  return sortedEntries
}

function DatedList(props: DatedListProps) {
  const {
    className = '',
    items,
    headingType: Heading = 'h2',
    order = 'desc',
    ...restProps
  } = props

  const styles = getStyles()

  const groupedItems = getItemsGroupedByYear(items, order)

  return (
    <div className={cn(className, styles.container())} {...restProps}>
      {groupedItems.map(([year, items]) => (
        <section className={styles.wrapper()} key={year}>
          <Heading className={styles.year()}>{year}</Heading>

          <ul className={styles.list()}>
            {items.map((item) => (
              <li key={item.id} className={styles.item()}>
                <time
                  className={styles.itemDate()}
                  dateTime={getDateString(item.date)}
                >
                  {getFormattedDate(item.date)}
                </time>

                <div className={styles.itemContent()}>{item.content}</div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}

export default DatedList
