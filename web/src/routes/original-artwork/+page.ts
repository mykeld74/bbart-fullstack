import { defineQuery } from 'groq';
import client from '$lib/client';
export const prerender = true;

// Inlined rather than interpolated: typegen can only type a statically analyzable query string.
const originalArtworkQuery = defineQuery(`*[_type == "artwork" && ("Original" in imgTypes[]->title)] | order(orderRank){
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
}`);

export async function load() {
	const Artwork = await client.fetch(originalArtworkQuery);

	return { Artwork };
}
