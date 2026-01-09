export const pageBySlugQuery = /* groq */ `
*[_type=="page" && slug.current==$slug][0]{
  title,
  "slug": slug.current,
  sections[]{
    _type,
    _type == "heroImageSection" => { _type, bleed, caption, image },
    _type == "richTextSection" => { _type, layout, content },
    _type == "imageWithTextSection" => { _type, imageSide, caption, image, content },
    _type == "artworkGridSection" => {
      _type,
      heading,
      columns,
      showCaptions,
      artworks[]->{
        _id,
        title,
        year,
        medium,
        dimensions,
        "slug": slug.current,
        images
      }
    },
    _type == "imageGridSection" => { _type, heading, columns, showCaptions, images },
    _type == "relatedThumbnailsSection" => {
      _type,
      heading,
      artworks[]->{
        _id,
        title,
        year,
        "slug": slug.current,
        images
      }
    }
  }
}
`


export const artworkBySlugQuery = /* groq */ `
*[_type=="artwork" && slug.current==$slug][0]{
  _id,
  title,
  year,
  medium,
  dimensions,
  description,
  images,
  availability,
  "slug": slug.current
}
`

export const allArtworkSlugsQuery = /* groq */ `
*[_type=="artwork" && defined(slug.current)][]{
  "slug": slug.current
}
`
