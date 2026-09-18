<script lang="ts">
	import { getIsPreviewing } from '@sanity/sveltekit';
	import { page } from '$app/state';

	const isPreviewing = getIsPreviewing();
</script>

{#if isPreviewing}
	<a class="disablePreview" href={`/preview/disable?redirect=${encodeURIComponent(page.url.pathname)}`}>
		Exit preview
	</a>
{/if}

<style>
	.disablePreview {
		position: fixed;
		right: 16px;
		bottom: 16px;
		z-index: 9999;
		padding: 10px 14px;
		border-radius: 999px;
		background: #111;
		color: #fff;
		font-size: 14px;
		text-decoration: none;
		box-shadow: 0 6px 20px rgb(0 0 0 / 0.25);
	}

	.disablePreview:hover {
		background: var(--primaryColor);
	}
</style>
