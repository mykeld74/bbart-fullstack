import {defineDocuments, defineLocations} from 'sanity/presentation'

const pageRoutes: Record<string, string> = {
  exhibitions: '/exhibitions',
  'artist-biography': '/artist-biography',
  'her-studio': '/her-studio',
}

export function pageHref(slug: string) {
  return pageRoutes[slug] ?? `/${slug}`
}

/** Front-end path for Presentation, or null when this doc has no preview route. */
export function getPreviewPath(documentType: string, slug?: string | null) {
  if (documentType === 'event') return '/exhibitions'
  if (documentType === 'page' && slug && slug in pageRoutes) return pageRoutes[slug]
  return null
}

export const mainDocuments = defineDocuments([
  {
    route: '/exhibitions',
    filter: `_type == "page" && slug.current == "exhibitions"`,
  },
  {
    route: '/artist-biography',
    filter: `_type == "page" && slug.current == "artist-biography"`,
  },
  {
    route: '/her-studio',
    filter: `_type == "page" && slug.current == "her-studio"`,
  },
  {
    route: '/:slug',
    filter: `_type == "page" && slug.current == $slug`,
  },
])

export const locations = {
  page: defineLocations({
    select: {
      title: 'title',
      slug: 'slug.current',
    },
    resolve: (doc) => {
      const slug = doc?.slug
      if (!slug) return {locations: []}

      return {
        locations: [
          {
            title: doc?.title || 'Untitled page',
            href: pageHref(slug),
          },
        ],
      }
    },
  }),
  event: defineLocations({
    select: {title: 'title'},
    resolve: (doc) => ({
      locations: [
        {
          title: doc?.title || 'Event',
          href: '/exhibitions',
        },
      ],
    }),
  }),
}
