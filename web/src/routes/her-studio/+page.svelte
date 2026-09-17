<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
	import LoadingImage from '$components/loadingImage.svelte';

	let { data } = $props();
	const herStudio = $derived(data.HerStudio);
</script>

<svelte:head>
	<title>Her Studio | Brenda Bennett Art</title>
</svelte:head>

<div class="container">
	<div class="studioWrapper">
		<div class="studioContainer">
			<div class="herStudio">
				<h1>{herStudio[0].title}</h1>
				<PortableText value={herStudio[0].body} />
			</div>
			<div class="image1 imageContainer scrollFade">
				<LoadingImage
					src="https://res.cloudinary.com/drst9cyhc/image/upload/f_auto,q_auto,w_800/v1668539933/studio_pic_WorkSpace"
					alt="Her Studio"
					fill
				/>
			</div>
			<div class="image2 imageContainer scrollFade">
				<LoadingImage
					src="https://res.cloudinary.com/drst9cyhc/image/upload/f_auto,q_auto,w_400/v1668539933/studio_pic_Scissors-1"
					alt="Her Studio"
					fill
				/>
			</div>
			<div class="image3 imageContainer scrollFade">
				<LoadingImage
					src="https://res.cloudinary.com/drst9cyhc/image/upload/f_auto,q_auto,w_400/v1668539933/studio_pic_InkSprays"
					alt="Her Studio"
					fill
				/>
			</div>
			<div class="image4 imageContainer scrollFade">
				<LoadingImage
					src="https://res.cloudinary.com/drst9cyhc/image/upload/f_auto,q_auto,w_400/v1668539933/studio4"
					alt="Her Studio"
					fill
				/>
			</div>
			<div class="image5 imageContainer scrollFade">
				<LoadingImage
					src="https://res.cloudinary.com/drst9cyhc/image/upload/f_auto,q_auto,w_800/v1668539933/studio_pic_ArtistSeriesImages-1"
					alt="Her Studio"
					fill
				/>
			</div>
		</div>
	</div>
</div>

<style>
	.studioWrapper {
		position: relative;
		container: studio / inline-size;
		z-index: -1;
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
</style>
