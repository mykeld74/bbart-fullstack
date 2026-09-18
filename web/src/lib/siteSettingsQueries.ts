import {defineQuery} from '@sanity/sveltekit'

export const siteSettingsQuery = defineQuery(`*[_id == "siteSettings"][0] {
	_id,
	socialLinks[] {
		_key,
		title,
		url,
		image {
			asset->{ url }
		}
	}
}`)

