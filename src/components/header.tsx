'use client'
import { usePathname } from 'next/navigation'
import { createStyles, type StylesProps } from '~/utils/create-styles'
import { Logo } from '~/components/logo'
import { TabsMenu } from '~/components/ui/tabs-menu'

const headerStyles = createStyles({
  slots: {
    container: [
      'fixed top-0 z-30 flex w-full justify-center',
      'before:absolute before:inset-0 before:size-full before:bg-main/75 before:mask-b-from-25% before:backdrop-blur-sm',
    ],
    menu: 'z-20 my-3 md:my-6',
    background: 'absolute inset-0 z-10 size-full',
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

  const pathname = usePathname()
  const defaultActive = ITEMS.findIndex((item) =>
    item.href ? pathname?.startsWith(item.href) : false,
  )

  return (
    <header className={styles.container({ className })}>
      <TabsMenu
        className={styles.menu()}
        items={ITEMS}
        defaultActive={defaultActive}
        renderBefore={
          <div className={styles.logo()}>
            <Logo size="sm" />
          </div>
        }
        {...restProps}
      />
      <span className={styles.background()} />
    </header>
  )
}

export { Header, headerStyles, type HeaderProps }
