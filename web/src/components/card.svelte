<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
	import { getImageSrc } from '$lib/cloudinaryFetch';
	import LoadingImage from '$components/loadingImage.svelte';

	let {
		title,
		size,
		price,
		sold,
		mainImage,
		originalDescription,
		printsDescription,
		commissionDescription,
		etsyLink,
		page,
		imgWidth = 'auto'
	} = $props();

	const imageSrc = $derived(getImageSrc(mainImage, `f_auto,q_auto,w_${imgWidth}`));
</script>

<section class="artworkCard">
	<article class="artwork">
		<div class="imgContainer scrollFade {page}">
			{#if etsyLink}
				<a href={etsyLink} target="_blank" rel="noopener noreferrer">
					<LoadingImage src={imageSrc} alt={mainImage?.alt || title} fill />
				</a>
			{:else}
				<LoadingImage src={imageSrc} alt={mainImage?.alt || title} fill />
			{/if}
			{#if price}<p class="price">${price}</p>{/if}
			{#if sold && page === 'original-artwork'}
				<p class="sold">Sold</p>
			{/if}
		</div>
		<div class="artwork-info">
			<p class="size">{size}</p>
			<h3 class="title">"{title}"</h3>
			{#if originalDescription && page === 'original-artwork'}
				<div class="desc"><PortableText value={originalDescription} /></div>
			{/if}
			{#if commissionDescription && page === 'commissions'}
				<div class="desc"><PortableText value={commissionDescription} /></div>
			{/if}
			{#if printsDescription && page === 'other-artwork'}
				<div class="desc printDesc"><PortableText value={printsDescription} /></div>
			{/if}
		</div>
	</article>
</section>

<style>
	.artworkCard {
		width: 100%;
	}
	.imgContainer {
		width: 100%;
		position: relative;
		aspect-ratio: 413/270;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		margin-bottom: 10px;
	}
	.imgContainer a,
	.imgContainer :global(.loadingImage) {
		position: absolute;
		inset: 0;
		z-index: 1;
	}
	.imgContainer.original-artwork :global(.loadingImage.loaded:hover img) {
		opacity: 0.25;
	}
	.title {
		min-height: 63px;
	}

	h3 {
		color: var(--primaryColor);
		font-size: 1.7rem;
		margin: 10px 0;
		text-align: center;
	}
	p {
		text-align: center;
		margin: 0;
	}

	.sold {
		color: red;
		position: absolute;
		bottom: 30px;
		right: 30px;
		font-size: 36px;
		margin: 0;
		transform: rotate(-30deg);
		font-weight: 600;
		text-shadow: 3px 3px 4px #333;
		z-index: 2;
	}
	.price {
		font-size: 36px;
	}
	.desc {
		text-align: center;
	}
</style>
