import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'imagePair',
  title: 'Image pair',
  type: 'object',
  fields: [
    defineField({
      name: 'leftImage',
      title: 'Left image',
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
      name: 'rightImage',
      title: 'Right image',
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
      name: 'ratio',
      title: 'Column ratio',
      type: 'string',
      initialValue: 'equal',
      options: {
        list: [
          {title: 'Equal', value: 'equal'},
          {title: 'Wide left', value: 'wideLeft'},
          {title: 'Wide right', value: 'wideRight'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),
  ],
  preview: {
    select: {
      leftAlt: 'leftImage.alt',
      rightAlt: 'rightImage.alt',
      media: 'leftImage',
    },
    prepare({leftAlt, rightAlt, media}) {
      return {
        title: [leftAlt, rightAlt].filter(Boolean).join(' / ') || 'Image pair',
        subtitle: 'Image pair',
        media,
      }
    },
  },
})
