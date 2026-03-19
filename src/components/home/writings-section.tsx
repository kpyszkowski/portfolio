import { createStyles, type StylesProps } from '~/utils/create-styles'
import { Button } from '~/components/ui/button'
import { GlowCard } from '~/components/ui/glow-card'
import { WritingTile } from '~/components/writing-tile'
import { writingsContent } from '~/content/home'
import { type WritingMetadata } from '~/lib/writings'

const writingsSectionStyles = createStyles({
  slots: {
    container: 'px-5 py-24 lg:py-32',
    inner: 'mx-auto max-w-screen-xl md:flex md:items-center',
    meta: 'flex flex-col md:basis-4/10',
    heading:
      'mb-6 text-sm font-medium tracking-widest text-highlight uppercase md:mb-10 md:text-base',
    body: 'mb-8 text-lg leading-relaxed text-elevated',
    content: 'max-md:mt-10 md:basis-2/3 md:pl-10',
    cardContent: 'p-6 lg:p-10',
    footer: 'flex',
  },
})

interface WritingsSectionProps
  extends StylesProps<typeof writingsSectionStyles> {
  className?: string
  latestWriting: WritingMetadata | undefined
}

function WritingsSection(props: WritingsSectionProps) {
  const { className, latestWriting, ...restProps } = props
  const styles = writingsSectionStyles()

  return (
    <GlowCard.Root
      render={<section />}
      className={styles.container({ className })}
      {...restProps}
    >
      <div className={styles.inner()}>
        <div className={styles.meta()}>
          <h2 className={styles.heading()}>{writingsContent.heading}</h2>
          <p className={styles.body()}>{writingsContent.body}</p>
          <div className={styles.footer()}>
            <Button
              href={writingsContent.ctaHref}
              size="sm"
            >
              {writingsContent.ctaLabel}
            </Button>
          </div>
        </div>

        {latestWriting && (
          <div className={styles.content()}>
            <GlowCard.Item>
              <div className={styles.cardContent()}>
                <WritingTile
                  title={latestWriting.title}
                  tags={latestWriting.tags}
                  readingTime={latestWriting.readingTime}
                  url={`/writings/${latestWriting.slug}`}
                  titleElementType="h3"
                />
              </div>
            </GlowCard.Item>
          </div>
        )}
      </div>
    </GlowCard.Root>
  )
}

export { WritingsSection, writingsSectionStyles, type WritingsSectionProps }
