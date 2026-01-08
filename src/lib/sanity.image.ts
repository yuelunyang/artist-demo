import {createImageUrlBuilder} from '@sanity/image-url'
import type {SanityImageSource} from '@sanity/image-url/lib/types'
import {sanityClient} from './sanity.client'

const builder = createImageUrlBuilder(sanityClient)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}
