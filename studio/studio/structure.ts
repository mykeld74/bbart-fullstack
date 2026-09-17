import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'
import type {StructureResolver} from 'sanity/structure'

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
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => !['artwork', 'event'].includes(item.getId() ?? ''),
      ),
    ])
