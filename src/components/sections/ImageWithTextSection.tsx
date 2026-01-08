import Image from 'next/image'
import {PortableText} from '@portabletext/react'
import {urlFor} from '@/lib/sanity.image'

export function ImageWithTextSection({value}: {value: any}) {
  if (!value?.image) return null
  const src = urlFor(value.image).width(1600).quality(85).url()
  const right = value?.imageSide === 'right'

  return (
    <section className="grid gap-10 md:grid-cols-2 md:items-start">
      <div className={right ? 'md:order-2' : ''}>
        <div className="overflow-hidden rounded-2xl">
          <Image src={src} alt={value?.caption || ''} width={1600} height={1200} className="h-auto w-full" />
        </div>
        {value?.caption ? <p className="mt-3 text-sm text-neutral-500">{value.caption}</p> : null}
      </div>

      <div className="prose prose-neutral max-w-none prose-p:leading-relaxed">
        <PortableText value={value?.content || []} />
      </div>
    </section>
  )
}
