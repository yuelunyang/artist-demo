import Image from 'next/image'
import {urlFor} from '@/lib/sanity.image'

export function ImageGridSection({value}: {value: any}) {
  const images = value?.images || []
  const cols = Number(value?.columns || 3)
  const gridCols =
    cols === 4 ? 'md:grid-cols-4' : cols === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'

  return (
    <section>
      {value?.heading ? <h2 className="mb-8 text-xl font-semibold">{value.heading}</h2> : null}

      <div className={`grid grid-cols-1 gap-6 ${gridCols}`}>
        {images.map((img: any, idx: number) => {
          const src = urlFor(img).width(1200).quality(80).url()
          return (
            <div key={idx} className="overflow-hidden rounded-2xl">
              <Image src={src} alt="" width={1200} height={1200} className="h-auto w-full" />
            </div>
          )
        })}
      </div>
    </section>
  )
}
