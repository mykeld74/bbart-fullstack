<script lang="ts">
	import { stegaClean } from '@sanity/sveltekit';
	import { getImageSrc } from '$lib/cloudinaryFetch';

	type SocialLink = {
		_key?: string | null;
		title?: string | null;
		url?: string | null;
		image?: {
			asset?: { url?: string | null } | null;
		} | null;
	};

	let { socialLinks = [] }: { socialLinks?: SocialLink[] | null } = $props();

	const links = $derived(
		(socialLinks ?? []).filter((link) => stegaClean(link.url) && getImageSrc(link.image))
	);
</script>

<footer>
	{#if links.length > 0}
		<div class="socialContainer">
			{#each links as link (link._key || stegaClean(link.url))}
				{@const href = stegaClean(link.url) || '#'}
				{@const title = stegaClean(link.title) || 'Social link'}
				<a {href} target="_blank" rel="noopener noreferrer">
					<img src={getImageSrc(link.image, 'f_auto,q_auto')} alt={title} />
				</a>
			{/each}
		</div>
	{/if}
</footer>

<style>
	footer {
		width: 100%;
		border-top: 1px solid #ccc;
		padding: 20px 0;
		margin-top: 40px;
	}
	.socialContainer {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 20px;
		width: calc(100% - 40px);
		max-width: 400px;
		margin: auto;
	}
</style>
