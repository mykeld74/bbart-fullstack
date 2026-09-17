import { defineQuery } from 'groq';
import client from '$lib/client';
export const prerender = true;

const bioQuery = defineQuery(`*[_type == "page" && slug.current == 'artist-biography'] {
	_id,
	title,
	slug,
	body,
	mainImage{
		alt,
		asset->{ url }
	},
	secondaryImage{
		alt,
		asset->{ url }
	}
}`);

export async function load() {
	const Bio = await client.fetch(bioQuery);

	return { Bio };
}
