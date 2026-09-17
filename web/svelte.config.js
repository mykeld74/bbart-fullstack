import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		alias: {
			$css: 'src/css',
			$components: 'src/components',
			$data: 'src/data',
			$img: 'src/images'
		},
		prerender: {
			crawl: true,
			entries: ['*'],
			handleHttpError: 'warn'
		}
	}
};

export default config;
