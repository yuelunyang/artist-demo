'use client'

import {useMemo, useRef, useState} from 'react'
import Image from 'next/image'
import {PortableText} from '@portabletext/react'
import {urlFor} from '@/lib/sanity.image'
import Link from 'next/link'

export function ArtworkDetail({artwork}: {artwork: any}) {
  const imgs: any[] = artwork?.images || []

  const [open, setOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState<string | null>(null)

  // TODO: replace with the real enquiry email for the artist/gallery
  const enquiryTo = 'artist@example.com'

  const subject = useMemo(() => {
    const title = artwork?.title || 'Artwork'
    const year = artwork?.year ? ` (${artwork.year})` : ''
    return `Enquiry: ${title}${year}`
  }, [artwork?.title, artwork?.year])

  const availability = useMemo(() => {
    const value = artwork?.availability
    if (value === 'available') {
      return {
        label: 'Available',
        className: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
      }
    }
    if (value === 'sold') {
      return {
        label: 'Sold',
        className: 'bg-rose-50 text-rose-700 ring-1 ring-rose-200',
      }
    }
    return null
  }, [artwork?.availability])

  function closeModal() {
    setOpen(false)
    setError(null)
  }

  function closeLightbox() {
    setLightboxIndex(null)
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    const trimmedEmail = email.trim()
    const trimmedMsg = message.trim()

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)
    if (!emailOk) {
      setError('Please enter a valid email address.')
      return
    }
    if (trimmedMsg.length < 2) {
      setError('Please write a short message.')
      return
    }

    const meta = [
      `From: ${trimmedEmail}`,
      artwork?.title ? `Artwork: ${artwork.title}` : null,
      artwork?.year ? `Year: ${artwork.year}` : null,
      artwork?.medium ? `Medium: ${artwork.medium}` : null,
      artwork?.dimensions ? `Dimensions: ${artwork.dimensions}` : null,
      artwork?.slug ? `Slug: ${artwork.slug}` : null,
    ]
      .filter(Boolean)
      .join('\n')

    const body = `${meta}\n\nMessage:\n${trimmedMsg}\n`

    const mailto = `mailto:${encodeURIComponent(enquiryTo)}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`

    window.location.href = mailto
    closeModal()
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-20">
      {/* Top nav + actions */}
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/selected-works"
          className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 transition"
        >
          <span aria-hidden>←</span>
          Back to Selected Works
        </Link>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-4 py-2 text-sm text-white hover:bg-neutral-800 transition"
        >
          Inquire
        </button>
      </div>

      <header className="mb-10">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-4xl font-semibold tracking-tight">{artwork?.title}</h1>
          {availability ? (
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${availability.className}`}
            >
              {availability.label}
            </span>
          ) : null}
        </div>
        <div className="mt-3 text-sm text-neutral-500">
          {[artwork?.year, artwork?.medium, artwork?.dimensions].filter(Boolean).join(' · ')}
        </div>
      </header>

      {/* Image carousel */}
      {imgs.length ? (
        <section className="mt-6">
          <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {imgs.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setLightboxIndex(idx)}
                className="group relative w-full shrink-0 snap-center overflow-hidden rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/40"
                aria-label={`Open image ${idx + 1} of ${imgs.length}`}
              >
                <Image
                  src={urlFor(img).width(2200).quality(85).url()}
                  alt={artwork?.title || ''}
                  width={2200}
                  height={1600}
                  className="h-auto w-full transition-transform duration-300 group-hover:scale-[1.01]"
                  priority={idx === 0}
                  sizes="(min-width: 1024px) 960px, 90vw"
                />
              </button>
            ))}
          </div>
          {imgs.length > 1 ? (
            <p className="mt-2 text-xs text-neutral-500">Swipe or drag to see more images.</p>
          ) : null}
        </section>
      ) : null}

      {/* Optional description */}
      {artwork?.description?.length ? (
        <div className="mt-12 max-w-3xl">
          <div className="prose prose-neutral max-w-none prose-p:leading-relaxed">
            <PortableText value={artwork.description} />
          </div>
        </div>
      ) : null}

      {/* Lightbox */}
      {lightboxIndex !== null && imgs[lightboxIndex] ? (
        <div
          className="fixed inset-0 z-50"
          role="dialog"
          aria-modal="true"
          aria-label="Artwork image"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/80"
            onClick={closeLightbox}
            aria-label="Close image"
          />
          <div className="relative mx-auto flex h-full max-w-5xl items-center justify-center px-4 py-10">
            <Image
              src={urlFor(imgs[lightboxIndex]).width(2400).quality(90).url()}
              alt={artwork?.title || ''}
              width={2400}
              height={1800}
              className="h-auto w-full max-h-[80vh] rounded-2xl object-contain shadow-2xl"
              sizes="(min-width: 1024px) 960px, 90vw"
            />
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute right-6 top-6 rounded-full bg-white/90 p-2 text-neutral-700 shadow hover:bg-white"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>
      ) : null}

      {/* Modal */}
      {open ? (
        <div
          className="fixed inset-0 z-50"
          role="dialog"
          aria-modal="true"
          aria-label="Enquiry"
        >
          {/* overlay */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={closeModal}
          />

          {/* panel */}
          <div className="absolute inset-x-0 top-16 mx-auto w-[min(92vw,520px)] rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-lg font-semibold">Inquire</div>
                <div className="mt-1 text-sm text-neutral-500">
                  {artwork?.title}{artwork?.year ? ` (${artwork.year})` : ''}
                </div>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="rounded-full p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <form onSubmit={onSubmit} className="mt-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-800">
                  Your email
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-xl border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-neutral-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-800">
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Hi, I'm interested in this work. Is it available? What is the price and shipping?"
                  rows={4}
                  className="mt-2 w-full resize-none rounded-xl border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-neutral-400"
                />
              </div>

              {error ? (
                <div className="text-sm text-red-600">{error}</div>
              ) : null}

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-full border border-neutral-200 px-4 py-2 text-sm text-neutral-800 hover:bg-neutral-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-neutral-900 px-4 py-2 text-sm text-white hover:bg-neutral-800"
                >
                  Send enquiry
                </button>
              </div>

              <div className="text-xs text-neutral-400">
                This opens your email app with a pre-filled draft.
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </main>
  )
}
