<script lang="ts">
    import ColorPicker from './components/ColorPicker.svelte';
	import Colors from './components/Colors.svelte';
	import Footer from './components/Footer.svelte';
	import Preview from './components/Preview.svelte';

</script>

<main>
    <ColorPicker></ColorPicker>
	<Preview></Preview>
	<Colors></Colors>
</main>
<Footer></Footer>

<style lang="scss" global>

    @import './scss/variables';

	main {
		display: grid;
		grid-template-columns: 0.8fr minmax(450px, 4fr);
		grid-template-rows: 2fr 1fr 8rem;
		grid-template-areas: "tools viewer" ". viewer" ". colors";
		grid-area: main;
		margin: 3rem;
		width: calc(100% - 3rem);
		height: calc(100% - 3rem);
		gap: 2rem 2rem;

		.clrPicker {
			grid-area: tools;
		}

		.preview {
			grid-area: viewer;
		}

		.colors{
			grid-area: colors;
		}

	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>