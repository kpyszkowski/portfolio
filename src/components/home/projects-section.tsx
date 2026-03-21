'use client'
import { ArrowUpRight, Code } from 'react-feather'
import { createStyles, type StylesProps } from '~/utils/create-styles'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { SectionLayout } from '~/components/ui/section-layout'
import { projectsContent } from '~/content/home'
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react'
import { forwardRef, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Image from 'next/image'

const MotionImage = motion.create(Image)

const projectsSectionStyles = createStyles({
  slots: {
    container: 'relative',
    heading: '-mb-2 md:-mb-2',
    list: 'flex flex-col',
    item: 'first relative flex flex-col gap-12 border-b border-(--background-color-highlight) md:flex-row md:items-end',
    itemHeading: 'grow py-12 text-lg font-medium text-main md:text-xl',
    itemContent: 'py-12 text-elevated md:basis-3/8 md:text-lg',
    itemActions: 'absolute right-0 bottom-0 z-20 flex gap-2 py-12',
    itemTags: 'mb-6 flex flex-wrap gap-2',
    itemPreview:
      'relative order-first self-stretch [clip-path:inset(0_-100%_0_-100%)] md:order-none md:basis-3/8',
    itemPreviewImageWrapper:
      'absolute inset-0 flex items-center justify-center',
    itemPreviewImage: 'aspect-video w-96 overflow-hidden rounded-3xl',
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
  isFirst?: boolean
  isLast?: boolean
  moveX: MotionValue<number>
  moveY: MotionValue<number>
}

const ProjectListItem = forwardRef<HTMLLIElement, ProjectListItemProps>(
  (props, ref) => {
    const {
      item,
      listProgress,
      range,
      isFirst,
      isLast,
      moveX,
      moveY,
      ...restProps
    } = props
    const { name, description, tags, previewUrl, previewSrc, sourceCodeUrl } =
      item
    const styles = projectsSectionStyles()

    const [start, end] = range
    const half = (end - start) / 2
    const imageYRaw = useTransform(
      listProgress,
      [start - half, end + half],
      [-100, 100],
    )
    const imageY = useTransform(imageYRaw, (v) => {
      if (isFirst) return `${Math.max(0, v)}%`
      if (isLast) return `${Math.min(0, v)}%`
      return `${v}%`
    })

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
                  x: moveX,
                  y: moveY,
                }}
                className={styles.itemPreviewImage()}
                src={previewSrc}
                alt={name}
                width={640}
                height={360}
                priority
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

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const moveX = useSpring(useTransform(mouseX, [0, 1], [-24, 24]), {
    stiffness: 120,
    damping: 35,
  })
  const moveY = useSpring(useTransform(mouseY, [0, 1], [-24, 24]), {
    stiffness: 120,
    damping: 35,
  })

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      mouseX.set(e.clientX / window.innerWidth)
      mouseY.set(e.clientY / window.innerHeight)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  const totalHeight = itemHeights.reduce((s, h) => s + h, 0)
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
              isFirst={index === 0}
              isLast={index === projectsContent.items.length - 1}
              moveX={moveX}
              moveY={moveY}
            />
          ))}
        </ul>
      </SectionLayout.Wrapper>
    </SectionLayout.Root>
  )
}

export { ProjectsSection, projectsSectionStyles, type ProjectsSectionProps }
