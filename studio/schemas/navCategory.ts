import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'navCategory',
  title: 'Nav Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
  ],
})
