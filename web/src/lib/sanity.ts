import { createClient } from '@sanity/sveltekit'
import { apiVersion, dataset, projectId } from '@bbart/sanity-config'
import { env } from '$env/dynamic/public'

export const studioUrl = env.PUBLIC_SANITY_STUDIO_URL || 'http://localhost:3333'

export const client = createClient({
	projectId,
	dataset,
	apiVersion,
	useCdn: true,
	stega: {
		enabled: true,
		studioUrl
	}
})

/** @deprecated Prefer named `client` import from `$lib/sanity` */
export default client
