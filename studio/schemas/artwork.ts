import {defineArrayMember, defineField, defineType} from 'sanity'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'
import {ArtworkFormInput} from '../studio/artworkFormInput'

export default defineType({
  name: 'artwork',
  title: 'Artwork',
  type: 'document',
  components: {
    input: ArtworkFormInput,
  },
  initialValue: {
    sold: false,
  },
  orderings: [orderRankOrdering],
  fieldsets: [
    {
      name: 'identity',
      title: 'Identity',
      options: {columns: 2},
    },
    {
      name: 'classification',
      title: 'Classification',
      options: {columns: 2},
    },
    {
      name: 'sale',
      title: 'Sale',
      options: {columns: 2},
    },
    {
      name: 'descriptions',
      title: 'Descriptions',
      options: {collapsible: true, collapsed: false},
    },
  ],
  fields: [
    // 'before' ranks a new piece ahead of the current first one, so it lands at
    // the top of the Artwork list — and, since the galleries order by orderRank
    // too, at the top of its gallery pages.
    orderRankField({type: 'artwork', newItemPosition: 'before'}),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      fieldset: 'identity',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      fieldset: 'identity',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'size',
      title: 'Size',
      type: 'string',
      fieldset: 'identity',
    }),
    defineField({
      name: 'series',
      title: 'Series',
      type: 'array',
      fieldset: 'classification',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'series'}],
        }),
      ],
    }),
    defineField({
      name: 'imgTypes',
      title: 'Image Types',
      type: 'array',
      fieldset: 'classification',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'imageType'}],
        }),
      ],
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      fieldset: 'sale',
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: 'sold',
      title: 'Sold',
      type: 'boolean',
      fieldset: 'sale',
      options: {
        layout: 'switch',
      },
    }),
    defineField({
      name: 'etsyLink',
      title: 'Etsy Link',
      type: 'url',
      validation: (rule) =>
        rule.uri({
          scheme: ['http', 'https'],
        }),
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
      name: 'originalDescription',
      title: 'Original',
      type: 'blockContent',
      fieldset: 'descriptions',
    }),
    defineField({
      name: 'printsDescription',
      title: 'Prints',
      type: 'blockContent',
      fieldset: 'descriptions',
    }),
    defineField({
      name: 'commissionDescription',
      title: 'Commission',
      type: 'blockContent',
      fieldset: 'descriptions',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      sold: 'sold',
      price: 'price',
      size: 'size',
    },
    prepare({title, media, sold, price, size}) {
      const status = sold ? 'Sold' : price != null ? `$${price}` : 'Available'
      const subtitle = [status, size].filter(Boolean).join(' · ')

      return {
        title: title || 'Untitled artwork',
        media,
        subtitle,
      }
    },
  },
})
