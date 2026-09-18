import { defineQuery } from '@sanity/sveltekit'

export const exhibitionsPageQuery = defineQuery(`*[_type == "page" && slug.current == "exhibitions"][0] {
	_id,
	title,
	pageBuilder[] {
		...,
		_type == "imageWithCaption" => {
			...,
			image {
				alt,
				asset->{ url }
			}
		},
		_type == "imagePair" => {
			...,
			leftImage {
				alt,
				asset->{ url, metadata { dimensions { aspectRatio } } }
			},
			rightImage {
				alt,
				asset->{ url, metadata { dimensions { aspectRatio } } }
			}
		},
		_type == "splitContent" => {
			...,
			leftImage {
				alt,
				asset->{ url, metadata { dimensions { aspectRatio } } }
			},
			rightImage {
				alt,
				asset->{ url, metadata { dimensions { aspectRatio } } }
			}
		}
	}
}`)

export const eventsQuery = defineQuery(`*[_type == "event" && (
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
}`)
