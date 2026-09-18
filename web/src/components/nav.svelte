<script lang="ts">
	import { slide } from 'svelte/transition';

	let { ArtPages, ArtistPages } = $props();

	let openCollect = $state(false);
	let openExperience = $state(false);
	let openArtists = $state(false);
	let showOverlay = $state(false);

	const handleClicks = (buttonType: string) => {
		if (buttonType === 'collect') {
			openCollect = !openCollect;
			showOverlay = true;
			openExperience = false;
			openArtists = false;
		} else if (buttonType === 'experience') {
			openExperience = !openExperience;
			showOverlay = true;
			openCollect = false;
			openArtists = false;
		} else if (buttonType === 'artist') {
			openArtists = !openArtists;
			showOverlay = true;
			openCollect = false;
			openExperience = false;
		}
	};

	const closeMenus = () => {
		openCollect = false;
		openExperience = false;
		openArtists = false;
		showOverlay = false;
	};
</script>

<div
	class={showOverlay ? 'navOverlay show' : 'navOverlay'}
	role="presentation"
	onclick={closeMenus}
></div>
<nav>
	<div id="navBar">
		<div class="navSection">
			<div class="buttonContainer">
				<button class="navButton" onclick={() => handleClicks('collect')}>Collect Art</button>
			</div>
			{#if openCollect}
				<div
					class="pages"
					role="presentation"
					transition:slide
					onclick={() => {
						openCollect = false;
						showOverlay = false;
					}}
				>
					<a href="/fine-art-prints"><p>Prints</p></a>
					<a href="/original-artwork"><p>Original Artwork</p></a>
					<a href="/commissions"><p>Commissions</p></a>
				</div>
			{/if}
		</div>
		<div class="navSection">
			<div class="buttonContainer">
				<button class="navButton" onclick={() => handleClicks('experience')}
					>Experience Art</button
				>
			</div>
			{#if openExperience}
				<div
					class="pages"
					role="presentation"
					transition:slide
					onclick={() => {
						openExperience = false;
						showOverlay = false;
					}}
				>
					{#each ArtPages as artPage}
						<a href="/{artPage.slug.current}"><p>{artPage.navTitle}</p></a>
					{/each}
				</div>
			{/if}
		</div>
		<div class="navSection">
			<div class="buttonContainer artist">
				<button class="navButton" onclick={() => handleClicks('artist')}>Meet the Artist</button>
			</div>
			{#if openArtists}
				<div
					class="pages"
					role="presentation"
					transition:slide
					onclick={() => {
						openArtists = false;
						showOverlay = false;
					}}
				>
					{#each ArtistPages as artistPage}
						<a href="/{artistPage.slug.current}"><p>{artistPage.navTitle}</p></a>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</nav>

<style>
	nav {
		width: calc(100% - 40px);
		max-width: 1280px;
		margin: 0 auto 20px;
		text-align: center;
		container: navBar / inline-size;
	}
	#navBar {
		display: grid;
		grid-template-columns: var(--navTemplateColumns);
		align-items: center;
		width: 100%;
		max-width: 540px;
	}

	.buttonContainer {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 40px;
		border-right: 1px solid #333;

		&.artist {
			border-right: none;
		}
	}
	.navButton {
		background: none;
		border: none;
		font-size: 16px;
		font-weight: 700;
		padding: 0;
		width: 100%;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		line-height: 1;
	}

	.navSection {
		position: relative;
		height: 40px;
	}
	.pages {
		position: absolute;
		top: 100%;
		left: 0;
		width: 100%;
		background: #fff;
		z-index: 200;

		a {
			text-decoration: none;

			p {
				font-weight: 700;
				color: #000;
				cursor: pointer;
				text-align: center;
				font-size: 16px;
				margin: 0;
				padding: 8px 0;
			}
		}
	}
	.navOverlay.show {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: transparent;
	}
	.navOverlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 0px;
		height: 0px;
	}
</style>
