<script lang="ts">
	import Card from '$components/card.svelte';
	import ArtworkContainer from '$components/artworkContainer.svelte';

	let { data } = $props();
	const artwork = $derived(data.Artwork);
</script>

<svelte:head><title>Commissions | Brenda Bennet Art</title></svelte:head>

<div class="container">
	<h1>Commissions</h1>
	<p>
		Brenda will be taking new commissions in November. Please send your ideas to the artist on her
		Meet the Artist section, including any reference photos you wish, and the artist will return
		your inquiry quickly to consult with you. Some of her best work has come from her clients’
		hearts!
	</p>
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
					page="commissions"
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
