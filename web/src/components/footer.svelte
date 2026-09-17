<script>
	import etsy from '$img/etsy-icon.png';
	import facebook from '$img/facebook-icon.png';
	import instagram from '$img/instagram-icon.png';
	import pinterest from '$img/pinterest-icon.png';
</script>

<footer>
	<div class="socialContainer">
		<a href="https://www.etsy.com/shop/BrendaBennettArt" target="_blank" rel="noopener noreferrer"
			><img src={etsy} alt="Etsy Icon" /></a
		>
		<a
			href="https://www.instagram.com/brenda.bennett.art/"
			target="_blank"
			rel="noopener noreferrer"><img src={instagram} alt="Instagram Icon" /></a
		>

		<a href="https://www.pinterest.com/brendabennettart/" target="_blank" rel="noopener noreferrer"
			><img src={pinterest} alt="Pinterest Icon" /></a
		>
		<a href="https://www.facebook.com/BrendaBennettArt" target="_blank" rel="noopener noreferrer"
			><img src={facebook} alt="Facebook Icon" /></a
		>
	</div>
</footer>

<style>
	footer {
		width: 100%;
		border-top: 1px solid #ccc;
		padding: 20px 0;
	}
	.socialContainer {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 20px;
		width: calc(100% - 40px);
		max-width: 400px;
		margin: auto;
	}
</style>
