import client from '$lib/client';
export const prerender = true;

const imageProjection = `mainImage{
  alt,
  asset->{
    url
  }
}`;

export async function load() {
	const query = `*[_type == "artwork" && ("Original" in imgTypes[]->title)] | order(orderRank){
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
      etsyLink,
      ${imageProjection}
		}`;
	const Artwork = await client.fetch(query);

	return { Artwork };
}
