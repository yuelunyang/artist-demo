import Image from 'next/image'
import {urlFor} from '@/lib/sanity.image'

export function HeroImageSection({value}: {value: any}) {
  if (!value?.image) return null
  const src = urlFor(value.image).width(2200).quality(85).url()

  return (
    <section className={value?.bleed ? '-mx-6' : ''}>
      <div className="overflow-hidden rounded-2xl">
        <Image
          src={src}
          alt={value?.caption || ''}
          width={2200}
          height={1400}
          className="h-auto w-full"
          priority
        />
      </div>
      {value?.caption ? <p className="mt-3 text-sm text-neutral-500">{value.caption}</p> : null}
    </section>
  )
}
