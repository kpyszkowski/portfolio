'use client'
import { Logo } from '@/components/logo'
import cn from '@/utils/cn'
import getFormattedDate from '@/utils/get-formatted-date'
import { useEffect, useMemo, useState } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const getStyles = tv({
  slots: {
    container:
      'mt-auto border-t border-neutral-800 bg-neutral-900 font-mono text-xs text-neutral-500',
    wrapper: 'mx-auto flex w-full max-w-screen-lg items-center py-6',
    decorator: 'flex flex-col',
    logo: 'mx-auto',
  },
})

interface FooterProps extends VariantProps<typeof getStyles> {
  className?: string
}

function Footer(props: FooterProps) {
  const { className = '', ...restProps } = props

  const styles = getStyles()

  const [currentTime, setCurrentTime] = useState(Date.now())

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
    <div className={cn(className, styles.container())} {...restProps}>
      <div className={styles.wrapper()}>
        <div className={styles.decorator()}>
          <span>Poznan, PL</span>
          <span suppressHydrationWarning>{dateDecorator}</span>
        </div>

        <Logo className={styles.logo()} size="sm" color="light" />

        <div className={styles.decorator()}>
          <span>Made with ☕️ and 🤍 &copy; {new Date().getFullYear()}</span>
        </div>
      </div>
    </div>
  )
}

export default Footer
