'use client'
import { ArrowUpRight, Code, Info } from 'react-feather'
import { createStyles, type StylesProps } from '~/utils/create-styles'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { projectsContent } from '~/content/home'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'motion/react'
import { useMemo, useState } from 'react'
import Image from 'next/image'

const projectsSectionStyles = createStyles({
  slots: {
    container: 'relative px-5 py-24 lg:py-32',
    wrapper: 'relative mx-auto max-w-screen-xl',
    heading: 'mb-10 font-medium tracking-widest text-highlight uppercase',
    list: 'flex flex-col',
    item: 'flex flex-col gap-6 border-b border-(--background-color-highlight) py-12 md:flex-row md:items-end',
    itemHeading: 'grow text-lg font-medium text-main md:text-xl',
    itemContent: 'text-elevated md:basis-4/8 md:text-lg',
    itemActions: 'z-20 flex basis-2/8 gap-4 md:flex-col md:items-end',
    itemTags: 'mb-6 flex flex-wrap gap-2',
    previewContainer:
      'pointer-events-none fixed top-0 left-0 z-10 m-8 aspect-video h-56 -translate-full overflow-hidden',
    previewHint:
      'absolute right-0 bottom-0 left-0 z-10 flex items-center gap-2 p-3 text-xs font-semibold text-black/50',
    previewHintIcon: 'inline size-3',
    previewWrapper: 'absolute inset-0 flex size-full flex-col',
    previewImage: 'aspect-video w-full object-cover',
  },
})

interface ProjectsSectionProps
  extends StylesProps<typeof projectsSectionStyles> {
  className?: string
}

function ProjectsSection(props: ProjectsSectionProps) {
  const { className, ...restProps } = props
  const styles = projectsSectionStyles()

  const rawCurrentIndex = useMotionValue(0)
  const currentIndex = useSpring(rawCurrentIndex, {
    stiffness: 160,
    damping: 20,
    mass: 0.8,
  })

  const previewWrapperOffset = useTransform(
    currentIndex,
    Array.from(projectsContent.items.keys()),
    Array.from(projectsContent.items.keys()).map((index) => `${-index * 100}%`),
  )

  const rawPreviewX = useMotionValue(0)
  const rawPreviewY = useMotionValue(0)
  const previewX = useSpring(rawPreviewX, {
    stiffness: 120,
    damping: 20,
    mass: 0.5,
  })
  const previewY = useSpring(rawPreviewY, {
    stiffness: 120,
    damping: 20,
    mass: 0.5,
  })

  const handleMouseMove = useMemo(
    () => (event: React.MouseEvent) => {
      rawPreviewX.set(event.clientX)
      rawPreviewY.set(event.clientY)
    },
    [rawPreviewX, rawPreviewY],
  )

  const [isPreviewVisible, setIsPreviewVisible] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [dismissedIndex, setDismissedIndex] = useState<number | null>(null)

  return (
    <motion.section
      className={styles.container({ className })}
      {...restProps}
    >
      <AnimatePresence>
        {isPreviewVisible && hoveredIndex !== dismissedIndex && (
          <motion.div
            key="preview"
            className={styles.previewContainer()}
            initial={{ clipPath: 'inset(100% 0% 0% 100% round 16px)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0% round 16px)' }}
            exit={{ clipPath: 'inset(100% 0% 0% 100% round 16px)' }}
            style={{
              x: previewX,
              y: previewY,
            }}
          >
            <p className={styles.previewHint()}>
              <Info className={styles.previewHintIcon()} />
              Click to dismiss
            </p>
            <motion.div
              className={styles.previewWrapper()}
              style={{
                y: previewWrapperOffset,
              }}
            >
              {projectsContent.items.map(({ previewSrc }) => (
                <Image
                  key={previewSrc}
                  src={previewSrc}
                  alt={previewSrc}
                  className={styles.previewImage()}
                  width={1024}
                  height={576}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={styles.wrapper()}>
        <h2 className={styles.heading()}>{projectsContent.heading}</h2>

        <ul
          className={styles.list()}
          onMouseEnter={(event) => {
            rawPreviewX.set(event.clientX)
            rawPreviewY.set(event.clientY)
            previewX.jump(event.clientX)
            previewY.jump(event.clientY)
            setIsPreviewVisible(true)
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setIsPreviewVisible(false)}
          onClick={() => setDismissedIndex(hoveredIndex)}
        >
          {projectsContent.items.map(
            (
              { id, name, description, tags, previewUrl, sourceCodeUrl },
              index,
            ) => (
              <motion.li
                key={id}
                className={styles.item()}
                onMouseEnter={() => {
                  rawCurrentIndex.set(index)
                  setHoveredIndex(index)
                  setDismissedIndex(null)
                }}
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
                  {previewUrl && (
                    <Button
                      href={previewUrl}
                      isExternal
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
                      href={sourceCodeUrl}
                      isExternal
                      variant="solid"
                      size="sm"
                      icon={Code}
                      iconPosition="left"
                    >
                      Source code
                    </Button>
                  )}
                </div>
              </motion.li>
            ),
          )}
        </ul>
      </div>
    </motion.section>
  )
}

export { ProjectsSection, projectsSectionStyles, type ProjectsSectionProps }
