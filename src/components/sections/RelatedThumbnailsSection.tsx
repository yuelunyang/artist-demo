import Image from 'next/image'
import Link from 'next/link'
import {urlFor} from '@/lib/sanity.image'

export function RelatedThumbnailsSection({value}: {value: any}) {
  const artworks = value?.artworks || []

  return (
    <section>
      {value?.heading ? <h2 className="mb-6 text-xl font-semibold">{value.heading}</h2> : null}

      <div className="grid grid-cols-2 gap-4 md:grid-cols-6">
        {artworks.map((a: any) => {
          const img = a?.images?.[0]
          const src = img ? urlFor(img).width(600).quality(75).url() : ''
          return (
            <div key={a._id} className="overflow-hidden rounded-xl">
              {src ? (
                <Link href={`/work/${a.slug}`}>
                  <Image src={src} alt={a.title || ''} width={600} height={600} className="h-auto w-full" />
                </Link>
              ) : null}
            </div>
          )
        })}
      </div>
    </section>
  )
}
