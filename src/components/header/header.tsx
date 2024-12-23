import { Logo } from '@/components/logo'
import { TabsMenu } from '@/components/ui/tabs-menu'
import cn from '@/utils/cn'
import { tv, type VariantProps } from 'tailwind-variants'

const getStyles = tv({
  slots: {
    container: 'sticky top-6 z-20 my-6 self-center',
    background:
      'header-background fixed inset-0 z-10 mx-auto h-24 w-full max-w-screen-lg',
  },
})

interface HeaderProps extends VariantProps<typeof getStyles> {
  className?: string
}

const DISABLED_LABEL = 'Coming soon'

function Header(props: HeaderProps) {
  const { className = '', ...restProps } = props

  const styles = getStyles()

  return (
    <>
      <TabsMenu
        className={cn(className, styles.container())}
        items={[
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
          {
            id: 'item-5',
            label: 'Contact',
            disabled: true,
            disabledLabel: DISABLED_LABEL,
          },
        ]}
        renderBefore={<Logo color="light" className="mx-3" size="sm" />}
        {...restProps}
      />
      <span className={styles.background()} />
    </>
  )
}

export default Header
