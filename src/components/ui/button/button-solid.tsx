// TODO: Resolve circular dependency
// eslint-disable-next-line import/no-cycle
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import Link from 'next/link'
import { CSSProperties } from 'react'
import { tv } from 'tailwind-variants'
import { ButtonProps } from '~/components/ui/button/button'
import cn from '~/utils/cn'

const getStyles = tv({
  slots: {
    container: 'group relative inline-block',
    wrapper:
      'relative overflow-hidden bg-neutral-50 shadow-[-1px_0_0,_0_1px_0] shadow-black/5',
    backgroundWrapper: 'absolute inset-0',
    background: 'absolute inset-0 holographic',
    overlay: 'absolute inset-0.5 bg-white opacity-40',
    typography: 'relative text-neutral-900 drop-shadow-[0_0_2px_white]',
    glowWrapper:
      'absolute inset-0 opacity-40 blur-xl invert transition-opacity group-hover:opacity-50',
    glow: 'absolute -inset-0.5 holographic',
  },
  variants: {
    size: {
      sm: {
        wrapper: 'rounded-2xl px-6 py-2',
        overlay: 'rounded-[0.9375rem]', // 15px
      },
      md: {
        wrapper: 'rounded-3xl px-8 py-2.5',
        overlay: 'inset-1 rounded-[1.375rem]', // 22px
      },
      lg: {
        wrapper: 'rounded-[2rem] px-10 py-3',
        overlay: 'inset-1 rounded-[1.875rem]', // 30px
      },
    },
  },
})

const SPRING_OPTIONS = { stiffness: 100, damping: 8 }

type ButtonSolidProps = Omit<
  ButtonProps,
  'variant' | 'iconPosition' | 'children'
> & {
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
    '--tw-holographic-mx': smoothX,
    '--tw-holographic-my': smoothY,
  } as CSSProperties

  const wrapperStyle = {
    rotateX,
    rotateY,
    z: smoothZPosition,
  } as CSSProperties

  const LinkComponent = isExternal ? 'a' : Link
  const Component = motion.create(href ? LinkComponent : 'button')

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
      <div className={styles.glowWrapper()}>
        <span className={styles.glow()} />
      </div>

      <motion.div
        className={styles.wrapper()}
        style={wrapperStyle}
      >
        <span className={styles.backgroundWrapper()}>
          <span className={styles.background()} />
        </span>

        <span className={styles.overlay()} />

        <span className={styles.typography()}>{children}</span>
      </motion.div>
    </Component>
  )
}

export default ButtonSolid
