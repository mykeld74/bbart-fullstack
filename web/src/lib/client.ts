import { createClient } from '@sanity/client';
import { apiVersion, dataset, projectId } from '@bbart/sanity-config';
import { building } from '$app/environment';

const client = createClient({
	projectId,
	dataset,
	apiVersion,
	// Skip the CDN outside production builds so Studio reorders show up immediately in dev
	useCdn: building
});

export default client;
