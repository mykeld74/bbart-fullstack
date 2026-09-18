import type { PageServerLoad } from './$types'
import type { ColoradoFlagQueryResult } from '$lib/sanity.types'
import { coloradoFlagQuery } from '$lib/artworkQueries'

// Dynamic so newly published artwork appears without rebuilding the site
export const prerender = false

export const load: PageServerLoad = async ({ locals: { sanity } }) => {
	const { loadQuery } = sanity
	const initial = await loadQuery<ColoradoFlagQueryResult>(coloradoFlagQuery)

	return {
		query: coloradoFlagQuery,
		options: { initial }
	}
}
