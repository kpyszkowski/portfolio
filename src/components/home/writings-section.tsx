import { createStyles, type StylesProps } from '~/utils/create-styles'
import { Button } from '~/components/ui/button'
import { GlowCard } from '~/components/ui/glow-card'
import { WritingTile } from '~/components/writing-tile'
import { SectionLayout } from '~/components/ui/section-layout'
import { writingsContent } from '~/content/home'
import { type WritingMetadata } from '~/lib/writings'

const writingsSectionStyles = createStyles({
  slots: {
    wrapper: 'flex flex-col items-start gap-16 md:flex-row',
    content: 'flex flex-col gap-12 md:basis-4/10',
    paragraphs: 'flex flex-col gap-4 text-lg leading-relaxed text-elevated',
    writingWrapper: 'w-full md:basis-2/3',
    cardContent: 'p-6 md:p-10',
    button: 'self-start',
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
    <SectionLayout.Root
      render={
        <GlowCard.Root
          render={<section />}
          animate
        />
      }
      className={className}
      {...restProps}
    >
      <SectionLayout.Wrapper>
        <SectionLayout.Heading>{writingsContent.heading}</SectionLayout.Heading>

        <div className={styles.wrapper()}>
          <div className={styles.content()}>
            <div className={styles.paragraphs()}>
              {writingsContent.body.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            <Button
              className={styles.button()}
              href={writingsContent.ctaHref}
              size="sm"
            >
              {writingsContent.ctaLabel}
            </Button>
          </div>

          {latestWriting && (
            <div className={styles.writingWrapper()}>
              <GlowCard.Item>
                <WritingTile
                  className={styles.cardContent()}
                  title={latestWriting.title}
                  tags={latestWriting.tags}
                  readingTime={latestWriting.readingTime}
                  url={`/writings/${latestWriting.slug}`}
                  titleElementType="h3"
                />
              </GlowCard.Item>
            </div>
          )}
        </div>
      </SectionLayout.Wrapper>
    </SectionLayout.Root>
  )
}

export { WritingsSection, writingsSectionStyles, type WritingsSectionProps }
