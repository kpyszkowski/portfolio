'use client'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import Link from 'next/link'
import { CSSProperties } from 'react'
import { Icon } from 'react-feather'
import { tv, VariantProps } from 'tailwind-variants'
import cn from '~/utils/cn'

const getStyles = tv({
  slots: {
    container: 'group relative inline-block',
    wrapper:
      'text-background relative overflow-hidden bg-primary transition-shadow group-hover:shadow-lg',
  },
  variants: {
    size: {
      sm: {
        wrapper: 'rounded-2xl px-6 py-2',
      },
      md: {
        wrapper: 'rounded-3xl px-8 py-2.5',
      },
      lg: {
        wrapper: 'rounded-[2rem] px-10 py-3',
      },
    },
  },
})

const SPRING_OPTIONS = { stiffness: 100, damping: 8 }

const MotionButton = motion.create('button')
const MotionLink = motion.create(Link)
const MotionAnchor = motion.create('a')

export interface ButtonSolidProps extends VariantProps<typeof getStyles> {
  className?: string
  icon?: Icon
  href?: string
  isExternal?: boolean
  onClick?: React.MouseEventHandler
  children: React.ReactNode
}

function ButtonSolid(props: ButtonSolidProps) {
  const {
    className = '',
    children,
    size,
    href,
    isExternal,
    ...restProps
  } = props

  const styles = getStyles({ size })

  const xOffsetFactor = useMotionValue(0)
  const yOffsetFactor = useMotionValue(0)
  const zPosition = useMotionValue(0)

  const smoothX = useSpring(xOffsetFactor, SPRING_OPTIONS)
  const smoothY = useSpring(yOffsetFactor, SPRING_OPTIONS)
  const smoothZPosition = useSpring(zPosition, SPRING_OPTIONS)

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [8, -8])
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-8, 8])

  const handleMouseMove = (event: React.MouseEvent) => {
    const containerRect = event.currentTarget.getBoundingClientRect()
    xOffsetFactor.set(
      (event.clientX - containerRect.left) / containerRect.width - 0.5,
    )
    yOffsetFactor.set(
      (event.clientY - containerRect.top) / containerRect.height - 0.5,
    )
  }
  const handleMouseEnter = () => {
    zPosition.set(24)
  }
  const handleMouseLeave = () => {
    xOffsetFactor.set(0)
    yOffsetFactor.set(0)
    zPosition.set(0)
  }

  const containerStyle = {
    perspective: 1000,
  } as CSSProperties

  const wrapperStyle = {
    rotateX,
    rotateY,
    z: smoothZPosition,
  } as CSSProperties

  const Component = href
    ? isExternal
      ? MotionAnchor
      : MotionLink
    : MotionButton

  return (
    <Component
      className={cn(className, styles.container())}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={containerStyle}
      href={href}
      target={href && isExternal ? '_blank' : undefined}
      {...restProps}
    >
      <motion.div
        className={styles.wrapper()}
        style={wrapperStyle}
      >
        {children}
      </motion.div>
    </Component>
  )
}

export default ButtonSolid
