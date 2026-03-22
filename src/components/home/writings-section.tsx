'use client'
import Link from 'next/link'
import { createStyles, type StylesProps } from '~/utils/create-styles'
import { Button } from '~/components/ui/button'
import { GlowCard } from '~/components/ui/glow-card'
import {
  WritingTile,
  WritingTileHeading,
  WritingTileTags,
  WritingTileReadingTime,
} from '~/components/writing-tile'
import { SectionLayout } from '~/components/ui/section-layout'
import { writingsContent } from '~/content/home'
import { type WritingMetadata } from '~/lib/writings'
import { ArrowRight } from 'react-feather'

const writingsSectionStyles = createStyles({
  slots: {
    wrapper: 'flex flex-col items-start gap-16 md:flex-row',
    content: 'flex flex-col gap-12 md:basis-4/10',
    paragraphs: 'flex flex-col gap-4 leading-relaxed text-elevated md:text-lg',
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
              render={<Link href={writingsContent.ctaHref} />}
              className={styles.button()}
              size="sm"
              variant="solid"
              icon={ArrowRight}
              iconPosition="right"
            >
              {writingsContent.ctaLabel}
            </Button>
          </div>

          {latestWriting && (
            <div className={styles.writingWrapper()}>
              <GlowCard.Item>
                <WritingTile
                  className={styles.cardContent()}
                  href={`/writings/${latestWriting.slug}`}
                >
                  <WritingTileHeading as="h3">
                    {latestWriting.title}
                  </WritingTileHeading>
                  {latestWriting.tags && (
                    <WritingTileTags
                      color="main"
                      tags={latestWriting.tags}
                    />
                  )}
                  <WritingTileReadingTime minutes={latestWriting.readingTime} />
                </WritingTile>
              </GlowCard.Item>
            </div>
          )}
        </div>
      </SectionLayout.Wrapper>
    </SectionLayout.Root>
  )
}

export { WritingsSection, writingsSectionStyles, type WritingsSectionProps }
