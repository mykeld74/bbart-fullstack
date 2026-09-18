import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'textBlock',
  title: 'Text',
  type: 'object',
  fields: [
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'width',
      title: 'Width',
      type: 'string',
      initialValue: 'full',
      options: {
        list: [
          {title: 'Full', value: 'full'},
          {title: 'Narrow', value: 'narrow'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),
    defineField({
      name: 'align',
      title: 'Alignment',
      type: 'string',
      initialValue: 'left',
      options: {
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Center', value: 'center'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),
  ],
  preview: {
    select: {body: 'body'},
    prepare({body}) {
      const text = body?.[0]?.children?.[0]?.text || 'Empty text'
      return {
        title: text,
        subtitle: 'Text',
      }
    },
  },
})
