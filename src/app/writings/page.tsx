import { DatedList, type DatedListItem } from '@/components/ui/dated-list'
import { WritingTile } from '@/components/writing-tile'
import { getWritingsMetadata } from '@/lib/writings'

export default async function WritingsPage() {
  const writingsMetadata = await getWritingsMetadata()

  const writingItems: DatedListItem[] = writingsMetadata.map((metadata) => ({
    id: metadata.slug,
    date: metadata.publishedAt,
    content: (
      <WritingTile
        title={metadata.title}
        tags={metadata.tags}
        readingTime={metadata.readingTime}
        url={`/writings/${metadata.slug}`}
      />
    ),
  }))

  return (
    <main className="mx-auto mb-48 max-w-screen-lg px-5">
      <div className="flex flex-col gap-12 py-24 md:flex-row">
        <div className="flex basis-2/6 flex-col gap-4">
          <h1 className="text-3xl">Hi everyone! ✋🏻</h1>
          <p className="text-xl text-neutral-400">
            Welcome to my writings page
          </p>
        </div>

        <p className="flex-1 text-lg/loose">
          Mastery is not only skills but also knowledge. Writing down
          experiences is a great way to consolidate learnings. It also creates a
          useful resource should any of the experiences prove useful in the
          future. If these writings also prove useful to any of you - I&apos;ll
          be more than happy!
        </p>
      </div>

      <h2 className="mb-6 text-2xl">Writings</h2>
      <DatedList items={writingItems} />
    </main>
  )
}
