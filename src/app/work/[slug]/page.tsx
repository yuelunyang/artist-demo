import {sanityClient} from '@/lib/sanity.client'
import {allArtworkSlugsQuery, artworkBySlugQuery} from '@/lib/queries'
import {ArtworkDetail} from '@/components/ArtworkDetail'

export const revalidate = 60

export async function generateStaticParams() {
  const slugs: {slug: string}[] = await sanityClient.fetch(allArtworkSlugsQuery)
  return slugs.map((s) => ({slug: s.slug}))
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{slug: string}>
}) {
  const {slug} = await params

  const artwork = await sanityClient.fetch(artworkBySlugQuery, {slug})

  if (!artwork) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-24">
        <h1 className="text-2xl font-semibold">Artwork not found</h1>
        <p className="mt-3 text-neutral-600">No artwork with slug: {slug}</p>
      </main>
    )
  }

  return <ArtworkDetail artwork={artwork} />
}
