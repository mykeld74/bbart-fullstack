import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'splitContent',
  title: 'Split content',
  type: 'object',
  fields: [
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      initialValue: 'both',
      description: 'Where images sit relative to the text',
      options: {
        list: [
          {title: 'Image | Text | Image', value: 'both'},
          {title: 'Image | Text', value: 'left'},
          {title: 'Text | Image', value: 'right'},
        ],
        layout: 'radio',
      },
    }),
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
      hidden: ({parent}) => parent?.layout === 'right',
    }),
    defineField({
      name: 'leftCaption',
      title: 'Left caption',
      type: 'string',
      hidden: ({parent}) => parent?.layout === 'right',
    }),
    defineField({
      name: 'body',
      title: 'Text',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
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
      hidden: ({parent}) => parent?.layout === 'left',
    }),
    defineField({
      name: 'rightCaption',
      title: 'Right caption',
      type: 'string',
      hidden: ({parent}) => parent?.layout === 'left',
    }),
  ],
  preview: {
    select: {
      body: 'body',
      layout: 'layout',
      media: 'leftImage',
    },
    prepare({body, layout, media}) {
      const text = body?.[0]?.children?.[0]?.text || 'Split content'
      const layoutLabel =
        layout === 'left' ? 'Image | Text' : layout === 'right' ? 'Text | Image' : 'Image | Text | Image'
      return {
        title: text,
        subtitle: `Split · ${layoutLabel}`,
        media,
      }
    },
  },
})
