import { readdir } from 'fs/promises'
import { MDXContent } from 'mdx/types'
import type { Toc as TableOfContents } from '@stefanprobst/rehype-extract-toc'

const BASE_PATH = './src/app/writings/(content)'

export type WritingMetadata = {
  title: string
  readingTime: number
  slug: string
  tags?: string[]
  publishedAt: Date
  modifiedAt?: Date
  tableOfContents: {
    id: string
    title: string
  }[]
}

type Frontmatter = Pick<
  WritingMetadata,
  'title' | 'tags' | 'publishedAt' | 'modifiedAt'
>

type MDXFile = {
  frontmatter: Frontmatter
  default: MDXContent
  readingTime: {
    minutes: number
  }
  tableOfContents: TableOfContents
}

type Language = 'en' | 'pl'

export const getWritingData = async (
  slug: string,
  language: Language = 'en',
) => {
  const file: MDXFile = await import(
    `../app/writings/(content)/${slug}/${language}.mdx`
  )

  const data = file.frontmatter
  const readingTimeStats = file.readingTime
  const content = file.default
  const tableOfContents = file.tableOfContents
    .filter((entry) => entry.id && entry.depth === 2)
    .map(({ id, value }) => ({ id: id!, title: value }))

  const publishedAt = new Date(data.publishedAt)
  const modifiedAt = data.modifiedAt ? new Date(data.modifiedAt) : undefined
  const readingTime = Math.ceil(readingTimeStats.minutes)

  const metadata: WritingMetadata = {
    title: data.title,
    readingTime,
    slug,
    tags: data.tags,
    publishedAt,
    modifiedAt,
    tableOfContents,
  }

  return { metadata, content }
}

export const getWritingsMetadata = async () => {
  const writingsDirectory = await readdir(BASE_PATH, {
    withFileTypes: true,
  })

  const writings = await Promise.all(
    writingsDirectory.map(async ({ name }) => {
      const slug = name.replace('.mdx', '')
      const { metadata } = await getWritingData(slug)
      return metadata
    }),
  )

  return writings
}
