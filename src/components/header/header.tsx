'use client'
import { usePathname } from 'next/navigation'
import { tv, type VariantProps } from 'tailwind-variants'
import { Logo } from '~/components/logo'
import { TabsMenu } from '~/components/ui/tabs-menu'
import cn from '~/utils/cn'

const getStyles = tv({
  slots: {
    container: 'sticky top-0 z-30 flex justify-center px-5',
    menu: 'z-20 my-6',
    background: 'header-background absolute inset-0 z-10 size-full',
    logo: 'mx-2 md:mx-3',
  },
})

interface HeaderProps extends VariantProps<typeof getStyles> {
  className?: string
}

const DISABLED_LABEL = 'Coming soon'
const ITEMS = [
  {
    id: 'item-1',
    label: 'Home',
    disabled: true,
    disabledLabel: DISABLED_LABEL,
  },
  {
    id: 'item-2',
    label: 'About',
    disabled: true,
    disabledLabel: DISABLED_LABEL,
  },
  {
    id: 'item-3',
    label: 'Experience',
    disabled: true,
    disabledLabel: DISABLED_LABEL,
  },
  {
    id: 'item-4',
    label: 'Writings',
    href: '/writings',
  },
]

function Header(props: HeaderProps) {
  const { className = '', ...restProps } = props

  const styles = getStyles()

  const pathname = usePathname()
  const defaultActive = ITEMS.findIndex((item) => item.href === pathname)

  return (
    <header className={cn(className, styles.container())}>
      <TabsMenu
        className={styles.menu()}
        items={ITEMS}
        defaultActive={defaultActive}
        renderBefore={
          <Logo
            color="light"
            className={styles.logo()}
            size="sm"
          />
        }
        {...restProps}
      />
      <span className={styles.background()} />
    </header>
  )
}

export default Header
