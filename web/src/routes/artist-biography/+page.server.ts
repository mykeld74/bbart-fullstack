import type { PageServerLoad } from './$types'
import type { BioQueryResult } from '$lib/sanity.types'
import { bioQuery } from '$lib/pageQueries'

// Dynamic so Presentation / draft edits show without a rebuild
export const prerender = false

export const load: PageServerLoad = async ({ locals: { sanity } }) => {
	const { loadQuery } = sanity
	const initial = await loadQuery<BioQueryResult>(bioQuery)

	return {
		query: bioQuery,
		options: { initial }
	}
}
