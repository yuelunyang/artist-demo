import {HeroImageSection} from './sections/HeroImageSection'
import {RichTextSection} from './sections/RichTextSection'
import {ImageWithTextSection} from './sections/ImageWithTextSection'
import {ArtworkGridSection} from './sections/ArtworkGridSection'
import {ImageGridSection} from './sections/ImageGridSection'
import {RelatedThumbnailsSection} from './sections/RelatedThumbnailsSection'

export function Sections({sections}: {sections: any[]}) {
  return (
    <div className="space-y-16 md:space-y-24">
      {sections.map((s, idx) => {
        const key = `${s._type}-${idx}`
        switch (s._type) {
          case 'heroImageSection':
            return <HeroImageSection key={key} value={s} />
          case 'richTextSection':
            return <RichTextSection key={key} value={s} />
          case 'imageWithTextSection':
            return <ImageWithTextSection key={key} value={s} />
          case 'artworkGridSection':
            return <ArtworkGridSection key={key} value={s} />
          case 'imageGridSection':
            return <ImageGridSection key={key} value={s} />
          case 'relatedThumbnailsSection':
            return <RelatedThumbnailsSection key={key} value={s} />
          default:
            return null
        }
      })}
    </div>
  )
}

