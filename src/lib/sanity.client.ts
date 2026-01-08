import {createClient} from '@sanity/client'

export const sanityClient = createClient({
  projectId: 'ez11hgpe',
  dataset: 'production',
  apiVersion: '2025-01-01',
  useCdn: true,
})
