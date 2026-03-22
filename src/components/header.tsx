'use client'
import { useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { createStyles, type StylesProps } from '~/utils/create-styles'
import { Logo } from '~/components/logo'
import { TabsMenu } from '~/components/ui/tabs-menu'

const headerStyles = createStyles({
  slots: {
    container: [
      'pointer-events-none fixed top-0 z-30 flex w-full justify-center',
      'before:pointer-events-none before:absolute before:inset-0 before:size-full before:bg-main/75 before:mask-b-from-25% before:backdrop-blur-sm',
    ],
    menu: 'pointer-events-auto z-20 my-3 md:my-6',
    logo: 'px-2 md:px-4',
  },
})

interface HeaderProps extends StylesProps<typeof headerStyles> {
  className?: string
}

const ITEMS = [
  {
    id: 'item-1',
    label: 'Home',
    href: '/',
  },
  {
    id: 'item-2',
    label: 'About',
    href: '/#about',
  },
  {
    id: 'item-3',
    label: 'Experience',
    href: '/#experience',
  },
  {
    id: 'item-4',
    label: 'Writings',
    href: '/writings',
  },
]

function Header(props: HeaderProps) {
  const { className = '', ...restProps } = props

  const styles = headerStyles()
  const router = useRouter()
  const pathname = usePathname()

  const [scrollActiveIndex, setScrollActiveIndex] = useState<number | null>(
    null,
  )
  const scrollActiveRef = useRef<number | null>(null)

  useEffect(() => {
    if (pathname !== '/') {
      scrollActiveRef.current = null
      return
    }

    const SECTIONS = [
      { id: 'about', navIndex: 1 },
      { id: 'experience', navIndex: 2 },
    ]

    const updateActive = () => {
      let next: number | null = null
      for (const { id, navIndex } of SECTIONS) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.5) {
          next = navIndex
        }
      }
      if (next !== scrollActiveRef.current) {
        scrollActiveRef.current = next
        setScrollActiveIndex(next)
      }
    }

    let rafId = 0
    const onScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(updateActive)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    updateActive()

    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [pathname])

  const pathDefaultActive = ITEMS.findIndex((item) =>
    item.href === '/'
      ? pathname === '/'
      : (pathname?.startsWith(item.href) ?? false),
  )
  const defaultActive =
    pathname === '/'
      ? (scrollActiveIndex ?? pathDefaultActive)
      : pathDefaultActive

  const items = ITEMS.map((item) => {
    if (item.href === '/') {
      return {
        ...item,
        onClick: (e: React.MouseEvent) => {
          e.preventDefault()
          if (pathname === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' })
          } else {
            router.push('/')
          }
        },
      }
    }
    if (item.href === '/writings') {
      return {
        ...item,
        onClick: (e: React.MouseEvent) => {
          e.preventDefault()
          if (pathname.startsWith('/writings')) {
            window.scrollTo({ top: 0, behavior: 'smooth' })
          } else {
            router.push('/writings')
          }
        },
      }
    }
    if (!item.href?.startsWith('/#')) return item
    const id = item.href.slice(2)
    return {
      ...item,
      onClick: (e: React.MouseEvent) => {
        e.preventDefault()
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        } else {
          router.push(item.href)
        }
      },
    }
  })

  return (
    <header className={styles.container({ className })}>
      <TabsMenu
        className={styles.menu()}
        items={items}
        defaultActive={defaultActive}
        renderBefore={
          <div className={styles.logo()}>
            <Logo size="sm" />
          </div>
        }
        {...restProps}
      />
    </header>
  )
}

export { Header, headerStyles, type HeaderProps }
