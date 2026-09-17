<script lang="ts">
	import { getImageSrc } from '$lib/cloudinaryFetch';
	import LoadingImage from '$components/loadingImage.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Fine Art Prints | Brenda Bennett Art</title>
</svelte:head>

<div class="container">
	<h1>Fine Art Prints</h1>

	<div class="linkContainer">
		<div class="linkPrints scrollFade">
			<a href="/other-artwork">
				<div class="image">
					<LoadingImage
						src={getImageSrc(data.Images[0].mainImage, 'f_auto,q_auto,w_500')}
						alt={data.Images[0].mainImage?.alt || data.Images[0].title}
						fill
					/>
				</div>
				<div class="linkText"><p>Other Artwork</p></div>
			</a>
		</div>
		<div class="linkPrints scrollFade">
			<a href="/colorado-flag">
				<div class="image">
					<LoadingImage
						src={getImageSrc(data.Images[1].mainImage, 'f_auto,q_auto,w_500')}
						alt={data.Images[1].mainImage?.alt || data.Images[1].title}
						fill
					/>
				</div>
				<div class="linkText"><p>Colorado Flag Series</p></div>
			</a>
		</div>
		<div class="linkPrints scrollFade">
			<a href="/aspens">
				<div class="image">
					<LoadingImage
						src={getImageSrc(data.Images[2].mainImage, 'f_auto,q_auto,w_500')}
						alt={data.Images[2].mainImage?.alt || data.Images[2].title}
						fill
					/>
				</div>
				<div class="linkText"><p>Aspen Series</p></div>
			</a>
		</div>
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
