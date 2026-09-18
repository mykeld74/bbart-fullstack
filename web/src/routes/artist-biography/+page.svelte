<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
	import { stegaClean, useQuery } from '@sanity/sveltekit';
	import { getImageSrc } from '$lib/cloudinaryFetch';
	import LoadingImage from '$components/loadingImage.svelte';
	import type { BioQueryResult } from '$lib/sanity.types';

	let { data } = $props();
	const query = $derived(useQuery<BioQueryResult>(data));
	const bio = $derived($query.data);
	const pageTitle = $derived(stegaClean(bio?.title) || 'Artist Biography');
</script>

<svelte:head>
	<title>{pageTitle} | Brenda Bennett Art</title>
</svelte:head>

{#if bio}
	<div class="container">
		<h1>{bio.title}</h1>
		<div class="bio">
			<div class="bioPic scrollFade">
				<LoadingImage
					src={getImageSrc(bio.mainImage, 'f_auto,q_auto,w_300')}
					alt={bio.mainImage?.alt || 'Brenda Bennett'}
				/>
			</div>
			<PortableText value={bio.body ?? []} />
		</div>
		<div class="secondaryImage scrollFade">
			<LoadingImage
				src={getImageSrc(bio.secondaryImage, 'f_auto,q_auto')}
				alt={bio.secondaryImage?.alt || 'Brenda Bennett Landscape'}
			/>
		</div>
	</div>
{/if}

<style>
	.bioPic {
		width: 200px;
		float: left;
		margin-right: 20px;
		--loader-aspect: 3 / 4;
	}

	.bio :global(p) {
		margin: 0 0 1.25em;
	}

	.bio :global(p:last-child) {
		margin-bottom: 0;
	}

	.secondaryImage {
		margin-top: 20px;
		--loader-aspect: 16 / 9;
		clear: both;
	}
</style>
