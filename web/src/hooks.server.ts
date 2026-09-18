import {
	handlePreviewMode,
	handleQueryLoader,
	setServerClient
} from '@sanity/sveltekit'
import { redirect } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'
import { env } from '$env/dynamic/private'
import { serverClient } from '$lib/sanity.server'

setServerClient(serverClient)

export const handle = sequence(
	handlePreviewMode({
		client: serverClient,
		preview: {
			redirect,
			// Stable across serverless cold starts; required for iframe preview cookies
			secret: env.SANITY_PREVIEW_SECRET || env.SANITY_VIEWER_TOKEN || 'bbart-preview-dev'
		}
	}),
	handleQueryLoader()
)
