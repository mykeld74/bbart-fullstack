import { createClient } from '@sanity/client';
import { building } from '$app/environment';

const client = createClient({
	projectId: 'eyosaf8p',
	dataset: 'production',
	apiVersion: '2024-01-01',
	// Skip the CDN outside production builds so Studio reorders show up immediately in dev
	useCdn: building
});

export default client;
