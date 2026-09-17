import {defineField, defineType} from 'sanity'
import {EventFormInput} from '../studio/eventFormInput'

export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  components: {
    input: EventFormInput,
  },
  fieldsets: [
    {
      name: 'when',
      title: 'When',
      options: {columns: 2},
    },
    {
      name: 'where',
      title: 'Venue',
      options: {columns: 2},
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'isMultiDay',
      title: 'Multi-day event',
      type: 'boolean',
      initialValue: false,
      options: {
        layout: 'switch',
      },
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      fieldset: 'when',
      options: {
        dateFormat: 'MMMM D, YYYY',
      },
      hidden: ({document}) => Boolean(document?.isMultiDay),
      validation: (rule) =>
        rule.custom((value, context) => {
          if (context.document?.isMultiDay) return true
          return value ? true : 'Required'
        }),
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      fieldset: 'when',
      options: {
        dateFormat: 'MMMM D, YYYY',
      },
      hidden: ({document}) => !document?.isMultiDay,
      validation: (rule) =>
        rule.custom((value, context) => {
          if (!context.document?.isMultiDay) return true
          return value ? true : 'Required'
        }),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
      fieldset: 'when',
      options: {
        dateFormat: 'MMMM D, YYYY',
      },
      hidden: ({document}) => !document?.isMultiDay,
      validation: (rule) =>
        rule.custom((value, context) => {
          if (!context.document?.isMultiDay) return true
          if (!value) return 'Required'
          const startDate = context.document?.startDate
          if (typeof startDate === 'string' && value < startDate) {
            return 'End date must be on or after start date'
          }
          return true
        }),
    }),
    defineField({
      name: 'time',
      title: 'Time (e.g. 6:00 PM – 8:00 PM)',
      type: 'string',
      fieldset: 'when',
    }),
    defineField({
      name: 'venueName',
      title: 'Venue Name',
      type: 'string',
      fieldset: 'where',
    }),
    defineField({
      name: 'venueAddress',
      title: 'Venue Address',
      type: 'text',
      rows: 2,
      fieldset: 'where',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    }),
  ],
  orderings: [
    {
      title: 'Date, upcoming first',
      name: 'dateAsc',
      by: [{field: 'date', direction: 'asc'}],
    },
    {
      title: 'Date, latest first',
      name: 'dateDesc',
      by: [{field: 'date', direction: 'desc'}],
    },
    {
      title: 'Start date, upcoming first',
      name: 'startDateAsc',
      by: [{field: 'startDate', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      isMultiDay: 'isMultiDay',
      date: 'date',
      startDate: 'startDate',
      endDate: 'endDate',
      time: 'time',
      venueName: 'venueName',
      media: 'image',
    },
    prepare({title, isMultiDay, date, startDate, endDate, time, venueName, media}) {
      const dateLabel = isMultiDay
        ? [startDate, endDate].filter(Boolean).join(' – ')
        : date
      const subtitle = [dateLabel, time, venueName].filter(Boolean).join(' · ')

      return {
        title: title || 'Untitled event',
        subtitle,
        media,
      }
    },
  },
})
