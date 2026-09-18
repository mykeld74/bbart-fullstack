import { defineQuery } from '@sanity/sveltekit'
import { siteSettingsQuery } from '$lib/siteSettingsQueries'
import type { LayoutServerLoad } from './$types'

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

export const load: LayoutServerLoad = async ({ locals: { sanity } }) => {
	const { client, previewEnabled } = sanity
	const fetchOptions = { stega: previewEnabled }

	const [ArtistPages, ArtPages, siteSettings] = await Promise.all([
		client.fetch(artistPagesQuery, {}, fetchOptions),
		client.fetch(artPagesQuery, {}, fetchOptions),
		client.fetch(siteSettingsQuery, {}, fetchOptions)
	])

	return { ArtPages, ArtistPages, siteSettings, previewEnabled }
}
