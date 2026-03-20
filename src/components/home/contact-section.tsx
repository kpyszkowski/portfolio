'use client'
import { createStyles, type StylesProps } from '~/utils/create-styles'
import { CopyButton } from '~/components/ui/copy-button'
import { SectionLayout } from '~/components/ui/section-layout'
import { contactContent } from '~/content/home'
import { MagnifiedText } from '~/components/ui/magnified-text'

const contactSectionStyles = createStyles({
  slots: {
    container: 'pb-6 lg:pb-6',
    body: 'mb-8 max-w-md text-lg leading-relaxed text-elevated',
    email: 'mb-8 flex items-center gap-2',
    emailAddress: 'text-base text-main',
    links: 'group flex text-main',
    link: 'block p-3 transition-opacity group-hover:opacity-25 first:-ml-3 hover:!opacity-100 focus-visible:!opacity-100',
    linkIcon: 'size-5',
    textDecorator: 'text-highlight opacity-10',
  },
})

interface ContactSectionProps extends StylesProps<typeof contactSectionStyles> {
  className?: string
}

function ContactSection(props: ContactSectionProps) {
  const { className, ...restProps } = props
  const styles = contactSectionStyles()

  return (
    <SectionLayout.Root
      id="contact"
      className={styles.container({ className })}
      {...restProps}
    >
      <SectionLayout.Wrapper>
        <SectionLayout.Heading>{contactContent.heading}</SectionLayout.Heading>
        <p className={styles.body()}>{contactContent.body}</p>

        <div className={styles.email()}>
          <span className={styles.emailAddress()}>{contactContent.email}</span>
          <CopyButton label={{ default: 'Copy', copied: 'Copied!' }}>
            {contactContent.email}
          </CopyButton>
        </div>

        <ul className={styles.links()}>
          {contactContent.links.map(({ label, href, icon: Icon }) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={label}
                className={styles.link()}
              >
                <Icon className={styles.linkIcon()} />
              </a>
            </li>
          ))}
        </ul>
      </SectionLayout.Wrapper>

      <SectionLayout.Wrapper width="2xl">
        <MagnifiedText
          mode="tracked"
          origin="relative"
          minWeight={350}
          className={styles.textDecorator()}
        >
          Kamil Pyszkowski
        </MagnifiedText>
      </SectionLayout.Wrapper>
    </SectionLayout.Root>
  )
}

export { ContactSection, contactSectionStyles, type ContactSectionProps }
