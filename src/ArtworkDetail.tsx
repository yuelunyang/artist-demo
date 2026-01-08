import Image from 'next/image'
import {PortableText} from '@portabletext/react'
import {urlFor} from '@/lib/sanity.image'

export function ArtworkDetail({artwork}: {artwork: any}) {
  const imgs: any[] = artwork?.images || []
  const primary = imgs[0]

  return (
    <main className="mx-auto max-w-5xl px-6 py-20">
      <header className="mb-10">
        <h1 className="text-4xl font-semibold tracking-tight">{artwork?.title}</h1>
        <div className="mt-3 text-sm text-neutral-500">
          {[artwork?.year, artwork?.medium, artwork?.dimensions].filter(Boolean).join(' · ')}
        </div>
      </header>

      {/* Primary image */}
      {primary ? (
        <div className="overflow-hidden rounded-2xl">
          <Image
            src={urlFor(primary).width(2200).quality(85).url()}
            alt={artwork?.title || ''}
            width={2200}
            height={1600}
            className="h-auto w-full"
            priority
          />
        </div>
      ) : null}

      {/* Optional description */}
      {artwork?.description?.length ? (
        <div className="mt-12 max-w-3xl">
          <div className="prose prose-neutral max-w-none prose-p:leading-relaxed">
            <PortableText value={artwork.description} />
          </div>
        </div>
      ) : null}

      {/* Additional images */}
      {imgs.length > 1 ? (
        <section className="mt-16 space-y-10">
          {imgs.slice(1).map((img, idx) => (
            <div key={idx} className="overflow-hidden rounded-2xl">
              <Image
                src={urlFor(img).width(2200).quality(85).url()}
                alt=""
                width={2200}
                height={1600}
                className="h-auto w-full"
              />
            </div>
          ))}
        </section>
      ) : null}
    </main>
  )
}
