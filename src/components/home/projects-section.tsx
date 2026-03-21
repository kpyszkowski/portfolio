'use client'
import { ArrowUpRight, Code } from 'react-feather'
import { createStyles, type StylesProps } from '~/utils/create-styles'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { SectionLayout } from '~/components/ui/section-layout'
import { projectsContent } from '~/content/home'
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { forwardRef, useLayoutEffect, useRef, useState } from 'react'
import Image from 'next/image'

const MotionImage = motion.create(Image)

const projectsSectionStyles = createStyles({
  slots: {
    container: 'relative',
    heading: '-mb-2 md:-mb-2',
    list: 'flex flex-col',
    item: 'relative flex flex-col gap-12 border-b border-(--background-color-highlight) md:flex-row',
    itemHeading: 'grow py-12 text-lg font-medium text-main md:text-xl',
    itemContent: 'py-12 text-elevated md:basis-3/8 md:text-lg',
    itemActions: 'absolute right-0 bottom-0 z-20 flex gap-2 px-6 py-12',
    itemTags: 'mb-6 flex flex-wrap gap-2',
    itemPreview:
      'relative order-first aspect-video overflow-hidden md:order-none md:basis-3/8',
    itemPreviewImageWrapper: 'absolute inset-0',
    itemPreviewImage: 'my-auto h-auto!',
  },
})

interface ProjectsSectionProps
  extends StylesProps<typeof projectsSectionStyles> {
  className?: string
}

type ProjectItem = (typeof projectsContent.items)[number]

interface ProjectListItemProps {
  item: ProjectItem
  listProgress: MotionValue<number>
  range: [number, number]
}

const ProjectListItem = forwardRef<HTMLLIElement, ProjectListItemProps>(
  (props, ref) => {
    const { item, listProgress, range, ...restProps } = props
    const { name, description, tags, previewUrl, previewSrc, sourceCodeUrl } =
      item
    const styles = projectsSectionStyles()

    const [start, end] = range
    const half = (end - start) / 2
    // Sweep centered at item midpoint. ±50% at boundaries → always partially visible.
    // Virtual padding in range calculation ensures start0 - half = 0 and endN + half = 1,
    // so first/last items animate in/out from fully hidden rather than partially visible.
    const imageY = useTransform(
      listProgress,
      [start - half, end + half],
      ['-100%', '100%'],
    )

    return (
      <li
        ref={ref}
        className={styles.item()}
        {...restProps}
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

        <div className={styles.itemPreview()}>
          {previewSrc && (
            <motion.div
              style={{ y: imageY }}
              className={styles.itemPreviewImageWrapper()}
            >
              <MotionImage
                style={{
                  clipPath: 'inset(0% 0% 0% 0% round 24px)',
                }}
                className={styles.itemPreviewImage()}
                src={previewSrc}
                alt={name}
                fill
                sizes="(min-width: 768px) 37.5vw, 100vw"
              />
            </motion.div>
          )}

          <div className={styles.itemActions()}>
            {previewUrl && (
              <Button
                render={
                  <a
                    href={previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
                variant="solid"
                size="sm"
                icon={ArrowUpRight}
                iconPosition="left"
              >
                Preview
              </Button>
            )}

            {sourceCodeUrl && (
              <Button
                render={
                  <a
                    href={sourceCodeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
                variant="solid"
                size="sm"
                icon={Code}
                iconPosition="left"
              >
                Source code
              </Button>
            )}
          </div>
        </div>
      </li>
    )
  },
)

ProjectListItem.displayName = 'ProjectListItem'

function ProjectsSection(props: ProjectsSectionProps) {
  const { className, ...restProps } = props
  const styles = projectsSectionStyles()

  const listRef = useRef<HTMLUListElement>(null)
  const itemsRefs = useRef<(HTMLLIElement | null)[]>([])
  const [itemHeights, setItemHeights] = useState<number[]>([])

  useLayoutEffect(() => {
    setItemHeights(
      itemsRefs.current.map((el) => el?.getBoundingClientRect().height ?? 0),
    )
  }, [])

  const { scrollYProgress: listProgress } = useScroll({
    target: listRef,
    offset: ['start center', 'end center'],
  })

  const totalHeight = itemHeights.reduce((s, h) => s + h, 0)
  // Pad by half the first and last item heights so that:
  //   item[0].start  - half = 0  → first image enters from fully hidden
  //   item[N].end    + half = 1  → last  image exits  to   fully hidden
  const firstHalf = (itemHeights[0] ?? 0) / 2
  const lastHalf = (itemHeights[itemHeights.length - 1] ?? 0) / 2
  const paddedTotal = totalHeight + firstHalf + lastHalf

  const itemRanges = itemHeights.reduce(
    (acc, h) => {
      const start =
        acc.at(-1)?.[1] ?? (paddedTotal > 0 ? firstHalf / paddedTotal : 0)
      const end = paddedTotal > 0 ? start + h / paddedTotal : 0
      return [...acc, [start, end] as [number, number]]
    },
    [] as [number, number][],
  )

  return (
    <SectionLayout.Root
      render={<motion.div />}
      className={styles.container({ className })}
      {...restProps}
    >
      <SectionLayout.Wrapper>
        <SectionLayout.Heading className={styles.heading()}>
          {projectsContent.heading}
        </SectionLayout.Heading>

        <ul
          ref={listRef}
          className={styles.list()}
        >
          {projectsContent.items.map((item, index) => (
            <ProjectListItem
              ref={(el) => {
                itemsRefs.current[index] = el
              }}
              key={item.id}
              item={item}
              listProgress={listProgress}
              range={itemRanges[index] ?? [0, 0]}
            />
          ))}
        </ul>
      </SectionLayout.Wrapper>
    </SectionLayout.Root>
  )
}

export { ProjectsSection, projectsSectionStyles, type ProjectsSectionProps }
