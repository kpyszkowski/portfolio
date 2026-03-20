'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform, cubicBezier } from 'motion/react'
import useBreakpoint from '~/hooks/use-breakpoint'
import { createStyles, type StylesProps } from '~/utils/create-styles'
import getFormattedDate from '~/utils/get-formatted-date'
import { experienceContent } from '~/content/home'
import { SectionLayout } from '~/components/ui/section-layout'

const experienceSectionStyles = createStyles({
  slots: {
    list: 'flex flex-col gap-20',
    item: 'flex flex-col md:flex-row',
    itemMeta: '-z-10 flex grow flex-col gap-1 md:items-end',
    itemPeriod: 'mb-4 text-highlight',
    itemCompany: 'text-4xl font-black text-main',
    itemContent:
      'flex basis-2/3 flex-col gap-1 border-(--background-color-highlight) bg-main max-md:mt-12 md:ml-10 md:border-l md:pb-24 md:pl-10 md:text-lg',
    itemRole: 'mb-4 font-medium text-main md:text-xl',
    itemDescription: 'leading-relaxed text-elevated',
  },
})

type ExperienceItemProps = {
  company: string
  role: string
  from: string
  to?: string | null
  description: string
  id: string
}

function ExperienceItem(props: ExperienceItemProps) {
  const { company, role, from, to, description, id } = props
  const styles = experienceSectionStyles()
  const ref = useRef<HTMLLIElement>(null)

  const isMd = useBreakpoint('md')

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start center'],
  })

  const x = useTransform(scrollYProgress, [0, 1], [isMd ? 64 : 0, 0], {
    ease: cubicBezier(0.25, 0.46, 0.45, 0.94),
  })

  const fromDate = new Date(from)
  const toDate = to ? new Date(to) : null
  const fromLabel = getFormattedDate(fromDate, {
    month: 'short',
    year: 'numeric',
    day: undefined,
    weekday: undefined,
  })
  const toLabel = toDate
    ? getFormattedDate(toDate, {
        month: 'short',
        year: 'numeric',
        day: undefined,
        weekday: undefined,
      })
    : 'Present'

  return (
    <li
      key={id}
      ref={ref}
      className={styles.item()}
    >
      <motion.div
        className={styles.itemMeta()}
        style={{ x }}
      >
        <span className={styles.itemPeriod()}>
          {fromLabel} — {toLabel}
        </span>
        <span className={styles.itemCompany()}>{company}</span>
      </motion.div>

      <div className={styles.itemContent()}>
        <span className={styles.itemRole()}>{role}</span>
        <p className={styles.itemDescription()}>{description}</p>
      </div>
    </li>
  )
}

interface ExperienceSectionProps
  extends StylesProps<typeof experienceSectionStyles> {
  className?: string
}

function ExperienceSection(props: ExperienceSectionProps) {
  const { className, ...restProps } = props
  const styles = experienceSectionStyles()

  return (
    <SectionLayout.Root
      id="experience"
      className={className}
      {...restProps}
    >
      <SectionLayout.Wrapper>
        <SectionLayout.Heading>
          {experienceContent.heading}
        </SectionLayout.Heading>

        <ul className={styles.list()}>
          {experienceContent.items.map((item) => (
            <ExperienceItem
              key={item.id}
              {...item}
            />
          ))}
        </ul>
      </SectionLayout.Wrapper>
    </SectionLayout.Root>
  )
}

export {
  ExperienceSection,
  experienceSectionStyles,
  type ExperienceSectionProps,
}
