'use client'
import { createStyles, type StylesProps } from '~/utils/create-styles'
import { CopyButton } from '~/components/ui/copy-button'
import { contactContent } from '~/content/home'

const contactSectionStyles = createStyles({
  slots: {
    container: 'px-5 py-24 lg:py-32',
    inner: 'mx-auto max-w-3xl',
    heading: 'mb-4 text-xs font-medium tracking-widest text-tertiary uppercase',
    body: 'mb-8 max-w-md text-lg leading-relaxed font-extralight text-secondary',
    email: 'mb-8 flex items-center gap-2',
    emailAddress: 'text-base font-light text-primary',
    links: 'group flex text-primary',
    link: 'block p-3 transition-opacity group-hover:opacity-25 first:-ml-3 hover:!opacity-100 focus-visible:!opacity-100',
    linkIcon: 'size-5',
  },
})

interface ContactSectionProps extends StylesProps<typeof contactSectionStyles> {
  className?: string
}

function ContactSection(props: ContactSectionProps) {
  const { className, ...restProps } = props
  const styles = contactSectionStyles()

  return (
    <section
      id="contact"
      className={styles.container({ className })}
      {...restProps}
    >
      <div className={styles.inner()}>
        <h2 className={styles.heading()}>{contactContent.heading}</h2>
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
      </div>
    </section>
  )
}

export { ContactSection, contactSectionStyles, type ContactSectionProps }
