'use client'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import Link from 'next/link'
import { CSSProperties } from 'react'
import { Icon } from 'react-feather'
import { createStyles, type StylesProps } from '~/utils/create-styles'
import cn from '~/utils/cn'

const buttonStyles = createStyles({
  slots: {
    container: 'inline-block',
    content: 'flex items-center whitespace-nowrap',
    icon: 'text-current',
    wrapper: '',
  },
  variants: {
    variant: {
      solid: {
        container: 'group relative',
        wrapper:
          'text-background relative overflow-hidden bg-main transition-shadow group-hover:shadow-lg',
      },
      outline: {
        container:
          '-m-0.5 border-2 border-elevated text-main transition-colors outline-none',
      },
    },
    size: {
      sm: {
        container: 'rounded-3xl px-6 py-2',
        content: 'gap-3 text-sm font-medium',
        icon: '-mx-1.5 size-3.5',
        wrapper: 'rounded-2xl px-6 py-2',
      },
      md: {
        container: 'rounded-3xl px-8 py-2.5',
        content: 'gap-4 text-base font-medium',
        icon: '-mx-2 size-4',
        wrapper: 'rounded-3xl px-8 py-2.5',
      },
      lg: {
        container: 'rounded-[2rem] px-10 py-3',
        content: 'gap-6 text-lg font-medium',
        icon: '-mx-3 size-5',
        wrapper: 'rounded-[2rem] px-10 py-3',
      },
    },
    iconPosition: {
      left: {
        content: 'flex-row-reverse',
        icon: 'mr-0',
      },
      right: {
        content: 'flex-row',
        icon: 'ml-0',
      },
    },
  },
  compoundVariants: [
    {
      variant: 'solid',
      size: ['sm', 'md', 'lg'],
      class: {
        container: 'rounded-none p-0',
      },
    },
    {
      variant: 'outline',
      size: 'sm',
      class: {
        container: '-m-px border',
      },
    },
  ],
  defaultVariants: {
    variant: 'outline',
    size: 'md',
    iconPosition: 'left',
  },
})

const SPRING_OPTIONS = { stiffness: 100, damping: 8 }

const MotionButton = motion.create('button')
const MotionLink = motion.create(Link)
const MotionAnchor = motion.create('a')

interface ButtonProps extends StylesProps<typeof buttonStyles> {
  className?: string
  children: string
  icon?: Icon
  href?: string
  isExternal?: boolean
  onClick?: React.MouseEventHandler
}

function Button(props: ButtonProps) {
  const {
    className = '',
    variant,
    icon: IconComponent,
    size,
    iconPosition,
    children: label,
    href,
    isExternal,
    ...restProps
  } = props

  const styles = buttonStyles({ variant, size, iconPosition })

  const xOffsetFactor = useMotionValue(0)
  const yOffsetFactor = useMotionValue(0)
  const zPosition = useMotionValue(0)

  const smoothX = useSpring(xOffsetFactor, SPRING_OPTIONS)
  const smoothY = useSpring(yOffsetFactor, SPRING_OPTIONS)
  const smoothZPosition = useSpring(zPosition, SPRING_OPTIONS)

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [8, -8])
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-8, 8])

  const content = (
    <div className={styles.content()}>
      {label}
      {IconComponent && <IconComponent className={styles.icon()} />}
    </div>
  )

  if (variant === 'solid') {
    const SolidComponent = href
      ? isExternal
        ? MotionAnchor
        : MotionLink
      : MotionButton

    const handleMouseMove = (event: React.MouseEvent) => {
      const rect = event.currentTarget.getBoundingClientRect()
      xOffsetFactor.set((event.clientX - rect.left) / rect.width - 0.5)
      yOffsetFactor.set((event.clientY - rect.top) / rect.height - 0.5)
    }

    return (
      <SolidComponent
        className={cn(className, styles.container())}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => zPosition.set(24)}
        onMouseLeave={() => {
          xOffsetFactor.set(0)
          yOffsetFactor.set(0)
          zPosition.set(0)
        }}
        style={{ perspective: 1000 } as CSSProperties}
        href={href}
        target={href && isExternal ? '_blank' : undefined}
        {...restProps}
      >
        <motion.div
          className={styles.wrapper()}
          style={{ rotateX, rotateY, z: smoothZPosition } as CSSProperties}
        >
          {content}
        </motion.div>
      </SolidComponent>
    )
  }

  const LinkComponent = isExternal ? 'a' : Link
  const Component = href ? LinkComponent : 'button'

  return (
    <Component
      className={styles.container({ className })}
      href={href!}
      target={href && isExternal ? '_blank' : undefined}
      {...restProps}
    >
      {content}
    </Component>
  )
}

export { Button, buttonStyles, type ButtonProps }
