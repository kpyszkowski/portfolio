import { createStyles, type StylesProps } from '~/utils/create-styles'
import { Button } from '~/components/ui/button'
import { WritingTile } from '~/components/writing-tile'
import { writingsContent } from '~/content/home'
import { type WritingMetadata } from '~/lib/writings'

const writingsSectionStyles = createStyles({
  slots: {
    container: 'px-5 py-24 lg:py-32',
    inner: 'mx-auto max-w-3xl',
    header: 'mb-2 flex flex-col gap-2',
    heading: 'text-xs font-medium tracking-widest text-highlight uppercase',
    body: 'text-sm text-elevated',
    tile: 'my-8 border-y border-elevated py-6',
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
    <section
      className={styles.container({ className })}
      {...restProps}
    >
      <div className={styles.inner()}>
        <div className={styles.header()}>
          <h2 className={styles.heading()}>{writingsContent.heading}</h2>
          <p className={styles.body()}>{writingsContent.body}</p>
        </div>

        {latestWriting && (
          <WritingTile
            className={styles.tile()}
            title={latestWriting.title}
            tags={latestWriting.tags}
            readingTime={latestWriting.readingTime}
            url={`/writings/${latestWriting.slug}`}
            titleElementType="h3"
          />
        )}

        <div className={styles.footer()}>
          <Button
            href={writingsContent.ctaHref}
            size="sm"
          >
            {writingsContent.ctaLabel}
          </Button>
        </div>
      </div>
    </section>
  )
}

export { WritingsSection, writingsSectionStyles, type WritingsSectionProps }
