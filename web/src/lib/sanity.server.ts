import { env } from '$env/dynamic/private'
import { client } from '$lib/sanity'

const viewerToken = env.SANITY_VIEWER_TOKEN

if (!viewerToken) {
	console.warn(
		'[sanity] SANITY_VIEWER_TOKEN is not set — /preview/enable and draft content will fail'
	)
}

export const serverClient = client.withConfig({
	token: viewerToken || undefined,
	useCdn: false,
	stega: true,
	perspective: 'published'
})
