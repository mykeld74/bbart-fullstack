import { env } from '$env/dynamic/private'
import { client } from '$lib/sanity'

export const serverClient = client.withConfig({
	token: env.SANITY_VIEWER_TOKEN || undefined,
	useCdn: false,
	stega: true,
	perspective: 'published'
})
