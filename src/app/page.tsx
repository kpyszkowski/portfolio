'use client'

import {
  motion,
  SpringOptions,
  useMotionValue,
  useSpring,
  Variants,
} from 'framer-motion'
import { CSSProperties, useEffect } from 'react'
import { GitHub, Linkedin, Send } from 'react-feather'

const Logo = (props: { className?: string }) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M29.1428 26.5963L19.4445 16L14.2857 20.7394V31.4286"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M29.1428 0.571426L14.6043 14.6545V0.571426C14.6043 0.571426 2.27803 0.657001 2.28571 9.95599C2.29149 16.9294 10.1248 18.2857 10.1248 18.2857"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.28571 28.5714C7.54808 28.5714 8.57143 27.5481 8.57143 26.2857C8.57143 25.0233 7.54808 24 6.28571 24C5.02335 24 4 25.0233 4 26.2857C4 27.5481 5.02335 28.5714 6.28571 28.5714Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const Orb = () => {
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
  }, [])

  const smoothMouseX = useSpring(mouseX, SPRING_OPTIONS)
  const smoothMouseY = useSpring(mouseY, SPRING_OPTIONS)

  return (
    <motion.svg
      className="absolute -inset-[12.5vw] size-[25vw] mix-blend-hard-light dark:mix-blend-color-dodge"
      width="458.751"
      height="447.742"
      viewBox="0 0 121.378 118.465"
      style={{
        x: smoothMouseX,
        y: smoothMouseY,
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
      <g
        transform="translate(-25.254 -137.364)"
        fill-opacity=".16"
        filter="url(#a)"
      >
        <circle cx="86.244" cy="187.423" r="20.862" fill="#00aaa8" />
        <circle cx="96.573" cy="205.77" r="20.862" fill="#aa8c00" />
        <circle cx="75.314" cy="205.77" r="20.862" fill="#aa00a3" />
      </g>
    </motion.svg>
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
    <div className="placeholder-background font-sans font-extralight">
      <Orb />

      <main className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center p-3 lg:p-10">
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
          Coming soon
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
    </div>
  )
}
