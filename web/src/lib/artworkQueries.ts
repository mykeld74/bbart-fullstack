import { defineQuery } from '@sanity/sveltekit'

/**
 * Gallery queries.
 *
 * Each gallery collects artwork by matching a Series or Image Type title
 * exactly, so renaming one of those documents empties its page.
 *
 * Written out in full rather than built from a shared projection string:
 * typegen can only type a statically analyzable query, so no `${interpolation}`.
 */

export const aspensQuery =
	defineQuery(`*[_type == "artwork" && ("Aspen" in series[]->title)] | order(orderRank) {
	_id,
	title,
	slug,
	size,
	series[]->,
	imgTypes[]->,
	price,
	sold,
	originalDescription,
	printsDescription,
	commissionDescription,
	etsyLink,
	mainImage{
		alt,
		asset->{ url }
	}
}`)

export const coloradoFlagQuery =
	defineQuery(`*[_type == "artwork" && ("Colorado Flag" in series[]->title)] | order(orderRank){
	_id,
	title,
	slug,
	size,
	series[]->,
	imgTypes[]->,
	price,
	sold,
	originalDescription,
	printsDescription,
	commissionDescription,
	etsyLink,
	mainImage{
		alt,
		asset->{ url }
	}
}`)

export const otherArtworkQuery =
	defineQuery(`*[_type == "artwork" && ("Other" in series[]->title)] | order(orderRank){
	_id,
	title,
	slug,
	size,
	series[]->,
	imgTypes[]->,
	price,
	sold,
	originalDescription,
	printsDescription,
	commissionDescription,
	etsyLink,
	mainImage{
		alt,
		asset->{ url }
	}
}`)

export const originalArtworkQuery =
	defineQuery(`*[_type == "artwork" && ("Original" in imgTypes[]->title)] | order(orderRank){
	_id,
	title,
	slug,
	size,
	series[0]->,
	imgTypes[]->,
	price,
	sold,
	originalDescription,
	printsDescription,
	commissionDescription,
	etsyLink,
	mainImage{
		alt,
		asset->{ url }
	}
}`)

export const commissionsQuery =
	defineQuery(`*[_type == "artwork" && ("Commission" in imgTypes[]->title)] | order(orderRank){
	_id,
	title,
	slug,
	size,
	series[0]->,
	imgTypes[]->,
	price,
	sold,
	originalDescription,
	printsDescription,
	commissionDescription,
	etsyLink,
	mainImage{
		alt,
		asset->{ url }
	}
}`)

export const finePrintsQuery =
	defineQuery(`*[_type == "artwork" && (title == "American War Horse" || title == "Blue Sky Basin" || title == "Moonlit Aspen")] | order(title asc){
	_id,
	title,
	mainImage{
		alt,
		asset->{ url }
	}
}`)
