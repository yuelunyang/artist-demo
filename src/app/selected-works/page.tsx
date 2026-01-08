import {sanityClient} from '@/lib/sanity.client'
import {pageBySlugQuery} from '@/lib/queries'
import {Sections} from '@/components/Sections'

export const revalidate = 60

export default async function SelectedWorksPage() {
  const data = await sanityClient.fetch(pageBySlugQuery, {slug: 'selected-works'})

  if (!data) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-24">
        <h1 className="text-2xl font-semibold">Page not found</h1>
        <p className="mt-3 text-neutral-600">No page with slug: selected-works</p>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-20">
      <header className="mb-16">
        <h1 className="text-4xl font-semibold tracking-tight">{data.title}</h1>
      </header>

      <Sections sections={data.sections || []} />
    </main>
  )
}
