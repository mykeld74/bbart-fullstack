<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
	import { getImageSrc } from '$lib/cloudinaryFetch';
	import LoadingImage from '$components/loadingImage.svelte';

	let { data } = $props();
	const bio = $derived(data.Bio);
</script>

<svelte:head>
	<title>Artist Biography | Brenda Bennett Art</title>
</svelte:head>

<div class="container">
	<h1>{bio[0].title}</h1>
	<div class="bio">
		<div class="bioPic scrollFade">
			<LoadingImage
				src={getImageSrc(bio[0].mainImage, 'f_auto,q_auto,w_300')}
				alt={bio[0].mainImage?.alt || 'Brenda Bennett'}
			/>
		</div>
		<PortableText value={bio[0].body ?? []} />
	</div>
	<div class="secondaryImage scrollFade">
		<LoadingImage
			src={getImageSrc(bio[0].secondaryImage, 'f_auto,q_auto')}
			alt={bio[0].secondaryImage?.alt || 'Brenda Bennett Landscape'}
		/>
	</div>
</div>

<style>
	.bioPic {
		width: 200px;
		float: left;
		margin-right: 20px;
		--loader-aspect: 3 / 4;
	}
	.secondaryImage {
		margin-top: 20px;
		--loader-aspect: 16 / 9;
	}
</style>
