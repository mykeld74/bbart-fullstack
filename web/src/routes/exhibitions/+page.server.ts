import type { PageServerLoad } from './$types'
import type {
	EventsQueryResult,
	ExhibitionsPageQueryResult
} from '$lib/sanity.types'
import { eventsQuery, exhibitionsPageQuery } from '$lib/exhibitionsQueries'

// Keep this page dynamic so Sanity event/page edits show up without a rebuild
export const prerender = false

export const load: PageServerLoad = async ({ locals: { sanity } }) => {
	const { loadQuery } = sanity
	const today = new Date().toISOString().slice(0, 10)

	const [pageInitial, eventsInitial] = await Promise.all([
		loadQuery<ExhibitionsPageQueryResult>(exhibitionsPageQuery),
		loadQuery<EventsQueryResult>(eventsQuery, { today })
	])

	return {
		pageQuery: exhibitionsPageQuery,
		eventsQuery,
		eventsParams: { today },
		pageInitial,
		eventsInitial
	}
}
