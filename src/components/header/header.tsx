'use client'
import { useEffect, useRef, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'motion/react'
import { Popover as PopoverPrimitive } from '@base-ui-components/react/popover'
import { Menu, X } from 'react-feather'
import { createStyles, type StylesProps } from '~/utils/create-styles'
import { homeSectionIds } from '~/content/home'
import { Logo } from '~/components/logo'
import { TabsMenu } from '~/components/ui/tabs-menu'

const MotionPopoverPopup = motion.create(PopoverPrimitive.Popup)

type NavItem = {
  id: string
  label: string
  href: string
  sectionId: string
  routeMatch?: string
}

const SCROLL_BLOCK: Partial<Record<string, ScrollLogicalPosition>> = {
  [homeSectionIds.about]: 'end',
}

const NAV_ITEMS: NavItem[] = [
  { id: 'nav-home', label: 'Home', href: '/', sectionId: homeSectionIds.hero },
  {
    id: 'nav-about',
    label: 'About',
    href: `/#${homeSectionIds.about}`,
    sectionId: homeSectionIds.about,
  },
  {
    id: 'nav-projects',
    label: 'Projects',
    href: `/#${homeSectionIds.projects}`,
    sectionId: homeSectionIds.projects,
  },
  {
    id: 'nav-experience',
    label: 'Experience',
    href: `/#${homeSectionIds.experience}`,
    sectionId: homeSectionIds.experience,
  },
  {
    id: 'nav-writings',
    label: 'Writings',
    href: `/#${homeSectionIds.writings}`,
    sectionId: homeSectionIds.writings,
    routeMatch: '/writings',
  },
  {
    id: 'nav-contact',
    label: 'Contact',
    href: `/#${homeSectionIds.contact}`,
    sectionId: homeSectionIds.contact,
  },
]

const headerStyles = createStyles({
  slots: {
    container: [
      'pointer-events-none sticky top-0 z-30 flex w-full justify-center',
      'before:pointer-events-none before:absolute before:inset-0 before:size-full before:bg-main/75 before:mask-b-from-25% before:backdrop-blur-sm',
    ],
    nav: 'pointer-events-auto z-20 my-3 w-full px-3 md:my-6 md:w-auto md:px-0',
    logo: 'pr-3 pl-2 md:pr-5 md:pl-4',
    mobilePill:
      'relative flex w-full items-center overflow-hidden rounded-3xl bg-elevated neumorphism md:inline-flex md:w-auto',
    mobileInner:
      'flex w-full items-center divide-x divide-highlight/25 overflow-hidden p-2',
    menuTrigger:
      'flex cursor-pointer items-center justify-center rounded-2xl p-2 text-main transition-colors hover:bg-highlight',
    menuTriggerIcon: 'size-4 stroke-[1.5]',
    mobilePopup:
      'flex min-w-44 flex-col overflow-hidden rounded-3xl bg-elevated p-2 neumorphism',
    mobileNavItem:
      'relative flex w-full cursor-pointer items-center rounded-2xl px-4 py-2.5 text-sm/none text-main',
    mobileNavHighlight: 'absolute inset-0 -z-10 rounded-2xl bg-highlight',
  },
})

interface HeaderProps extends StylesProps<typeof headerStyles> {
  className?: string
}

function Header(props: HeaderProps) {
  const { className = '' } = props
  const styles = headerStyles()
  const router = useRouter()
  const pathname = usePathname()

  // Scroll-driven active index — only meaningful on the home page.
  const [scrollActiveIndex, setScrollActiveIndex] = useState(0)
  const clickLock = useRef(false)

  useEffect(() => {
    if (pathname !== '/') return

    // scroll-padding-top offsets the fixed header (72 px mobile / 108 px
    // desktop). scrollIntoView() lands sections at that offset, so we use
    // it as the detection threshold instead of 0.
    const threshold =
      parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) +
      1

    const updateActive = () => {
      // Consume a click lock — skip this detection cycle so an immediate
      // click-set active state isn't overridden by the programmatic scroll.
      if (clickLock.current) {
        clickLock.current = false
        return
      }

      // Last section in document order whose top edge is at or above the
      // threshold wins. IDs must be on transform-free elements.
      let next = 0
      for (let i = 0; i < NAV_ITEMS.length; i++) {
        const el = document.getElementById(NAV_ITEMS[i]!.sectionId)
        if (el && el.getBoundingClientRect().top <= threshold) {
          next = i
        }
      }
      setScrollActiveIndex(next)
    }

    // Observation zone: y=0 to y=threshold (clip bottom so zone ends at threshold).
    // IO fires exactly when a section's top crosses the threshold — entering the
    // zone from below triggers the update at the right scroll position.
    const bottomClip = Math.max(0, window.innerHeight - threshold)
    const observer = new IntersectionObserver(updateActive, {
      rootMargin: `0px 0px -${bottomClip}px 0px`,
      threshold: 0,
    })

    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.sectionId)
      if (el) observer.observe(el)
    })

    updateActive()

    return () => observer.disconnect()
  }, [pathname])

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleNavClick =
    (item: NavItem, index: number) => (e: React.MouseEvent) => {
      e.preventDefault()
      setMobileMenuOpen(false)

      if (pathname !== '/') {
        router.push(item.href)
        return
      }

      // Click is source of truth — immediately update active state
      setScrollActiveIndex(index)
      // Lock prevents the following programmatic scroll event from overriding
      clickLock.current = true

      const el = document.getElementById(item.sectionId)
      if (el) {
        el.scrollIntoView({ block: SCROLL_BLOCK[item.sectionId] ?? 'start' })
      }
    }

  const tabsMenuItems = NAV_ITEMS.map((item, index) => ({
    id: item.id,
    label: item.label,
    href: item.href,
    onClick: handleNavClick(item, index),
  }))

  return (
    <header className={styles.container({ className })}>
      {/* Desktop */}
      <div className={`${styles.nav()} hidden md:block`}>
        <TabsMenu
          items={tabsMenuItems}
          setActiveItem={setScrollActiveIndex}
          activeItem={scrollActiveIndex}
          renderBefore={
            <div className={styles.logo()}>
              <Logo size="sm" />
            </div>
          }
        />
      </div>

      {/* Mobile */}
      <div className={`${styles.nav()} md:hidden`}>
        <PopoverPrimitive.Root
          open={mobileMenuOpen}
          onOpenChange={setMobileMenuOpen}
        >
          <div className={styles.mobilePill()}>
            <div className={styles.mobileInner()}>
              <div className={styles.logo()}>
                <Logo size="sm" />
              </div>
              <div className="ml-auto pl-2">
                <PopoverPrimitive.Trigger className={styles.menuTrigger()}>
                  <AnimatePresence
                    mode="wait"
                    initial={false}
                  >
                    {mobileMenuOpen ? (
                      <motion.span
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                      >
                        <X className={styles.menuTriggerIcon()} />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="open"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                      >
                        <Menu className={styles.menuTriggerIcon()} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </PopoverPrimitive.Trigger>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {mobileMenuOpen && (
              <PopoverPrimitive.Portal>
                <PopoverPrimitive.Positioner
                  sideOffset={16}
                  alignOffset={-8}
                  side="bottom"
                  align="end"
                >
                  <MotionPopoverPopup
                    className={styles.mobilePopup()}
                    initial={{ opacity: 0, scale: 0.92, y: -4 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92, y: -4 }}
                    style={{ transformOrigin: 'var(--transform-origin)' }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 24,
                      mass: 0.8,
                      opacity: {
                        type: 'tween',
                        ease: [0.16, 1, 0.3, 1],
                        duration: 0.2,
                      },
                    }}
                  >
                    {NAV_ITEMS.map((item, index) => (
                      <button
                        key={item.id}
                        className={styles.mobileNavItem()}
                        onClick={handleNavClick(item, index)}
                      >
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </MotionPopoverPopup>
                </PopoverPrimitive.Positioner>
              </PopoverPrimitive.Portal>
            )}
          </AnimatePresence>
        </PopoverPrimitive.Root>
      </div>
    </header>
  )
}

export { Header, headerStyles, type HeaderProps }
