'use client'
import { ArrowUpRight } from 'react-feather'
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
    wrapper: 'mx-auto max-w-screen-xl',
    heading: 'mb-10 font-medium tracking-widest text-highlight uppercase',
    list: 'flex flex-col',
    item: 'flex flex-col gap-2 border-b border-(--background-color-highlight) py-6 sm:flex-row sm:items-end sm:py-12',
    itemHeading: 'grow text-lg font-medium text-main md:text-xl',
    itemContent: 'text-sm text-elevated sm:basis-1/2 md:basis-3/8 md:text-lg',
    itemActions: 'z-20 flex basis-2/8 items-center justify-end gap-4',
    itemTags: 'mb-4 flex flex-wrap gap-2',
    previewContainer:
      'pointer-events-none fixed inset-0 z-10 aspect-video h-48 -translate-full overflow-hidden',
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
    stiffness: 260,
    damping: 28,
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

  return (
    <motion.section
      className={styles.container({ className })}
      {...restProps}
    >
      <AnimatePresence>
        {isPreviewVisible && (
          <motion.div
            key="preview"
            className={styles.previewContainer()}
            initial={{ clipPath: 'inset(100% 0% 0% 0% round 16px)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0% round 16px)' }}
            exit={{ clipPath: 'inset(100% 0% 0% 0% round 16px)' }}
            style={{
              x: previewX,
              y: previewY,
            }}
          >
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
        >
          {projectsContent.items.map(
            ({ id, name, description, tags, href }, index) => (
              <motion.li
                key={id}
                className={styles.item()}
                onMouseEnter={() => rawCurrentIndex.set(index)}
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
              </motion.li>
            ),
          )}
        </ul>
      </div>
    </motion.section>
  )
}

export { ProjectsSection, projectsSectionStyles, type ProjectsSectionProps }
