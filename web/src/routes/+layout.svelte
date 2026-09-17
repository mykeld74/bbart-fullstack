<script lang="ts">
	import '$css/style.css';
	import Header from '$components/header.svelte';
	import Footer from '$components/footer.svelte';

	let { data, children } = $props();
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Special+Elite&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<Header ArtPages={data.ArtPages} ArtistPages={data.ArtistPages} />
{@render children()}
<Footer />
