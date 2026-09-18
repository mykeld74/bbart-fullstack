<script lang="ts">
	import '$css/style.css';
	import Header from '$components/header.svelte';
	import Footer from '$components/footer.svelte';
	import { PreviewMode, QueryLoader, VisualEditing } from '@sanity/sveltekit';
	import { client } from '$lib/sanity';
	import DisablePreview from '$components/disablePreview.svelte';

	let { data, children } = $props();
	const previewEnabled = $derived(data.previewEnabled);
</script>

<svelte:head>
	<meta name="color-scheme" content="light" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Special+Elite&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<PreviewMode enabled={previewEnabled}>
	{#if previewEnabled}
		<QueryLoader enabled {client}>
			<!-- Keep chrome outside VisualEditing so overlays don't distort nav layout -->
			<Header ArtPages={data.ArtPages} ArtistPages={data.ArtistPages} />
			<VisualEditing enabled>
				{@render children()}
			</VisualEditing>
			<Footer socialLinks={data.siteSettings?.socialLinks} />
			<DisablePreview />
		</QueryLoader>
	{:else}
		<Header ArtPages={data.ArtPages} ArtistPages={data.ArtistPages} />
		{@render children()}
		<Footer socialLinks={data.siteSettings?.socialLinks} />
	{/if}
</PreviewMode>
