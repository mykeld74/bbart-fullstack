<script lang="ts">
	import Card from '$components/card.svelte';
	import ArtworkContainer from '$components/artworkContainer.svelte';
	import { useQuery } from '@sanity/sveltekit';
	import type { ColoradoFlagQueryResult } from '$lib/sanity.types';

	let { data } = $props();
	const query = $derived(useQuery<ColoradoFlagQueryResult>(data));
	const artwork = $derived($query.data ?? []);
</script>

<svelte:head><title>Colorado Flag Series | Brenda Bennett Art</title></svelte:head>

<div class="container">
	<h1>Colorado Flag Series</h1>
	<h2>The state of Colorado proudly flies its flag. Are you flying yours?</h2>
	<p>Click on any of the images to view it in Brenda’s Etsy store.</p>

	<ArtworkContainer>
		{#each artwork as { title, size, price, sold, mainImage, originalDescription, printsDescription, commissionDescription, etsyLink }}
			<div class="cardContainer">
				<Card
					{title}
					{size}
					{price}
					{sold}
					{mainImage}
					{originalDescription}
					{printsDescription}
					{commissionDescription}
					{etsyLink}
					imgWidth="500"
					page="other-artwork"
				/>
			</div>
		{/each}
	</ArtworkContainer>
</div>

<style>
	.cardContainer {
		width: 100%;
	}
</style>
