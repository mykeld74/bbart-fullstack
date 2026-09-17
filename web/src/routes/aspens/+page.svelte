<script lang="ts">
	import Card from '$components/card.svelte';
	import ArtworkContainer from '$components/artworkContainer.svelte';

	let { data } = $props();
	const artwork = $derived(data.Artwork);
</script>

<svelte:head><title>Aspen Series | Brenda Bennett Art</title></svelte:head>

<div class="container">
	<h1>Aspen Series</h1>
	<h2>
		Brenda’s home studio is in the foothills of the Rocky Mountains. The aspen trees that color the
		landscape are a favorite subject for her artwork, and a favorite resting spot on her backcountry
		sojourns.
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
