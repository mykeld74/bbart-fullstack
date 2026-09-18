<script lang="ts">
	import { PortableText, type InputValue } from '@portabletext/svelte';
	import { stegaClean } from '@sanity/sveltekit';
	import { getImageSrc } from '$lib/cloudinaryFetch';
	import LoadingImage from '$components/loadingImage.svelte';

	type SanityImage = {
		alt?: string | null;
		asset?: {
			url?: string | null;
			metadata?: { dimensions?: { aspectRatio?: number | null } | null } | null;
		} | null;
		secure_url?: string | null;
		url?: string | null;
	};

	type TextBlock = {
		_key: string;
		_type: 'textBlock';
		body?: InputValue | null;
		width?: string | null;
		align?: string | null;
	};

	type ImageWithCaption = {
		_key: string;
		_type: 'imageWithCaption';
		image?: SanityImage | null;
		caption?: string | null;
		width?: string | null;
	};

	type ImagePair = {
		_key: string;
		_type: 'imagePair';
		leftImage?: SanityImage | null;
		rightImage?: SanityImage | null;
		ratio?: string | null;
	};

	type SplitContent = {
		_key: string;
		_type: 'splitContent';
		layout?: string | null;
		leftImage?: SanityImage | null;
		leftCaption?: string | null;
		body?: InputValue | null;
		rightImage?: SanityImage | null;
		rightCaption?: string | null;
	};

	type PageBuilderBlock = TextBlock | ImageWithCaption | ImagePair | SplitContent;

	let { blocks = [] }: { blocks?: PageBuilderBlock[] | null } = $props();

	/** Equal column width → average image heights = harmonic mean of aspect ratios. */
	function sharedAspectRatio(
		leftAr?: number | null,
		rightAr?: number | null
	): number | undefined {
		if (!leftAr || !rightAr || leftAr <= 0 || rightAr <= 0) return undefined;
		return 2 / (1 / leftAr + 1 / rightAr);
	}

	function aspectOf(image?: SanityImage | null) {
		return image?.asset?.metadata?.dimensions?.aspectRatio;
	}
</script>

