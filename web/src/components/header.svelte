<script lang="ts">
	import Logo from '$img/bbalogo.png';
	import Nav from '$components/nav.svelte';

	let { ArtPages, ArtistPages } = $props();
</script>

<header>
	<div class="headerContainer">
		<div class="logoContainer">
			<a href="/"><img src={Logo} alt="Brenda Bennett Art Logo" /></a>
		</div>
		<div class="taglineContainer"><p class="tagline">Painting with Paper</p></div>
	</div>
	<Nav {ArtPages} {ArtistPages} />
</header>

<style>
	.headerContainer {
		display: grid;
		grid-template-columns: clamp(90px, 25%, 250px) 1fr;
		align-items: center;
		justify-content: space-between;
		max-width: 1280px;
		margin: 0 auto;
		padding: 30px 20px;
	}
	.tagline {
		font-size: clamp(20px, 5.5vw, 65px);
		font-weight: 500;
		color: #333;
		margin: 0;
		text-align: right;
	}
	.logoContainer {
		img {
			width: 100%;
		}
	}
</style>
