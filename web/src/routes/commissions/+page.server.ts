import type { PageServerLoad } from './$types'
import type { CommissionsQueryResult } from '$lib/sanity.types'
import { commissionsQuery } from '$lib/artworkQueries'

// Dynamic so newly published artwork appears without rebuilding the site
export const prerender = false

export const load: PageServerLoad = async ({ locals: { sanity } }) => {
	const { loadQuery } = sanity
	const initial = await loadQuery<CommissionsQueryResult>(commissionsQuery)

	return {
		query: commissionsQuery,
		options: { initial }
	}
}
