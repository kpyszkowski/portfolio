'use client'

import { Logo } from '@/components/logo'
import cn from '@/utils/cn'
import {
  motion,
  SpringOptions,
  useMotionValue,
  useSpring,
  useTransform,
  Variants,
} from 'framer-motion'
import { CSSProperties, useEffect } from 'react'
import { GitHub, Linkedin, Send } from 'react-feather'

const Background = (props: { className?: string }) => {
  const { className = '', ...restProps } = props

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  useEffect(() => {
    mouseX.set(window.innerWidth / 2)
    mouseY.set(window.innerWidth / 2)

    const handleMouseMove = (event: MouseEvent) => {
      mouseX.set(event.clientX)
      mouseY.set(event.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  const smoothMouseX = useSpring(mouseX, SPRING_OPTIONS)
  const smoothMouseY = useSpring(mouseY, SPRING_OPTIONS)
  const rotate = useTransform(smoothMouseX, [0, 2137], [-180, 180])

  return (
    <div
      className={cn(
        className,
        'fixed inset-0 flex items-center justify-center',
      )}
      {...restProps}
    >
      <div className="placeholder-background z-20 size-full" />

      <motion.svg
        className="absolute -inset-[24rem] z-10 hidden size-[48rem] opacity-25 mix-blend-darken saturate-150 lg:block dark:opacity-50 dark:mix-blend-normal"
        width="458.751"
        height="447.742"
        viewBox="0 0 121.378 118.465"
        style={{
          x: smoothMouseX,
          y: smoothMouseY,
          rotate,
        }}
      >
        <defs>
          <filter
            id="a"
            width="2.399"
            height="2.399"
            x="-.7"
            y="-.7"
            style={
              {
                colorInterpolationFilters: 'sRGB',
              } as CSSProperties
            }
          >
            <feGaussianBlur result="blur" stdDeviation="16" />
          </filter>
        </defs>
        <g transform="translate(-25.254 -137.364)" filter="url(#a)">
          <circle cx="86.244" cy="187.423" r="20.862" fill="#00aaa8" />
          <circle cx="96.573" cy="205.77" r="20.862" fill="#aa8c00" />
          <circle cx="75.314" cy="205.77" r="20.862" fill="#aa00a3" />
        </g>
      </motion.svg>
    </div>
  )
}

const SOCIALS = [
  {
    name: 'GitHub',
    icon: GitHub,
    href: 'https://github.com/kpyszkowski',
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/kamil-pyszkowski-8365071ba/',
  },
  {
    name: 'Email',
    icon: Send,
    href: 'mailto:kamil@pyszkowski.dev',
  },
]
const DOTS_VARIANTS: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.16,
    },
  },
}

const DOT_VARIANTS: Variants = {
  hidden: { y: 0 },
  show: {
    y: [0, -4],
    transition: {
      repeat: Infinity,
      repeatType: 'reverse',
      type: 'tween',
      ease: 'easeInOut',
      duration: 0.48,
    },
  },
}

const SPRING_OPTIONS: SpringOptions = {
  damping: 24,
  stiffness: 120,
}

export default function Home() {
  return (
    <div className="font-sans font-extralight">
      <main className="relative z-30 flex min-h-[100dvh] flex-col items-center justify-center p-3 lg:p-10">
        <div className="mb-28 mt-auto flex items-center gap-8 lg:mb-56 lg:gap-16">
          <Logo className="size-20 stroke-neutral-950 lg:size-32 dark:stroke-neutral-50" />

          <div className="flex flex-col gap-3 lg:gap-6">
            <h1 className="text-3xl text-neutral-950 lg:text-6xl dark:text-neutral-50">
              Kamil Pyszkowski
            </h1>
            <span className="text-2xl text-neutral-600 lg:text-4xl dark:text-neutral-400">
              Software Engineer
            </span>
          </div>
        </div>

        <p className="mb-16 text-xl text-neutral-950 lg:mb-32 lg:text-2xl dark:text-neutral-50">
          Coming soon in 2025
          <motion.span
            className="mx-2"
            initial="hidden"
            animate="show"
            variants={DOTS_VARIANTS}
          >
            {'...'.split('').map((char, index) => (
              <motion.span
                key={index}
                className="mx-0.5 inline-block"
                variants={DOT_VARIANTS}
              >
                {char}
              </motion.span>
            ))}
          </motion.span>
        </p>

        <ul className="group flex text-neutral-950 dark:text-neutral-50">
          {SOCIALS.map(({ name, icon: Icon, href }) => (
            <li key={name}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 transition-opacity hover:!opacity-100 focus-visible:!opacity-100 group-hover:opacity-25 dark:group-hover:opacity-50"
              >
                <Icon className="size-6" />
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-auto text-sm text-neutral-600 dark:text-neutral-200 dark:opacity-50">
          🐭 {new Date().getFullYear()}
        </p>
      </main>

      <Background />
    </div>
  )
}
