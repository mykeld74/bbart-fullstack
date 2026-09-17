/**
 * Seed artwork.orderRank from legacy numeric `order`, then unset `order`.
 * Run: pnpm exec sanity exec scripts/seedArtworkOrderRank.js --with-user-token
 */
import {getCliClient} from 'sanity/cli'
import {LexoRank} from 'lexorank'

const client = getCliClient({apiVersion: '2025-06-27'})

const artworks = await client.fetch(
  `*[_type == "artwork" && !(_id in path("drafts.**"))] | order(order asc, title asc) {_id, title, order}`,
)

let rank = LexoRank.min()
const patches = artworks.map((doc) => {
  rank = rank.genNext().genNext()
  return {
    id: doc._id,
    orderRank: rank.toString(),
    title: doc.title,
    order: doc.order,
  }
})

console.log(`Updating ${patches.length} artworks…`)
for (const patch of patches) {
  console.log(`${patch.order ?? '∅'} → ${patch.orderRank}  ${patch.title}`)
}

let transaction = client.transaction()
for (const patch of patches) {
  transaction = transaction.patch(patch.id, {
    set: {orderRank: patch.orderRank},
    unset: ['order'],
  })
}

await transaction.commit()
console.log('Done. orderRank seeded from Order; legacy order field removed from documents.')
