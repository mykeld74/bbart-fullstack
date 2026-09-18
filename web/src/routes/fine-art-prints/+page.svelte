<script lang="ts">
	import { getImageSrc } from '$lib/cloudinaryFetch';
	import LoadingImage from '$components/loadingImage.svelte';
	import { useQuery } from '@sanity/sveltekit';
	import type { FinePrintsQueryResult } from '$lib/sanity.types';

	let { data } = $props();
	const query = $derived(useQuery<FinePrintsQueryResult>(data));
	const images = $derived($query.data ?? []);

	// The query returns the three pieces in title order; each one is the cover
	// for a gallery. A renamed piece drops out, so the image is optional.
	const links = $derived([
		{ href: '/other-artwork', label: 'Other Artwork', piece: images[0] },
		{ href: '/colorado-flag', label: 'Colorado Flag Series', piece: images[1] },
		{ href: '/aspens', label: 'Aspen Series', piece: images[2] }
	]);
</script>

<svelte:head>
	<title>Fine Art Prints | Brenda Bennett Art</title>
</svelte:head>

<div class="container">
	<h1>Fine Art Prints</h1>

	<div class="linkContainer">
		{#each links as { href, label, piece } (href)}
			<div class="linkPrints scrollFade">
				<a {href}>
					{#if piece?.mainImage}
						<div class="image">
							<LoadingImage
								src={getImageSrc(piece.mainImage, 'f_auto,q_auto,w_500')}
								alt={piece.mainImage.alt || piece.title || label}
								fill
							/>
						</div>
					{/if}
					<div class="linkText"><p>{label}</p></div>
				</a>
			</div>
		{/each}
	</div>
</div>

<style>
	.linkContainer {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2vw;
	}
	.image {
		position: relative;
		aspect-ratio: 4/2.99;
		overflow: hidden;
	}
</style>
