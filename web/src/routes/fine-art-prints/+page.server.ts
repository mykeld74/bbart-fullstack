import type { PageServerLoad } from './$types'
import type { FinePrintsQueryResult } from '$lib/sanity.types'
import { finePrintsQuery } from '$lib/artworkQueries'

// Dynamic so newly published artwork appears without rebuilding the site
export const prerender = false

export const load: PageServerLoad = async ({ locals: { sanity } }) => {
	const { loadQuery } = sanity
	const initial = await loadQuery<FinePrintsQueryResult>(finePrintsQuery)

	return {
		query: finePrintsQuery,
		options: { initial }
	}
}
