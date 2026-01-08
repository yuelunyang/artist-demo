import {PortableText} from '@portabletext/react'

const components = {
  block: {
    h1: ({children}: any) => (
      <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
        {children}
      </h1>
    ),
    h2: ({children}: any) => (
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mt-10 mb-4">
        {children}
      </h2>
    ),
    normal: ({children}: any) => (
      <p className="text-[17px] md:text-[18px] leading-[1.75] text-neutral-900 mb-5">
        {children}
      </p>
    ),
  },
  marks: {
    em: ({children}: any) => <em className="italic">{children}</em>,
    strong: ({children}: any) => <strong className="font-semibold">{children}</strong>,
    link: ({value, children}: any) => (
      <a
        href={value?.href}
        className="underline underline-offset-4"
        target={value?.blank ? '_blank' : undefined}
        rel={value?.blank ? 'noreferrer' : undefined}
      >
        {children}
      </a>
    ),
  },
}

export function RichTextSection({value}: {value: any}) {
  const layout = value?.layout || 'center' // 'center' | 'twoColumn'

  if (layout === 'twoColumn') {
    return (
      <section className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            {/* left column can be empty or later used for small image / metadata */}
          </div>
          <div className="md:col-span-7">
            <PortableText value={value?.content || []} components={components as any} />
          </div>
        </div>
      </section>
    )
  }

  // center layout (PDF-like)
  return (
    <section className="mx-auto max-w-3xl px-6">
      <PortableText value={value?.content || []} components={components as any} />
    </section>
  )
}
