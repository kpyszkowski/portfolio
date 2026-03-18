import { createStyles, type StylesProps } from '~/utils/create-styles'
import getFormattedDate from '~/utils/get-formatted-date'
import { experienceContent } from '~/content/home'

const experienceSectionStyles = createStyles({
  slots: {
    container: 'px-5 py-24 lg:py-32',
    inner: 'mx-auto max-w-3xl',
    heading:
      'mb-10 text-xs font-medium tracking-widest text-highlight uppercase',
    list: 'flex flex-col gap-10',
    item: 'grid grid-cols-1 gap-2 sm:grid-cols-[12rem_1fr] sm:gap-8',
    itemMeta: 'flex flex-col gap-1',
    itemPeriod: 'text-xs text-highlight',
    itemCompany: 'text-sm font-medium text-main',
    itemContent: 'flex flex-col gap-1',
    itemRole: 'text-base text-main',
    itemDescription: 'text-sm leading-relaxed text-elevated',
  },
})

interface ExperienceSectionProps
  extends StylesProps<typeof experienceSectionStyles> {
  className?: string
}

function ExperienceSection(props: ExperienceSectionProps) {
  const { className, ...restProps } = props
  const styles = experienceSectionStyles()

  return (
    <section
      id="experience"
      className={styles.container({ className })}
      {...restProps}
    >
      <div className={styles.inner()}>
        <h2 className={styles.heading()}>{experienceContent.heading}</h2>

        <ul className={styles.list()}>
          {experienceContent.items.map(
            ({ id, company, role, from, to, description }) => {
              const fromDate = new Date(from)
              const toDate = to ? new Date(to) : null
              const fromLabel = getFormattedDate(fromDate, {
                month: 'short',
                year: 'numeric',
                day: undefined,
                weekday: undefined,
              })
              const toLabel = toDate
                ? getFormattedDate(toDate, {
                    month: 'short',
                    year: 'numeric',
                    day: undefined,
                    weekday: undefined,
                  })
                : 'Present'

              return (
                <li
                  key={id}
                  className={styles.item()}
                >
                  <div className={styles.itemMeta()}>
                    <span className={styles.itemPeriod()}>
                      {fromLabel} — {toLabel}
                    </span>
                    <span className={styles.itemCompany()}>{company}</span>
                  </div>

                  <div className={styles.itemContent()}>
                    <span className={styles.itemRole()}>{role}</span>
                    <p className={styles.itemDescription()}>{description}</p>
                  </div>
                </li>
              )
            },
          )}
        </ul>
      </div>
    </section>
  )
}

export {
  ExperienceSection,
  experienceSectionStyles,
  type ExperienceSectionProps,
}
