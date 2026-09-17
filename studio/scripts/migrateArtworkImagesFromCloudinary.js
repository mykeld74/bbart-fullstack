/**
 * Migrate artwork.mainImage from cloudinary.asset → Sanity image asset.
 * Run: pnpm exec sanity exec scripts/migrateArtworkImagesFromCloudinary.js --with-user-token
 */
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2025-06-27'})

const artworks = await client.fetch(
  `*[_type == "artwork" && defined(mainImage.secure_url) && !defined(mainImage.asset._ref) && !(_id in path("drafts.**"))]{
    _id,
    title,
    "url": mainImage.secure_url,
    "publicId": mainImage.public_id,
    "format": mainImage.format
  } | order(title asc)`,
)

console.log(`Migrating ${artworks.length} artwork images…`)

let ok = 0
let failed = 0

for (const artwork of artworks) {
  const label = artwork.title || artwork._id
  try {
    if (!artwork.url) {
      console.warn(`skip (no url): ${label}`)
      failed += 1
      continue
    }

    const response = await fetch(artwork.url)
    if (!response.ok) {
      throw new Error(`fetch ${response.status} ${response.statusText}`)
    }

    const contentType = response.headers.get('content-type') || 'image/jpeg'
    const buffer = Buffer.from(await response.arrayBuffer())
    const ext = artwork.format || contentType.split('/')[1]?.split(';')[0] || 'jpg'
    const filename = `${artwork.publicId || artwork._id}.${ext}`

    const asset = await client.assets.upload('image', buffer, {
      filename,
      contentType,
      source: {
        name: 'cloudinary',
        id: artwork.publicId || artwork._id,
        url: artwork.url,
      },
    })

    await client
      .patch(artwork._id)
      .set({
        mainImage: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: asset._id,
          },
        },
      })
      .commit()

    ok += 1
    console.log(`ok  ${label} → ${asset._id}`)
  } catch (error) {
    failed += 1
    console.error(`fail ${label}:`, error.message || error)
  }
}

console.log(`Done. ${ok} migrated, ${failed} failed.`)
