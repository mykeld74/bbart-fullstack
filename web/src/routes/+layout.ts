import { defineQuery } from 'groq';
import client from '$lib/client';
export const prerender = true;

const artistPagesQuery = defineQuery(`*[_type == "page" && navCategory[0]->.title == "Meet the Artist"] | order(order asc){
	_id,
	title,
	slug,
	navTitle
}`);

const artPagesQuery = defineQuery(`*[_type == "page" && navCategory[0]->.title == "Experience Art"] | order(order asc){
	_id,
	title,
	slug,
	navTitle
}`);

export async function load() {
	const ArtistPages = await client.fetch(artistPagesQuery);
	const ArtPages = await client.fetch(artPagesQuery);

	return { ArtPages, ArtistPages };
}
