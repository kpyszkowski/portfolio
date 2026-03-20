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
  role: string
  /** ISO date string, e.g. "2022-01-01" */
  from: string
  /** ISO date string or null for "Present" */
  to: string | null
  description: string
}

export interface ContactLink {
  label: string
  href: string
  icon: Icon
}

// ── Hero ─────────────────────────────────────────────────────────

export const heroContent = {
  name: 'Kamil Pyszkowski',
  role: 'Software Engineer',
  tagline:
    'I craft thoughtful interfaces and robust systems with care for detail.',
  socials: [
    { name: 'GitHub', href: '/github', icon: GitHub },
    { name: 'LinkedIn', href: '/linkedin', icon: Linkedin },
    { name: 'Email', href: 'mailto:kamil@pyszkowski.dev', icon: Send },
  ] satisfies SocialLink[],
}

// ── About ────────────────────────────────────────────────────────

export const aboutContent = {
  heading: 'About me',
  body: "I'm a software engineer based in Poland, focused on building thoughtful web experiences. I care deeply about developer experience, system design, and the craft of writing clean, maintainable code. When I'm not coding, I write about the tools and techniques I find most valuable.",
}

// ── Strengths ────────────────────────────────────────────────────

export const strengthsContent = {
  heading: 'What I bring',
  items: [
    {
      id: 'frontend',
      heading: 'Front-end Engineering',
      body: 'Building polished, accessible, and performant user interfaces using modern web standards and component-driven architecture.',
      icon: Code,
    },
    {
      id: 'systems',
      heading: 'System Design',
      body: 'Thinking through scalable architectures, data flows, and API contracts that are easy to evolve as requirements change.',
      icon: Layers,
    },
    {
      id: 'dx',
      heading: 'Developer Experience',
      body: 'Investing in tooling, documentation, and conventions that make teams more effective and codebases a pleasure to work in.',
      icon: Terminal,
    },
    {
      id: 'performance',
      heading: 'Performance',
      body: 'Profiling, measuring, and optimising both runtime performance and build output to keep products fast for every user.',
      icon: Zap,
    },
  ] satisfies StrengthItem[],
}

// ── Projects ─────────────────────────────────────────────────────

export const projectsContent = {
  heading: 'Projects',
  items: [
    {
      id: 'Personal Portfolio',
      name: 'Personal Portfolio',
      description:
        'Portfolio website showcasing my projects, writings, and experience. A showcase of my creativity and skills in web development, design, and performance optimisation.',
      tags: [
        'Next.js',
        'TypeScript',
        'Tailwind CSS',
        'Motion',
        'ThreeJS',
        'Cloudflare',
      ],
      previewUrl: 'https://github.com/kpyszkowski/portfolio',
      sourceCodeUrl: 'https://github.com/kpyszkowski/portfolio',
      previewSrc:
        'https://placehold.co/1024x576/f5f5f5/a3a3a3?text=Personal+Portfolio',
    },
    {
      id: 'project-alpha',
      name: 'Project Alpha',
      description: 'Description coming soon.',
      tags: ['TypeScript', 'React'],
      previewUrl: 'https://example.com/project-alpha',
      previewSrc:
        'https://placehold.co/1024x576/ebebeb/a3a3a3?text=Project+Alpha',
    },
    {
      id: 'project-beta',
      name: 'Project Beta',
      description: 'Description coming soon.',
      tags: ['Node.js', 'PostgreSQL'],
      previewUrl: 'https://example.com/project-beta',
      previewSrc:
        'https://placehold.co/1024x576/e0e0e0/a3a3a3?text=Project+Beta',
    },
  ] satisfies ProjectItem[],
}

// ── Experience ───────────────────────────────────────────────────

export const experienceContent = {
  heading: 'Experience',
  items: [
    {
      id: 'job-1',
      company: 'Company A',
      role: 'Senior Frontend Engineer',
      from: '2022-01-01',
      to: null,
      description:
        'Leading front-end development across multiple product teams, establishing component standards, and driving performance improvements.',
    },
    {
      id: 'job-2',
      company: 'Company B',
      role: 'Frontend Engineer',
      from: '2020-03-01',
      to: '2021-12-31',
      description:
        'Built and maintained a design system used by five product teams, reducing UI inconsistencies and speeding up delivery.',
    },
    {
      id: 'job-3',
      company: 'Company C',
      role: 'Junior Frontend Developer',
      from: '2018-06-01',
      to: '2020-02-28',
      description:
        'Developed customer-facing features for an e-commerce platform, focusing on accessibility and cross-browser compatibility.',
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
  body: "I'm always open to interesting conversations, collaboration, and new opportunities. Feel free to reach out.",
  email: 'kamil@pyszkowski.dev',
  links: [
    { label: 'GitHub', href: '/github', icon: GitHub },
    { label: 'LinkedIn', href: '/linkedin', icon: Linkedin },
    { label: 'Send an Email', href: 'mailto:kamil@pyszkowski.dev', icon: Send },
  ] satisfies ContactLink[],
}
