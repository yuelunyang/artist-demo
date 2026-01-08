import Link from 'next/link'

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-24">
      <h1 className="text-4xl font-semibold tracking-tight">
        Artist Demo
      </h1>

      <p className="mt-4 text-neutral-600">
        Gallery-style presentation
      </p>

      <div className="mt-10 space-y-4">
        <Link
          href="/selected-works"
          className="block text-lg underline underline-offset-4"
        >
          Selected Works
        </Link>

        <Link
          href="/about"
          className="block text-lg underline underline-offset-4"
        >
          About
        </Link>
      </div>
    </main>
  )
}
