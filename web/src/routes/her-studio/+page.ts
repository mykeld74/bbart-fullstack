import client from '$lib/client';
export const prerender = true;

export async function load() {
	const query = `*[_type == "page" && slug.current == 'her-studio'] {
    _id,
    title,
    slug,
    body,
    
  }`;
	const HerStudio = await client.fetch(query);

	return { HerStudio };
}
