import type { SanityLocals } from '@sanity/sveltekit'

declare global {
	namespace App {
		interface Locals extends SanityLocals {}
	}
}

export {}
