<script lang="ts">
	import Card from '$components/card.svelte';
	import ArtworkContainer from '$components/artworkContainer.svelte';

	let { data } = $props();
	const artwork = $derived(data.Artwork);
</script>

<svelte:head><title>Original Artwork | Brenda Bennett Art</title></svelte:head>

<div class="container">
	<h1>Original Artwork</h1>
	<p>
		Serious collectors of original works are welcome to schedule an appointment at Brenda’s home
		studio, near Belmar in Lakewood, Colorado, Mondays through Thursdays from 9am-2pm. Contact
		Brenda to schedule your appointment here:
	</p>

	<ArtworkContainer additionalClasses="fourWide">
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
					page="original-artwork"
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
