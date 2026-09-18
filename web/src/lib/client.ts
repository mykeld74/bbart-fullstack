import { createClient } from '@sanity/sveltekit'
import { apiVersion, dataset, projectId } from '@bbart/sanity-config'
import { building } from '$app/environment'

/**
 * Shared published-content client for universal loads that still import `$lib/client`.
 * Preview / Presentation use `$lib/sanity` + `locals.sanity` instead.
 */
const client = createClient({
	projectId,
	dataset,
	apiVersion,
	useCdn: building,
	stega: false
})

export default client
