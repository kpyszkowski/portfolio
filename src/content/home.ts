import { type FC, type SVGProps } from 'react'
import {
  Code,
  GitHub,
  Layers,
  Linkedin,
  Send,
  Terminal,
  Zap,
} from 'react-feather'
import { type Icon } from 'react-feather'
import AkenaLogo from '~/assets/logos/akena.svg'
import SnowdogLogo from '~/assets/logos/snowdog.svg'

// ── Shared types ─────────────────────────────────────────────────

export interface SocialLink {
  name: string
  href: string
  icon: Icon
}

export interface StrengthItem {
  id: string
  heading: string
  body: string
  icon: Icon
}

export interface ProjectItem {
  id: string
  name: string
  description: string
  tags: string[]
  previewUrl?: string
  sourceCodeUrl?: string
  previewSrc?: string
}

export interface ExperienceItem {
  id: string
  company: string
  logo?: FC<SVGProps<SVGSVGElement>>
  role: string
  /** ISO date string, e.g. "2022-01-01" */
  from: string
  /** ISO date string or null for "Present" */
  to: string | null
  description: string
  bullets?: string[]
}

export interface ContactLink {
  label: string
  href: string
  icon: Icon
}

// ── Hero ─────────────────────────────────────────────────────────

export const heroContent = {
  name: 'Kamil Pyszkowski',
  role: 'Creative Developer',
  tagline:
    'I build products end to end — schema, API, and interface — and bring the same care for craft to every layer of the stack.',
  socials: [
    { name: 'GitHub', href: '/github', icon: GitHub },
    { name: 'LinkedIn', href: '/linkedin', icon: Linkedin },
    { name: 'Email', href: 'mailto:kamil@pyszkowski.dev', icon: Send },
  ] satisfies SocialLink[],
}

// ── About ────────────────────────────────────────────────────────

export const aboutContent = {
  heading: 'About me',
  body: "I'm a fullstack engineer based in Poland. Over the past six years I've shipped production features across DeFi protocols, e-commerce platforms, and design systems — owning the full picture from schema and API design to the interface that users actually touch. I care about UX enough to push back on a spec, and about DX enough to make sure the next engineer has a good time. What sets me apart isn't just writing code that works — it's the attention to quality at every layer of the stack.",
}

// ── Strengths ────────────────────────────────────────────────────

export const strengthsContent = {
  heading: 'What I bring',
  items: [
    {
      id: 'ui-craft',
      heading: 'Attention to Detail',
      body: 'I notice what others skip — in interfaces, in logic, in specs. Transitions, edge cases, and silent assumptions that turn into bugs. The gap between functional and correct is where I pay the most attention.',
      icon: Code,
    },
    {
      id: 'fullstack',
      heading: 'Fullstack Delivery',
      body: 'I can take a feature from an empty schema to a working UI without handing it off. That means fewer gaps, faster iteration, and someone who actually understands the whole thing.',
      icon: Layers,
    },
    {
      id: 'dx',
      heading: 'Developer Experience',
      body: 'I build systems other developers enjoy working in — clear conventions, solid tooling including context-aware AI agents and documentation that saves hours of confusion.',
      icon: Terminal,
    },
    {
      id: 'performance',
      heading: 'Performance',
      body: 'Profiling, measuring, and shipping — never guessing. Fast for every user on every device, without trading off the polish.',
      icon: Zap,
    },
  ] satisfies StrengthItem[],
}

// ── Projects ─────────────────────────────────────────────────────

