import { defineQuery } from 'groq';
import client from '$lib/client';

// Keep this page dynamic so Sanity event edits show up without a rebuild
export const prerender = false;

const eventsQuery = defineQuery(`*[_type == "event" && (
	(isMultiDay != true && date >= $today) ||
	(isMultiDay == true && endDate >= $today)
)] | order(coalesce(startDate, date) asc) {
	_id,
	title,
	isMultiDay,
	date,
	startDate,
	endDate,
	time,
	venueName,
	venueAddress,
	description,
	image {
		alt,
		asset->{ url }
	}
}`);

export async function load() {
	const today = new Date().toISOString().slice(0, 10);
	const events = await client.fetch(eventsQuery, { today });

	return { events };
}
