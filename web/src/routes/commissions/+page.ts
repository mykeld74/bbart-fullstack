import { defineQuery } from '@sanity/sveltekit';
import client from '$lib/client';
export const prerender = true;

const commissionsQuery = defineQuery(`*[_type == "artwork" && ("Commission" in imgTypes[]->title)] | order(orderRank){
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
	const Artwork = await client.fetch(commissionsQuery);

	return { Artwork };
}
