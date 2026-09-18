import { defineQuery } from '@sanity/sveltekit'

export const bioQuery = defineQuery(`*[_type == "page" && slug.current == "artist-biography"][0] {
	_id,
	title,
	slug,
	body,
	mainImage{
		alt,
		secure_url,
		url,
		asset->{ url }
	},
	secondaryImage{
		alt,
		secure_url,
		url,
		asset->{ url }
	}
}`)

export const herStudioQuery = defineQuery(`*[_type == "page" && slug.current == "her-studio"][0] {
	_id,
	title,
	slug,
	body,
	studioHero {
		alt,
		asset->{ url }
	},
	studioGallery[] {
		_key,
		alt,
		caption,
		asset->{ url }
	}
}`)
