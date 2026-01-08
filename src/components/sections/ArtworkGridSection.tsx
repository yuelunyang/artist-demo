import Image from 'next/image'
import Link from 'next/link'
import {urlFor} from '@/lib/sanity.image'

export function ArtworkGridSection({value}: {value: any}) {
  const artworks = value?.artworks || []
  const cols = Number(value?.columns || 2)
  const gridCols =
    cols === 4 ? 'md:grid-cols-4' : cols === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'

  return (
    <section>
      {value?.heading ? <h2 className="mb-8 text-xl font-semibold">{value.heading}</h2> : null}

      <div className={`grid grid-cols-1 gap-8 ${gridCols}`}>
        {artworks.map((a: any) => {
          const img = a?.images?.[0]
          const src = img ? urlFor(img).width(1200).quality(80).url() : ''

          return (
            <article key={a._id} className="group">
              {src ? (
                <Link href={`/work/${a.slug}`}>
                  <div className="overflow-hidden rounded-2xl">
                    <Image
                      src={src}
                      alt={a.title || ''}
                      width={1200}
                      height={1200}
                      className="h-auto w-full transition-transform duration-300 group-hover:scale-[1.01]"
                    />
                  </div>
                </Link>
              ) : null}

              <div className="mt-3 text-sm text-neutral-700">
                <div className="font-medium">
                  <Link className="hover:underline" href={`/work/${a.slug}`}>
                    {a.title}
                  </Link>
                </div>
                <div className="text-neutral-500">
                  {[a.year, a.medium, a.dimensions].filter(Boolean).join(' · ')}
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
