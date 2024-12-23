import { getWritingsDataBySlug, getWritingsMetadata } from '@/lib/writings'

type WritingPageParams = {
  slug: string
}

type WritingPageProps = {
  params: WritingPageParams
}

export default async function WritingPage(props: WritingPageProps) {
  const { slug } = props.params
  const { metadata, content: Content } = await getWritingsDataBySlug(slug)

  return (
    <article className="prose prose-neutral prose-invert mx-auto">
      <h1>{metadata.title}</h1>
      <Content />
    </article>
  )
}

export async function generateStaticParams() {
  const writingsMetadata = await getWritingsMetadata()
  return writingsMetadata.map((metadata) => ({
    slug: metadata.slug,
  }))
}
export const dynamicParams = false

export async function generateMetadata(props: WritingPageProps) {
  const { slug } = props.params
  const { metadata } = await getWritingsDataBySlug(slug)
  return {
    title: metadata.title,
  }
}
