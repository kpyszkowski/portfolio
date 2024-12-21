import { Logo } from '@/components/logo'
import { TabsMenu } from '@/components/ui/tabs-menu'
import cn from '@/utils/cn'
import { tv, type VariantProps } from 'tailwind-variants'

const getStyles = tv({
  slots: {
    container: '',
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
          href: '/blog',
        },
        {
          id: 'item-5',
          label: 'Contact',
          disabled: true,
          disabledLabel: DISABLED_LABEL,
        },
      ]}
      renderBefore={() => <Logo color="light" className="mx-3" size="sm" />}
      {...restProps}
    />
  )
}

export default Header
