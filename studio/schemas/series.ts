import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'series',
  title: 'Series',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
    }),
  ],
  orderings: [
    {
      title: 'Manual order',
      name: 'manualOrder',
      by: [{field: 'order', direction: 'desc'}],
    },
  ],

  preview: {
    select: {
      title: 'title',
    },
    // prepare(selection) {
    //   const { author } = selection;
    //   return Object.assign({}, selection, {
    //     subtitle: author && `by ${author}`,
    //   });
    // },
  },
})
