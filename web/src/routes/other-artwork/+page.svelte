<script lang="ts">
	import Card from '$components/card.svelte';
	import ArtworkContainer from '$components/artworkContainer.svelte';

	let { data } = $props();
	const artwork = $derived(data.Artwork);
</script>

<svelte:head><title>Other Artwork | Brenda Bennett Art</title></svelte:head>

<div class="container">
	<h1>Other Artwork</h1>
	<h2>
		Additional subjects Brenda is drawn to paint include angels, horses, flowers, fish, and other
		“random things of beauty.”
	</h2>
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
