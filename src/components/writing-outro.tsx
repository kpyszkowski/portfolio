'use client'
import { motion } from 'motion/react'
import { createStyles, type StylesProps } from '~/utils/create-styles'
import { Signature } from '~/components/signature'
import { CopyButton } from '~/components/ui/copy-button'
import useBreakpoint from '~/hooks/use-breakpoint'

const writingOutroStyles = createStyles({
  slots: {
    container: 'writing-outro-background mt-24 overflow-hidden',
    wrapper: 'relative mx-auto prose px-5 py-20',
    spotlight:
      'pointer-events-none absolute top-0 right-0 h-full w-auto origin-[100%_0%] fill-secondary/50 mix-blend-color-dodge blur-md md:origin-[112%_20%]',
    content:
      'text-justify text-base text-balance text-primary md:text-lg md:text-wrap',
    copyButton: 'inline-flex underline',
    signature: 'h-auto w-36',
  },
})

interface WritingOutroProps extends StylesProps<typeof writingOutroStyles> {
  className?: string
}

function WritingOutro(props: WritingOutroProps) {
  const { className = '', ...restProps } = props

  const styles = writingOutroStyles()
  const isDesktop = useBreakpoint('md')

  return (
    <div
      className={styles.container({ className })}
      {...restProps}
    >
      <div className={styles.wrapper()}>
        {isDesktop && (
          <motion.svg
            className={styles.spotlight()}
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="128"
            viewBox="0 0 64 128"
            initial={{
              opacity: 0.24,
              rotate: 90,
              scaleX: 2.25,
              scaleY: 1,
              x: 0,
            }}
            whileInView={{
              opacity: 0.32,
              rotate: 40,
              scaleX: 2.06,
              scaleY: 1.6,
              x: 0,
              transition: {
                delay: 1,
                duration: 2,
                ease: [0.5, 0, 0, 1],
              },
            }}
          >
            <path
              d="M11.065 0h33.701L56 108.454c-13.016 26.078-42.967 26.044-56 0z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        )}

        <p className={styles.content()}>
          I hope you found this article helpful and that it added value to your
          learning journey. I&apos;d love to hear your thoughts, feedback, or
          questions — feel free to reach out via email at{' '}
          <CopyButton className={styles.copyButton()}>
            kamil@pyszkowski.dev
          </CopyButton>
          . If you enjoyed this writing, take a moment to explore other
          articles. Don&apos;t forget to check back soon for fresh insights and
          updates!
        </p>

        <p className={styles.content()}>
          See you around! <br /> — Kamil
        </p>

        <Signature
          className={styles.signature()}
          whileInView
        />
      </div>
    </div>
  )
}

export { WritingOutro, writingOutroStyles, type WritingOutroProps }
