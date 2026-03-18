'use client'
import { ArrowUpRight } from 'react-feather'
import { createStyles, type StylesProps } from '~/utils/create-styles'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { projectsContent } from '~/content/home'

const projectsSectionStyles = createStyles({
  slots: {
    container: 'px-5 py-24 lg:py-32',
    wrapper: 'mx-auto max-w-screen-xl',
    heading: 'mb-10 font-medium tracking-widest text-highlight uppercase',
    list: 'flex flex-col',
    item: 'flex flex-col gap-2 border-b border-(--background-color-highlight) py-6 sm:flex-row sm:items-end sm:py-12',
    itemHeading: 'grow text-lg font-medium text-main md:text-xl',
    itemContent: 'text-sm text-elevated sm:basis-1/2 md:basis-3/8 md:text-lg',
    itemActions: 'flex basis-2/8 items-center justify-end gap-4',
    itemTags: 'mb-4 flex flex-wrap gap-2',
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
      <div className={styles.wrapper()}>
        <h2 className={styles.heading()}>{projectsContent.heading}</h2>

        <ul className={styles.list()}>
          {projectsContent.items.map(
            ({ id, name, description, tags, href }) => (
              <li
                key={id}
                className={styles.item()}
              >
                <h3 className={styles.itemHeading()}>{name}</h3>

                <div className={styles.itemContent()}>
                  <div className={styles.itemTags()}>
                    {tags.map((tag) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </div>

                  <p>{description}</p>
                </div>

                <div className={styles.itemActions()}>
                  {href && (
                    <Button
                      href={href}
                      isExternal
                      variant="solid"
                      size="sm"
                      icon={ArrowUpRight}
                      iconPosition="right"
                    >
                      View
                    </Button>
                  )}
                </div>
              </li>
            ),
          )}
        </ul>
      </div>
    </section>
  )
}

export { ProjectsSection, projectsSectionStyles, type ProjectsSectionProps }
