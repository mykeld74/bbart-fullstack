import { defineQuery } from '@sanity/sveltekit';
import client from '$lib/client';
export const prerender = true;

const aspensQuery = defineQuery(`*[_type == "artwork" && ("Aspen" in series[]->title)] | order(orderRank) {
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
}`);

export async function load() {
	const Artwork = await client.fetch(aspensQuery);

	return { Artwork };
}