export const projectsContent = {
  heading: 'Projects',
  items: [
    {
      id: 'mezo',
      name: 'Mezo',
      description:
        "Bitcoin-backed DeFi protocol. Built wallet connection, economic dashboard, vault management, and governance voting UI — consuming on-chain data via the protocol's APIs. Integrated a third-party swap and handled Cloudflare edge deployment.",
      tags: [
        'React',
        'TypeScript',
        'Vite',
        'TanStack Query',
        'Chakra UI',
        'Wagmi',
        'GraphQL',
        'Cloudflare Workers',
      ],
      previewUrl: 'https://mezo.org',
      previewSrc: '/preview-mezo.png',
    },
    {
      id: 'eObuwie',
      name: 'eObuwie',
      description:
        'Large European footwear e-commerce platform. Shipped product page features and UI polish. Fixed a B2B flow where users could skip the invoice number field — patched validation and backfilled incomplete records in the database.',
      tags: ['Vue', 'TypeScript', 'Tailwind CSS', 'Magento', 'MySQL'],
      previewUrl: 'https://eobuwie.com.pl',
      previewSrc: '/preview-eobuwie.png',
    },
    {
      id: 'boar-finance',
      name: 'Boar Finance',
      description:
        'Non-custodial crypto wealth management with automated Bitcoin vote delegation. Built wallet connection, GraphQL on-chain data indexing, real-time earnings calculations, and vault interaction flows.',
      tags: [
        'Next.js',
        'TypeScript',
        'Chakra UI',
        'TanStack Query',
        'GraphQL',
        'Turborepo',
        'Wagmi',
      ],
      previewUrl: 'https://boar.finance',
      previewSrc: '/preview-boar-finance.png',
    },
    {
      id: 'personal-portfolio',
      name: 'Personal Portfolio',
      description:
        'Built to be as technically interesting as the work it presents. 3D hero scene with custom GLSL shaders, scroll-synchronized Three.js and DOM animations, per-character variable-font spring physics, and a full MDX blog pipeline — all on Cloudflare Workers.',
      tags: [
        'Next.js',
        'TypeScript',
        'React Three Fiber',
        'Tailwind CSS',
        'Motion',
        'Cloudflare Workers',
      ],
      previewUrl: 'https://github.com/kpyszkowski/portfolio',
      sourceCodeUrl: 'https://github.com/kpyszkowski/portfolio',
      previewSrc: '/preview-portfolio.png',
    },
    {
      id: 'lumo',
      name: 'Lumo',
      description:
        'Fullstack automotive marketplace — Drizzle schema, oRPC endpoints, search UI, and a shared component library in one Turborepo monorepo. Next.js on Cloudflare Workers, Neon PostgreSQL, and a custom scraper to populate the vehicle catalog.',
      tags: [
        'Next.js',
        'TypeScript',
        'oRPC',
        'Drizzle ORM',
        'PostgreSQL',
        'Cloudflare Workers',
        'Turborepo',
        'Puppeteer',
      ],
      previewSrc: '/preview-lumo.png',
      sourceCodeUrl: 'https://github.com/kpyszkowski/lumo',
    },
    {
      id: 'boar-network',
      name: 'Boar Network',
      description:
        "Marketing site for enterprise blockchain infrastructure — multi-region RPC endpoints and validator services. Delivered end to end: layout, copy, motion, and deployment. A landing page is often a company's first technical impression; this one communicates reliability before a word is read.",
      tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
      previewUrl: 'https://boar.network',
      previewSrc: '/preview-boar-network.png',
    },
  ] satisfies ProjectItem[],
}

// ── Experience ───────────────────────────────────────────────────

export const experienceContent = {
  heading: 'Experience',
  items: [
    {
      id: 'job-1',
      company: 'Akena',
      logo: AkenaLogo,
      role: 'Fullstack Engineer',
      from: '2023-09-01',
      to: null,
      description:
        'Building and shipping features across the full stack — owning UI, API design, and database work within product teams. Primary point of ownership for frontend quality and engineering decisions.',
      bullets: [
        'Remote-first, async workflow within a US-based international team',
        'Agile delivery — estimations, documentation, and full feature ownership from scoping to production',
        'Integrated AI tooling into daily development workflow',
      ],
    },
    {
      id: 'job-2',
      company: 'Snowdog',
      logo: SnowdogLogo,
      role: 'Junior Frontend Engineer',
      from: '2022-01-01',
      to: '2023-06-30',
      description:
        'Built and maintained UI across client products, including eObuwie and Sanpol. Contributed to a component library used across multiple projects, and developed a strong eye for interface quality and cross-browser consistency.',
      bullets: [
        'Agile process with close client collaboration and regular estimations',
        'End-to-end ownership of deliverables',
      ],
    },
  ] satisfies ExperienceItem[],
}

// ── Writings ─────────────────────────────────────────────────────

export const writingsContent = {
  heading: 'Learn, validate, repeat',
  body: [
    "Writing is how I validate what I think I know — and find out what I don't. I cover software engineering, web development, and the ideas shaping how I work.",
    'Check out my latest writing, or head to the writings page for more.',
  ],
  ctaLabel: 'Read all writings',
  ctaHref: '/writings',
}

// ── Contact ──────────────────────────────────────────────────────

export const contactContent = {
  heading: 'Get in touch',
  body: "Open to new roles, interesting side projects, and conversations worth having. If you're building something ambitious — or need someone who'll care as much about the interface as the architecture — I'd like to hear about it.",
  email: 'kamil@pyszkowski.dev',
  links: [
    { label: 'GitHub', href: '/github', icon: GitHub },
    { label: 'LinkedIn', href: '/linkedin', icon: Linkedin },
    { label: 'Send an Email', href: 'mailto:kamil@pyszkowski.dev', icon: Send },
  ] satisfies ContactLink[],
}
