'use client'
import cn from '@/utils/cn'
import { motion, Transition, Variants } from 'framer-motion'
import { tv, type VariantProps } from 'tailwind-variants'

const getStyles = tv({
  slots: {
    container: 'stroke-current stroke-[0.5] text-neutral-50',
  },
})

interface SignatureProps extends VariantProps<typeof getStyles> {
  className?: string
  initial?: boolean
  whileInView?: boolean
  reverse?: boolean
  transition?: Transition
}

const PATH_LENGTH = 398

const pathVariants: Variants = {
  hidden: ([reverse]: [boolean]) => ({
    strokeDashoffset: PATH_LENGTH * (reverse ? 1 : -1),
  }),
  visible: ([reverse, transition]: [boolean, Transition]) => ({
    strokeDashoffset: 0,
    transition: {
      ease: [0.5, 0, 0.25, 1],
      duration: 4.2,
      ...transition,
    },
  }),
}

function Signature(props: SignatureProps) {
  const {
    className = '',
    initial = true,
    whileInView = false,
    reverse = false,
    transition = {},
    ...restProps
  } = props

  const styles = getStyles()

  return (
    <motion.svg
      className={cn(styles.container(), className)}
      width="255.324"
      height="148.626"
      viewBox="0 0 67.555 39.324"
      {...restProps}
    >
      <motion.path
        variants={pathVariants}
        custom={[reverse, transition]}
        initial={initial ? 'hidden' : false}
        whileInView={whileInView ? 'visible' : undefined}
        animate={whileInView ? undefined : 'visible'}
        d="M55.528 4.573c.403 1.148.615.484.606.213-.026-.369-.714.21-.714.21m5.141 7.94s-1.919 2.721-3.274 1.628c-1.355-1.094-1.285-7.18-1.285-7.18s1.196.802.789 4.802c-.235 2.328-1.69 4.033-2.11 4.084-.42.051-1.097-1.975-2.144-1.627-1.527.508-4.022 3.852-3.69 3 .336-.853 2.543-8.16 3.106-8.458 1.257-.665-2.746 8.82-3.15 8.58-.407-.238-2.3-17.747-2.3-17.747l1.5 13.06s-2.427-1.996-3.175.2c-.494 2.107 3.655.227 3.036 3.611-.524 2.867-4.044.922-3.915.487.731-2.47-1.894-4.613-1.894-4.613 0 .001 3.222 2.707 1.468 5.663-2.034 2.846-3.146-1.494-2.925-1.472.6.658.982 2.578-1.27 3.194-1.918.297-2.186-4.225-2.186-4.225v0s-4.97-3.504-5.253 2.86c.516 3.501 2.092 3.605 3.753 3.15 1.66-.456 5.34-4.584.28-6.657-5.196-1.566-4.11 5.557-3.517 7.008.5 1.22-.848-1.242-2.204-.952-1.182.253-2.614 2.65-2.614 2.65.294-.97 2.782-8.04 2.782-8.04s-2.265 7.645-2.782 8.04c-1.394-.284-3.832-16.774-3.096-18.597 2.81 4.791 2.221 18.966 1.298 19.493-.275-.236-.468-.389-1.632-.56-1.164-.17-2.802 1.544-2.339 1.593.464.05 2.797-8.932 2.936-7.167.054.685-3.826 2.19-4.24 1.12-.092-.593.353-.32.39-.063-4.12.15-4.275 3.544-2.354 3.416 1.92-.128 3.197 1.787 1.933 3.12-1.083 1.142-3.687.193-4.596-.245-.025.643.91 3.58 2.572 6.533 2.494 4.43 1.41 6.194-3.087 6.519-3.401 0-5.344-.778-5.344-.778.26.062 2.585.93 5.344.778 4.69-.258 5.6-2.125 3.106-6.555-1.662-2.953-2.337-5.805-2.591-6.497-.175-1.578-.581-4.456-.294-4.485.7-.08 1.053 7.047-1.688 7.403-3.922.393-2.613-3.254-3.693-6.384.256-.243-3.757 1.637-3.584 1.568 27.638-11.017-.504-21.022-4.152-9.81 0 0 .894-3.365 4.783-4.398 1.054 3.055 1.832 7.935 3.02 12.836 1.626 6.71-.877 8.144-1.328 8.563-6.31 4.482-8.796-3.346-8.796-3.346m9.873 10.327c-9.54-2.87 7.61-9.945 20.76-13.917 17.183-5.19 36.61-10.554 36.61-10.554"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={PATH_LENGTH}
      />
    </motion.svg>
  )
}

export default Signature
