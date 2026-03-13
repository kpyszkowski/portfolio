import { createStyles, type StylesProps } from '~/utils/create-styles'
import getDateString from '~/utils/get-date-string'
import getFormattedDate from '~/utils/get-formatted-date'
import sortByKey, { type SortOrder } from '~/utils/sort-by-key'

const datedListStyles = createStyles({
  slots: {
    container:
      'flex flex-col divide-y divide-neutral-200 dark:divide-neutral-800',
    wrapper: 'flex flex-col items-baseline py-6 sm:flex-row sm:py-5',
    year: 'font-mediun basis-1/4 text-xl text-tertiary select-none lg:basis-1/6',
    list: 'group flex w-full flex-1 flex-col',
    item: 'flex flex-col py-5 transition-opacity group-hover:opacity-65 hover:!opacity-100 lg:flex-row lg:gap-12', // TODO: Find replacement for !important
    itemDate:
      'mb-2 basis-1/4 text-sm whitespace-nowrap text-tertiary select-none lg:basis-1/5 lg:text-end lg:text-base',
    itemContent: 'flex-1',
  },
})

type DatedListItem = {
  id: string
  date: Date
  content: React.ReactNode
}

type GroupedItems = Record<number, DatedListItem[]>

interface DatedListProps extends StylesProps<typeof datedListStyles> {
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

  const styles = datedListStyles()

  const groupedItems = getItemsGroupedByYear(items, order)

  return (
    <div
      className={styles.container({ className })}
      {...restProps}
    >
      {groupedItems.map(([year, items]) => (
        <section
          className={styles.wrapper()}
          key={year}
        >
          <Heading className={styles.year()}>{year}</Heading>

          <ul className={styles.list()}>
            {items.map((item) => (
              <li
                key={item.id}
                className={styles.item()}
              >
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

export { DatedList, datedListStyles, type DatedListProps, type DatedListItem }
