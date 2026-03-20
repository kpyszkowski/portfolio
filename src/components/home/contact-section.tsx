'use client'
import { createStyles, type StylesProps } from '~/utils/create-styles'
import Link from 'next/link'
import { Button } from '~/components/ui/button'
import { CopyButton } from '~/components/ui/copy-button'
import { SectionLayout } from '~/components/ui/section-layout'
import { contactContent } from '~/content/home'
import { MagnifiedText } from '~/components/ui/magnified-text'
import Image from 'next/image'
import { easeInOut, motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'

const MotionImage = motion.create(Image)

const contactSectionStyles = createStyles({
  slots: {
    container:
      'bg-radial-[100%_50%_at_bottom_center] from-accent-glow/50 from-[-150%] to-50% pb-6 lg:pb-6',
    wrapper: 'flex flex-col gap-16 md:flex-row',
    content: 'flex flex-1 flex-col',
    portrait:
      '-mb-16 max-w-64 mask-b-from-50% mask-b-to-92% object-contain md:-mb-32 md:max-w-88',
    body: 'mb-8 max-w-md leading-relaxed text-elevated md:text-lg',
    email: 'mb-8 flex items-center gap-2',
    emailAddress: 'text-base text-main',
    links: 'flex flex-wrap gap-3',
    textDecorator: 'mt-6 text-highlight opacity-10 md:mt-0',
  },
})

interface ContactSectionProps extends StylesProps<typeof contactSectionStyles> {
  className?: string
}

function ContactSection(props: ContactSectionProps) {
  const { className, ...restProps } = props
  const styles = contactSectionStyles()

  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress: imageYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  })
  const { scrollYProgress: textYProgress } = useScroll({
    target: containerRef,
    offset: ['center end', 'end end'],
  })

  const imageY = useTransform(imageYProgress, [0, 1], ['50%', '0%'], {
    ease: easeInOut,
  })

  const textY = useTransform(textYProgress, [0, 1], ['50%', '0%'], {
    ease: easeInOut,
  })

  return (
    <SectionLayout.Root
      ref={containerRef}
      id="contact"
      className={styles.container({ className })}
      {...restProps}
    >
      <SectionLayout.Wrapper>
        <SectionLayout.Heading>{contactContent.heading}</SectionLayout.Heading>

        <div className={styles.wrapper()}>
          <div className={styles.content()}>
            <p className={styles.body()}>{contactContent.body}</p>

            <div className={styles.email()}>
              <CopyButton
                label={{
                  default: contactContent.email,
                  copied: 'Copied email address',
                }}
              >
                {contactContent.email}
              </CopyButton>
            </div>

            <ul className={styles.links()}>
              {contactContent.links.map(({ label, href, icon }) => (
                <li key={label}>
                  <Button
                    render={
                      href.startsWith('mailto:') ? (
                        <a href={href} />
                      ) : (
                        <Link href={href} />
                      )
                    }
                    variant="solid"
                    icon={icon}
                  >
                    {label}
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          <MotionImage
            width={512}
            height={554}
            src="/portrait.webp"
            alt="Portrait of Kamil Pyszkowski"
            className={styles.portrait()}
            style={{ y: imageY }}
          />
        </div>
      </SectionLayout.Wrapper>

      <SectionLayout.Wrapper width="2xl">
        <MagnifiedText
          render={<motion.div style={{ y: textY }} />}
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
