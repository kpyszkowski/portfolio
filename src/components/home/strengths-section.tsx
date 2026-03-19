'use client'
import { createStyles, type StylesProps } from '~/utils/create-styles'
import { GlowCard } from '~/components/ui/glow-card'
import { SectionLayout } from '~/components/ui/section-layout'
import { strengthsContent } from '~/content/home'

const strengthsSectionStyles = createStyles({
  slots: {
    grid: 'grid grid-cols-1 content-stretch gap-6 md:grid-cols-2',
    cardWrapper: 'flex h-full flex-col p-6 lg:p-12',
    cardIconWrapper:
      'mb-6 flex size-10 items-center justify-center rounded-xl bg-highlight text-main',
    cardIcon: 'size-5 text-accent',
    cardHeading: 'mb-4 text-base font-medium text-main md:text-xl',
    cardBody: 'leading-relaxed text-elevated md:text-lg',
  },
})

interface StrengthsSectionProps
  extends StylesProps<typeof strengthsSectionStyles> {
  className?: string
}

function StrengthsSection(props: StrengthsSectionProps) {
  const { className, ...restProps } = props
  const styles = strengthsSectionStyles()

  return (
    <SectionLayout.Root
      render={<GlowCard.Root render={<section />} />}
      className={className}
      {...restProps}
    >
      <SectionLayout.Wrapper>
        <SectionLayout.Heading>
          {strengthsContent.heading}
        </SectionLayout.Heading>

        <div className={styles.grid()}>
          {strengthsContent.items.map(({ id, heading, body, icon: Icon }) => (
            <GlowCard.Item key={id}>
              <div className={styles.cardWrapper()}>
                <div className={styles.cardIconWrapper()}>
                  <Icon className={styles.cardIcon()} />
                </div>
                <h3 className={styles.cardHeading()}>{heading}</h3>
                <p className={styles.cardBody()}>{body}</p>
              </div>
            </GlowCard.Item>
          ))}
        </div>
      </SectionLayout.Wrapper>
    </SectionLayout.Root>
  )
}

export { StrengthsSection, strengthsSectionStyles, type StrengthsSectionProps }
