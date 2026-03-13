'use client'
import { ArrowUpRight } from 'react-feather'
import { createStyles, type StylesProps } from '~/utils/create-styles'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { projectsContent } from '~/content/home'

const projectsSectionStyles = createStyles({
  slots: {
    container: 'px-5 py-24 lg:py-32',
    inner: 'mx-auto max-w-5xl',
    heading:
      'mb-10 text-xs font-medium tracking-widest text-tertiary uppercase',
    list: 'flex flex-col divide-y divide-secondary',
    item: 'flex flex-col gap-3 py-8 first:pt-0 last:pb-0 sm:flex-row sm:items-start sm:justify-between sm:gap-6',
    itemMeta: 'flex flex-col gap-2',
    itemName: 'text-lg font-light text-primary',
    itemDescription: 'max-w-md text-sm font-light text-secondary',
    itemTags: 'flex flex-wrap gap-1.5',
    itemActions: 'mt-1 shrink-0',
  },
})

interface ProjectsSectionProps
  extends StylesProps<typeof projectsSectionStyles> {
  className?: string
}

function ProjectsSection(props: ProjectsSectionProps) {
  const { className, ...restProps } = props
  const styles = projectsSectionStyles()

  return (
    <section
      className={styles.container({ className })}
      {...restProps}
    >
      <div className={styles.inner()}>
        <h2 className={styles.heading()}>{projectsContent.heading}</h2>

        <ul className={styles.list()}>
          {projectsContent.items.map(
            ({ id, name, description, tags, href }) => (
              <li
                key={id}
                className={styles.item()}
              >
                <div className={styles.itemMeta()}>
                  <h3 className={styles.itemName()}>{name}</h3>
                  <p className={styles.itemDescription()}>{description}</p>
                  <div className={styles.itemTags()}>
                    {tags.map((tag) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </div>
                </div>

                {href && (
                  <div className={styles.itemActions()}>
                    <Button
                      href={href}
                      isExternal
                      size="sm"
                      icon={ArrowUpRight}
                      iconPosition="right"
                    >
                      View
                    </Button>
                  </div>
                )}
              </li>
            ),
          )}
        </ul>
      </div>
    </section>
  )
}

export { ProjectsSection, projectsSectionStyles, type ProjectsSectionProps }
