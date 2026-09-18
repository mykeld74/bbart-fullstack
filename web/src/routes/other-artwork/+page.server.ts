import type { PageServerLoad } from './$types'
import type { OtherArtworkQueryResult } from '$lib/sanity.types'
import { otherArtworkQuery } from '$lib/artworkQueries'

// Dynamic so newly published artwork appears without rebuilding the site
export const prerender = false

export const load: PageServerLoad = async ({ locals: { sanity } }) => {
	const { loadQuery } = sanity
	const initial = await loadQuery<OtherArtworkQueryResult>(otherArtworkQuery)

	return {
		query: otherArtworkQuery,
		options: { initial }
	}
}
