<script>
	import { fade } from 'svelte/transition';
	import Banner from '$img/homePageBanner.jpg';
</script>

<svelte:head><title>Home | Brenda Bennett Art</title></svelte:head>

<div in:fade>
	<div class="banner">
		<img src={Banner} alt="Brenda Bennett Art Banner" />
	</div>
	<div class="container" in:fade>
		<p>Welcome to the online gallery for artwork by Brenda Bennett.</p>
	</div>
</div>

<style>
	.banner {
		max-width: 100vw;
		margin-bottom: 40px;
		img {
			width: 100%;
			height: auto;
		}
	}
</style>
