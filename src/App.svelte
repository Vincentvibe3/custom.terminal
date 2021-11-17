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
		position: absolute;
		display: grid;
		grid-template-columns: minmax(20rem,0.8fr) minmax(450px, 4fr);
		grid-template-rows: 1fr 6rem;
		grid-template-areas: 
			"tools viewer"
			// ". viewer"  
			"colors colors";
		box-sizing: border-box;
		padding: 1rem;
		left: 50%;
		width: 100%;
		transform: translateX(-50%);
		height: calc(100% - 3rem);
		gap: 2rem 2rem;
		overflow: auto;

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