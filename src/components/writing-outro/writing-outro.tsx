'use client'
import { Signature } from '@/components/signature'
import { WritingNavigationContext } from '@/components/writing-navigation/writing-navigation'
import cn from '@/utils/cn'
import { motion, useInView } from 'framer-motion'
import { useRef, useContext, useEffect } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const getStyles = tv({
  slots: {
    container: 'writing-outro-background mt-24 overflow-hidden',
    wrapper: 'prose relative mx-auto px-5 py-20',
    spotlight:
      'pointer-events-none absolute right-0 top-0 h-full w-auto fill-neutral-400 mix-blend-color-dodge blur-md',
    content: 'text-lg text-neutral-300',
    signature: 'h-auto w-36 text-neutral-400',
  },
})

interface WritingOutroProps extends VariantProps<typeof getStyles> {
  className?: string
}

function WritingOutro(props: WritingOutroProps) {
  const { className = '', ...restProps } = props

  const styles = getStyles()

  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef)

  const { setIsVisible: setNavigationVisible } = useContext(
    WritingNavigationContext,
  )

  useEffect(() => setNavigationVisible(!isInView), [isInView])

  return (
    <div
      className={cn(styles.container(), className)}
      ref={containerRef}
      {...restProps}
    >
      <div className={styles.wrapper()}>
        <motion.svg
          className={styles.spotlight()}
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="128"
          viewBox="0 0 64 128"
          style={{
            transformOrigin: '112% 20%',
          }}
          initial={{
            opacity: 0.24,
            rotate: 90,
            scaleX: 2.25,
            scaleY: 1,
          }}
          whileInView={{
            opacity: 0.32,
            rotate: 40,
            scaleX: 2.1,
            scaleY: 1.6,
            x: '50%',
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

        <p className={styles.content()}>
          I hope you found this article helpful and that it added value to your
          learning journey. I'd love to hear your thoughts, feedback, or
          questions — feel free to reach out via email at kamil@pyszkowski.dev.
          If you enjoyed this writing, take a moment to explore other articles.
          Don't forget to check back soon for fresh insights and updates!
        </p>

        <p className={styles.content()}>
          See you around! <br /> — Kamil
        </p>

        <Signature
          className={styles.signature()}
          whileInView
          transition={{
            delay: 1.5,
          }}
        />
      </div>
    </div>
  )
}

export default WritingOutro
