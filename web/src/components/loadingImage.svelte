<script lang="ts">
	let {
		src,
		alt = '',
		loading = 'lazy',
		fill = false,
		class: className = ''
	}: {
		src: string;
		alt?: string | null;
		loading?: 'lazy' | 'eager';
		fill?: boolean;
		class?: string;
	} = $props();

	let loaded = $state(false);
	let imgEl: HTMLImageElement | undefined = $state();

	$effect(() => {
		src;
		loaded = false;
	});

	$effect(() => {
		if (imgEl?.complete && imgEl.naturalWidth > 0) {
			loaded = true;
		}
	});

	function markLoaded() {
		loaded = true;
	}
</script>

<span class="loadingImage {className}" class:loaded class:fill>
	<span class="shimmer" aria-hidden="true"></span>
	<img bind:this={imgEl} {src} alt={alt ?? ''} {loading} onload={markLoaded} onerror={markLoaded} />
</span>

<style>
	.loadingImage {
		position: relative;
		display: block;
		overflow: hidden;
		background: #e8e8e8;
	}

	.loadingImage.fill {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}

	.loadingImage:not(.fill) {
		width: 100%;
	}

	.loadingImage:not(.fill):not(.loaded) {
		aspect-ratio: var(--loader-aspect, 4 / 3);
	}

	.shimmer {
		position: absolute;
		inset: 0;
		z-index: 1;
		background: linear-gradient(110deg, #e8e8e8 25%, #f4f4f4 40%, #e8e8e8 55%);
		background-size: 200% 100%;
		animation: shimmer 1.2s ease-in-out infinite;
		opacity: 1;
		transition: opacity 320ms ease;
		pointer-events: none;
	}

	.loadingImage.loaded {
		background: transparent;
		transition: background-color 0s linear 320ms;
	}

	.loadingImage.loaded .shimmer {
		opacity: 0;
	}

	img {
		display: block;
		width: 100%;
		height: auto;
		opacity: 0;
		transition: opacity 320ms ease;
	}

	.loadingImage.fill img {
		height: 100%;
		object-fit: cover;
		object-position: center center;
	}

	.loadingImage.loaded img {
		opacity: 1;
	}

	@keyframes shimmer {
		0% {
			background-position: 100% 0;
		}
		100% {
			background-position: -100% 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.shimmer {
			animation: none;
		}

		img {
			transition: none;
		}
	}
</style>
