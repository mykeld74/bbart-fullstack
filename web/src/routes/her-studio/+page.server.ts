import type { PageServerLoad } from './$types'
import type { HerStudioQueryResult } from '$lib/sanity.types'
import { herStudioQuery } from '$lib/pageQueries'

// Dynamic so Presentation / draft edits show without a rebuild
export const prerender = false

export const load: PageServerLoad = async ({ locals: { sanity } }) => {
	const { loadQuery } = sanity
	const initial = await loadQuery<HerStudioQueryResult>(herStudioQuery)

	return {
		query: herStudioQuery,
		options: { initial }
	}
}
