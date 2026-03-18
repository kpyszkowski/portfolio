import { createStyles, type StylesProps } from '~/utils/create-styles'

const logoStyles = createStyles({
  slots: {
    container: 'fill-none',
  },
  variants: {
    size: {
      sm: {
        container: 'size-5 stroke-2',
      },
      md: {
        container: 'size-8',
      },
      lg: {
        container: 'size-12',
      },
    },
    color: {
      auto: {
        container: 'stroke-current',
      },
      dark: {
        container: 'stroke-main',
      },
      light: {
        container: 'stroke-neutral-50',
      },
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'auto',
  },
})

interface LogoProps extends StylesProps<typeof logoStyles> {
  className?: string
}

function Logo(props: LogoProps) {
  const { className = '', size, color, ...restProps } = props

  const styles = logoStyles({ size, color })

  return (
    <svg
      className={styles.container({ className })}
      viewBox="0 0 32 32"
      shapeRendering="geometricPrecision"
      {...restProps}
    >
      <path
        d="M29.1428 26.5963L19.4445 16L14.2857 20.7394V31.4286"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M29.1428 0.571426L14.6043 14.6545V0.571426C14.6043 0.571426 2.27803 0.657001 2.28571 9.95599C2.29149 16.9294 10.1248 18.2857 10.1248 18.2857"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.28571 28.5714C7.54808 28.5714 8.57143 27.5481 8.57143 26.2857C8.57143 25.0233 7.54808 24 6.28571 24C5.02335 24 4 25.0233 4 26.2857C4 27.5481 5.02335 28.5714 6.28571 28.5714Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export { Logo, logoStyles, type LogoProps }
