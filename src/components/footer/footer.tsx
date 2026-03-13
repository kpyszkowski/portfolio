'use client'
import { useEffect, useMemo, useState } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'
import { Logo } from '~/components/logo'
import getFormattedDate from '~/utils/get-formatted-date'

const getStyles = tv({
  slots: {
    container: 'mt-auto border-t border-current bg-primary text-primary/8',
    wrapper:
      'mx-auto flex w-full max-w-screen-lg flex-col-reverse items-center px-5 py-6 text-primary sm:flex-row',
    decorator:
      'flex flex-col items-end font-mono text-xs/relaxed text-tertiary',
    logo: 'order-last mx-auto mb-4 sm:order-none sm:mb-0',
  },
})

interface FooterProps extends VariantProps<typeof getStyles> {
  className?: string
}

function Footer(props: FooterProps) {
  const { className = '', ...restProps } = props

  const styles = getStyles()

  const [currentTime, setCurrentTime] = useState(() => Date.now())

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const dateDecorator = useMemo(
    () =>
      getFormattedDate(new Date(currentTime), {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZone: 'Europe/Warsaw',
      }),
    [currentTime],
  )
  return (
    <div
      className={styles.container({ className })}
      {...restProps}
    >
      <div className={styles.wrapper()}>
        <div className={styles.decorator()}>
          <span suppressHydrationWarning>{dateDecorator}</span>
        </div>

        <Logo
          className={styles.logo()}
          size="md"
        />

        <div className={styles.decorator()}>
          <span>
            Genuinely crafted in Poland &copy; {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Footer
