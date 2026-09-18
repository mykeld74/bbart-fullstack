import type { PageServerLoad } from './$types'
import type { OriginalArtworkQueryResult } from '$lib/sanity.types'
import { originalArtworkQuery } from '$lib/artworkQueries'

// Dynamic so newly published artwork appears without rebuilding the site
export const prerender = false

export const load: PageServerLoad = async ({ locals: { sanity } }) => {
	const { loadQuery } = sanity
	const initial = await loadQuery<OriginalArtworkQueryResult>(originalArtworkQuery)

	return {
		query: originalArtworkQuery,
		options: { initial }
	}
}
