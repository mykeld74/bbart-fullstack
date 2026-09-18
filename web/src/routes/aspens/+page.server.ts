import type { PageServerLoad } from './$types'
import type { AspensQueryResult } from '$lib/sanity.types'
import { aspensQuery } from '$lib/artworkQueries'

// Dynamic so newly published artwork appears without rebuilding the site
export const prerender = false

export const load: PageServerLoad = async ({ locals: { sanity } }) => {
	const { loadQuery } = sanity
	const initial = await loadQuery<AspensQueryResult>(aspensQuery)

	return {
		query: aspensQuery,
		options: { initial }
	}
}
