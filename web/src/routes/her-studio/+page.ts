import { defineQuery } from 'groq';
import client from '$lib/client';
export const prerender = true;

const herStudioQuery = defineQuery(`*[_type == "page" && slug.current == 'her-studio'] {
	_id,
	title,
	slug,
	body
}`);

export async function load() {
	const HerStudio = await client.fetch(herStudioQuery);

	return { HerStudio };
}
