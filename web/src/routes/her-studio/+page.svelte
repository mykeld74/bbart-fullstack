<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
	import { stegaClean, useQuery } from '@sanity/sveltekit';
	import { getImageSrc } from '$lib/cloudinaryFetch';
	import LoadingImage from '$components/loadingImage.svelte';
	import type { HerStudioQueryResult } from '$lib/sanity.types';

	let { data } = $props();
	const query = $derived(useQuery<HerStudioQueryResult>(data));
	const herStudio = $derived($query.data);
	const pageTitle = $derived(stegaClean(herStudio?.title) || 'Her Studio');
	const gallery = $derived(herStudio?.studioGallery?.filter((image) => image?.asset?.url) ?? []);
</script>

<svelte:head>
	<title>{pageTitle} | Brenda Bennett Art</title>
</svelte:head>

{#if herStudio}
	<div class="container">
		<div class="studioWrapper">
			<div class="studioContainer">
				<div class="herStudio">
					<h1>{herStudio.title}</h1>
					<PortableText value={herStudio.body ?? []} />
				</div>

				{#if herStudio.studioHero?.asset?.url}
					<div class="image1 imageContainer scrollFade">
						<LoadingImage
							src={getImageSrc(herStudio.studioHero, 'f_auto,q_auto,w_800')}
							alt={herStudio.studioHero.alt || 'Her Studio'}
							fill
						/>
					</div>
				{/if}

				{#if gallery[0]}
					<div class="image2 imageContainer scrollFade">
						<LoadingImage
							src={getImageSrc(gallery[0], 'f_auto,q_auto,w_400')}
							alt={gallery[0].alt || 'Her Studio'}
							fill
						/>
					</div>
				{/if}

				{#if gallery[1]}
					<div class="image3 imageContainer scrollFade">
						<LoadingImage
							src={getImageSrc(gallery[1], 'f_auto,q_auto,w_400')}
							alt={gallery[1].alt || 'Her Studio'}
							fill
						/>
					</div>
				{/if}

				{#if gallery[2]}
					<div class="image4 imageContainer scrollFade">
						<LoadingImage
							src={getImageSrc(gallery[2], 'f_auto,q_auto,w_400')}
							alt={gallery[2].alt || 'Her Studio'}
							fill
						/>
					</div>
				{/if}

				{#if gallery[3]}
					<div class="image5 imageContainer scrollFade">
						<LoadingImage
							src={getImageSrc(gallery[3], 'f_auto,q_auto,w_800')}
							alt={gallery[3].alt || 'Her Studio'}
							fill
						/>
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}

<style>
	.studioWrapper {
		position: relative;
		container: studio / inline-size;
	}

	.studioContainer {
		display: grid;
		grid-template-areas:
			'desc studioImage1 studioImage1'
			'desc studioImage2 studioImage3'
			'studioImage4 studioImage5 studioImage5';
		grid-template-columns: 4fr 3fr 3fr;
		gap: 20px;
		margin-bottom: 30px;
	}

	.herStudio {
		grid-area: desc;
		align-self: center;
	}

	.image1 {
		grid-area: studioImage1;
	}

	.image2 {
		grid-area: studioImage2;
	}

	.image3 {
		grid-area: studioImage3;
	}

	.image4 {
		grid-area: studioImage4;
	}

	.image5 {
		grid-area: studioImage5;
	}

	.imageContainer {
		position: relative;
		aspect-ratio: 4 / 3;
		overflow: hidden;
	}

	@supports (animation-timeline: view()) {
		.image1.scrollFade,
		.image2.scrollFade,
		.image4.scrollFade {
			animation-range: entry 0% entry 58%;
		}

		.image3.scrollFade,
		.image5.scrollFade {
			animation-range: entry 12% entry 70%;
		}
	}

	@container studio (max-width: 600px) {
		.studioContainer {
			grid-template-areas:
				'desc'
				'studioImage1'
				'studioImage2'
				'studioImage3'
				'studioImage4'
				'studioImage5';
			grid-template-columns: 1fr;
		}
	}
</style>