{#each blocks ?? [] as block (block._key)}
	{#if block._type === 'textBlock'}
		{@const width = stegaClean(block.width)}
		{@const align = stegaClean(block.align)}
		<div class="textBlock" class:narrow={width === 'narrow'} class:center={align === 'center'}>
			{#if block.body}
				<PortableText value={block.body} />
			{/if}
		</div>
	{:else if block._type === 'imageWithCaption'}
		{@const width = stegaClean(block.width) || 'medium'}
		<div
			class="imageWithCaption scrollFade"
			class:narrow={width === 'narrow'}
			class:medium={width === 'medium'}
			class:full={width === 'full'}
		>
			{#if block.image}
				<LoadingImage
					src={getImageSrc(block.image, 'f_auto,q_auto,w_800')}
					alt={block.image.alt || block.caption || ''}
				/>
			{/if}
			{#if block.caption}
				<p class="caption">{block.caption}</p>
			{/if}
		</div>
	{:else if block._type === 'imagePair'}
		{@const ratio = stegaClean(block.ratio)}
		{@const pairAspect = sharedAspectRatio(aspectOf(block.leftImage), aspectOf(block.rightImage))}
		<div
			class="imagePair"
			class:wideLeft={ratio === 'wideLeft'}
			class:wideRight={ratio === 'wideRight'}
			style={pairAspect ? `--shared-aspect: ${pairAspect}` : undefined}
		>
			{#if block.leftImage}
				<div class="imgContainer scrollFade">
					<LoadingImage
						src={getImageSrc(block.leftImage, 'f_auto,q_auto,w_700')}
						alt={block.leftImage.alt || ''}
					/>
				</div>
			{/if}
			{#if block.rightImage}
				<div class="imgContainer scrollFade">
					<LoadingImage
						src={getImageSrc(block.rightImage, 'f_auto,q_auto,w_700')}
						alt={block.rightImage.alt || ''}
					/>
				</div>
			{/if}
		</div>
	{:else if block._type === 'splitContent'}
		{@const layout = stegaClean(block.layout) || 'both'}
		{@const splitAspect =
			layout === 'both'
				? sharedAspectRatio(aspectOf(block.leftImage), aspectOf(block.rightImage))
				: undefined}
		<div
			class="splitContent"
			class:both={layout === 'both'}
			class:left={layout === 'left'}
			class:right={layout === 'right'}
			style={splitAspect ? `--shared-aspect: ${splitAspect}` : undefined}
		>
			{#if layout !== 'right' && block.leftImage}
				<div class="imgContainer scrollFade">
					<LoadingImage
						src={getImageSrc(block.leftImage, 'f_auto,q_auto,w_500')}
						alt={block.leftImage.alt || block.leftCaption || ''}
					/>
					{#if block.leftCaption}
						<p class="caption">{block.leftCaption}</p>
					{/if}
				</div>
			{/if}

			<div class="splitText">
				{#if block.body}
					<PortableText value={block.body} />
				{/if}
			</div>

			{#if layout !== 'left' && block.rightImage}
				<div class="imgContainer scrollFade">
					<LoadingImage
						src={getImageSrc(block.rightImage, 'f_auto,q_auto,w_500')}
						alt={block.rightImage.alt || block.rightCaption || ''}
					/>
					{#if block.rightCaption}
						<p class="caption">{block.rightCaption}</p>
					{/if}
				</div>
			{/if}
		</div>
	{/if}
{/each}

<style>
	.caption {
		font-size: 14px;
		color: var(--primaryColor);
		margin: 8px 0 0;
	}

	.textBlock {
		margin: 1.25rem 0;
	}

	.textBlock.narrow {
		max-width: 42rem;
	}

	.textBlock.center {
		text-align: center;
		margin-inline: auto;
	}

	.textBlock :global(p) {
		margin: 0 0 1rem;
	}

	.textBlock :global(p:last-child) {
		margin-bottom: 0;
	}

	.textBlock :global(a) {
		color: var(--primaryColor);
	}

	.imageWithCaption {
		margin: 1.5rem 0;
	}

	.imageWithCaption.narrow {
		max-width: 320px;
	}

	.imageWithCaption.medium {
		max-width: 560px;
	}

	.imageWithCaption.full {
		max-width: none;
	}

	.imagePair {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 30px;
		margin: 1.5rem 0;
		align-items: stretch;
	}

	.imagePair.wideLeft {
		grid-template-columns: 2fr 1fr;
	}

	.imagePair.wideRight {
		grid-template-columns: 1fr 2fr;
	}

	/* Equal-height frames; object-position bottom crops overflow from the top */
	.imagePair .imgContainer {
		aspect-ratio: var(--shared-aspect, 2 / 1);
		overflow: hidden;
		--loader-aspect: var(--shared-aspect, 2 / 1);
	}

	.imagePair .imgContainer :global(.loadingImage) {
		height: 100%;
	}

	.imagePair .imgContainer :global(img) {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center bottom;
	}

	@media (max-width: 600px) {
		.imagePair,
		.imagePair.wideLeft,
		.imagePair.wideRight {
			grid-template-columns: 1fr;
		}

		.imagePair .imgContainer {
			aspect-ratio: auto;
		}

		.imagePair .imgContainer :global(img) {
			height: auto;
			object-fit: contain;
		}
	}

	.splitContent {
		display: grid;
		gap: 30px;
		margin: 1.5rem 0;
		align-items: start;
	}

	.splitContent.both {
		grid-template-columns: 1fr 3fr 1fr;
	}

	.splitContent.left,
	.splitContent.right {
		grid-template-columns: 1fr 2fr;
	}

	.splitContent.right {
		grid-template-columns: 2fr 1fr;
	}

	/* Match side image heights (average of the two); crop taller from the top */
	.splitContent.both .imgContainer :global(.loadingImage) {
		aspect-ratio: var(--shared-aspect, 1);
		overflow: hidden;
		--loader-aspect: var(--shared-aspect, 1);
	}

	.splitContent.both .imgContainer :global(img) {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center bottom;
	}

	.splitContent .splitText :global(p) {
		margin: 0;
	}

	.splitContent .splitText :global(a) {
		color: var(--primaryColor);
	}

	@media (max-width: 900px) {
		.splitContent.both {
			grid-template-columns: 1fr 2fr;
		}
	}

	@media (max-width: 600px) {
		.splitContent.both,
		.splitContent.left,
		.splitContent.right {
			grid-template-columns: 1fr;
		}

		.splitContent.both .imgContainer :global(.loadingImage) {
			aspect-ratio: auto;
		}

		.splitContent.both .imgContainer :global(img) {
			height: auto;
			object-fit: contain;
		}
	}
</style>
