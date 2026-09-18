import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Footer Links',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Footer Links',
      hidden: true,
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social links',
      description: 'Icons shown in the site footer. Drag to reorder.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'socialLink',
          title: 'Social link',
          fields: [
            defineField({
              name: 'title',
              title: 'Name',
              type: 'string',
              description: 'Used for accessibility (e.g. Instagram)',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (rule) =>
                rule.required().uri({scheme: ['http', 'https']}),
            }),
            defineField({
              name: 'image',
              title: 'Icon',
              type: 'image',
              options: {hotspot: true},
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'url',
              media: 'image',
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({title: 'Footer Links'}),
  },
})
