import { defineQuery } from 'groq';
import client from '$lib/client';
export const prerender = true;

const finePrintsQuery =
	defineQuery(`*[_type == "artwork" && (title == "American War Horse" || title == "Blue Sky Basin" || title == "Moonlit Aspen")] | order(title asc){
	_id,
	title,
	mainImage{
		alt,
		asset->{ url }
	}
}`);

export async function load() {
	const Images = await client.fetch(finePrintsQuery);

	return { Images };
}
