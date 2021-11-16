<script lang="ts">
	import Colors from './components/Colors.svelte';
    import ColorPicker from './components/ColorPicker.svelte';
	import Header from './components/Header.svelte';
	import Preview from './components/Preview.svelte';
	

</script>

<Header></Header>
<main>
    <ColorPicker></ColorPicker>
	<Preview></Preview>
	<Colors></Colors>
</main>

<style lang="scss" global>

    @import './scss/variables';

	main {
		display: grid;
		grid-template-columns: 0.8fr minmax(450px, 4fr);
		grid-template-rows: 0.5fr 0.5fr 8rem;
		grid-template-areas: 
			"tools viewer"
			". viewer"  
			". colors";
		box-sizing: border-box;
		padding: 1.5rem;
		width: 100%;
		height: 100%;
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