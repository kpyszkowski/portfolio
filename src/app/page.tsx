'use client'
import { motion, Variants } from 'motion/react'
import { GitHub, Linkedin, Send } from 'react-feather'
import { Logo } from '~/components/logo'
import cn from '~/utils/cn'

const Background = (props: { className?: string }) => {
  const { className = '', ...restProps } = props
  return (
    <div
      className={cn(
        className,
        'fixed inset-0 flex items-center justify-center',
      )}
      {...restProps}
    >
      <div className="writing-outro-background z-20 size-full [mask:radial-gradient(black,transparent)]" />
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

export default function Home() {
  return (
    <div className="font-extralight">
      <main className="relative z-30 flex min-h-[100dvh] flex-col items-center justify-center p-3 lg:p-10">
        <div className="mt-auto mb-28 flex items-center gap-8 lg:mb-56 lg:gap-16">
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
                className="block p-4 transition-opacity group-hover:opacity-25 hover:!opacity-100 focus-visible:!opacity-100 dark:group-hover:opacity-50"
              >
                <Icon className="size-6" />
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-auto font-mono text-sm text-neutral-600">
          {new Date().getFullYear()}
        </p>
      </main>

      <Background />
    </div>
  )
}
