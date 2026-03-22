import { DatedList, type DatedListItem } from '~/components/ui/dated-list'
import {
  WritingTile,
  WritingTileHeading,
  WritingTileTags,
  WritingTileReadingTime,
} from '~/components/writing-tile'
import { getWritingsMetadata } from '~/lib/writings'

export default async function WritingsPage() {
  const writingsMetadata = await getWritingsMetadata()

  const writingItems: DatedListItem[] = writingsMetadata.map((metadata) => ({
    id: metadata.slug,
    date: metadata.publishedAt,
    content: (
      <WritingTile href={`/writings/${metadata.slug}`}>
        <WritingTileHeading>{metadata.title}</WritingTileHeading>
        {metadata.tags && <WritingTileTags tags={metadata.tags} />}
        <WritingTileReadingTime minutes={metadata.readingTime} />
      </WritingTile>
    ),
  }))

  return (
    <main className="mx-auto mb-24 max-w-screen-lg px-5 md:mb-48">
      <div className="flex flex-col gap-10 pt-24 pb-24 md:flex-row md:gap-12 md:pt-32">
        <div className="flex basis-2/6 flex-col gap-4">
          <h1 className="text-3xl">Hi everyone! ✋🏻</h1>
          <p className="text-xl/none text-neutral-500 dark:text-neutral-400">
            Welcome to my writings page
          </p>
        </div>

        <p className="text-md/loose flex-1 text-neutral-500 md:text-lg/loose dark:text-neutral-400">
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
