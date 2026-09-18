import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'
import type {StructureResolver} from 'sanity/structure'

const SINGLETONS = ['siteSettings']

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Content')
    .items([
      orderableDocumentListDeskItem({
        type: 'artwork',
        title: 'Artwork',
        S,
        context,
      }),
      S.listItem()
        .title('Events')
        .schemaType('event')
        .child(
          S.documentTypeList('event')
            .title('Events')
            .defaultOrdering([{field: 'date', direction: 'asc'}]),
        ),
      S.listItem()
        .title('Pages')
        .schemaType('page')
        .child(S.documentTypeList('page').title('Pages')),
      S.listItem()
        .title('Footer Links')
        .id('siteSettings')
        .child(
          S.document().schemaType('siteSettings').documentId('siteSettings').title('Footer Links'),
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => !['artwork', 'event', 'page', ...SINGLETONS].includes(item.getId() ?? ''),
      ),
    ])
