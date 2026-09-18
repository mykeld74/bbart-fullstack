import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'imageWithCaption',
  title: 'Image with caption',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),
    defineField({
      name: 'width',
      title: 'Width',
      type: 'string',
      initialValue: 'medium',
      options: {
        list: [
          {title: 'Narrow', value: 'narrow'},
          {title: 'Medium', value: 'medium'},
          {title: 'Full', value: 'full'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),
  ],
  preview: {
    select: {
      caption: 'caption',
      alt: 'image.alt',
      media: 'image',
    },
    prepare({caption, alt, media}) {
      return {
        title: caption || alt || 'Image',
        subtitle: 'Image with caption',
        media,
      }
    },
  },
})
