import { Article } from '@/components/ui/article'
import { WritingIntro } from '@/components/writing-intro'
import { WritingOutro } from '@/components/writing-outro'
import { getWritingData, getWritingsMetadata } from '@/lib/writings'

type WritingPageParams = {
  slug: string
}

type WritingPageProps = {
  params: WritingPageParams
}

export default async function WritingPage(props: WritingPageProps) {
  const { slug } = props.params
  const { metadata, content } = await getWritingData(slug)

  return (
    <main>
      <WritingIntro
        className="mx-auto mb-12 mt-16 max-w-screen-lg"
        title={metadata.title}
        publishedAt={metadata.publishedAt}
        modifiedAt={metadata.modifiedAt}
        readingTime={metadata.readingTime}
      />
      <Article content={content} />
      <WritingOutro className="-mx-5" />
    </main>
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
  const { metadata } = await getWritingData(slug)
  return {
    title: metadata.title,
  }
}
