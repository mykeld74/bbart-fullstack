import {defineField, defineType} from 'sanity'
import {PageFormInput} from '../studio/pageFormInput'

export default defineType({
  name: 'page',
  title: 'Pages',
  type: 'document',
  components: {
    input: PageFormInput,
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'navTitle',
      title: 'Navigation Title',
      type: 'string',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
    }),
    defineField({
      name: 'navCategory',
      type: 'array',
      of: [{type: 'reference', to: {type: 'navCategory'}}],
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Page builder',
      description: 'Flexible content blocks shown above fixed sections (e.g. events on Exhibitions)',
      type: 'pageBuilder',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'secondaryImage',
      title: 'Secondary image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'studioHero',
      title: 'Studio hero image',
      description: 'Large featured photo for the Her Studio page',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'studioGallery',
      title: 'Studio gallery',
      description: 'Detail photos for the Her Studio mosaic',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt text',
              type: 'string',
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
            }),
          ],
        },
      ],
      options: {
        layout: 'grid',
      },
    }),
  ],

  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
    },
  },
})
