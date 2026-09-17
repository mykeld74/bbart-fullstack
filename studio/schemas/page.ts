import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'page',
  title: 'Pages',
  type: 'document',
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
  ],

  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
    },
  },
})
