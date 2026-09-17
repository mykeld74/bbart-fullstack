import client from '$lib/client';
export const prerender = true;

export async function load() {
	const artistQuery = `*[_type == "page" && navCategory[0]->.title == "Meet the Artist"] | order(order asc){
      _id,
      title,
      slug,
      navTitle,
		}`;
	const ArtistPages = await client.fetch(artistQuery);

	const artQuery = `*[_type == "page" && navCategory[0]->.title == "Experience Art"] | order(order asc){
      _id,
      title,
      slug,
      navTitle,
		}`;
	const ArtPages = await client.fetch(artQuery);

	return { ArtPages, ArtistPages };
}
