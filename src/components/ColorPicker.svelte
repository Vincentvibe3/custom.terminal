<script lang="ts">
	import { onMount } from 'svelte'
	import ControlThumb from './ControlThumb.svelte';
	import type { Thumb } from './ControlThumb.svelte'
	import { activeButton, buttons, ColorButton } from './Colors.svelte'
	import { RGB2HEX, RGB2HSV, HSV2RGB, HEX2HSV } from '../scripts/colorUtils';
	import { renderBorders, renderColor } from '../scripts/rendering';

	let canvas:HTMLCanvasElement;
	let slider:HTMLInputElement;

	let sliderThumb:Thumb;
	let canvasThumb:Thumb;

	let valueDisplay:HTMLInputElement
	let currentColorDisplay:HTMLElement
	let previousActive:ColorButton

	let isDrawingSlider = false;
	let isDrawing = false;

	let containers = document.getElementsByClassName("container") as HTMLCollectionOf<HTMLElement>

	export let currentColor = {
		h:0, s:1, v:1
	}

	let currentColorRGB = HSV2RGB(currentColor);
	let currentColorHEX = RGB2HEX(currentColorRGB);

	interface Coords {
		x:number,
		y:number
	}

	onMount(() => {
		previousActive = activeButton
		// slider.style.width = `${canvas.clientWidth}px`
		canvas.height = canvas.clientHeight
		canvas.width = canvas.clientWidth
		currentColor = RGB2HSV(activeButton.color)
		drawColorPicker(canvas, currentColor.h)
		updateCanvasThumb()
		updateSliderThumb()
		displayValues()
		let tempColor = currentColor
		currentColor = RGB2HSV(buttons[buttons.length-1].color)
		currentColorRGB = HSV2RGB(currentColor)
		currentColorHEX = RGB2HEX(currentColorRGB)
		updateContainers()
		renderColor("bg", currentColor)
		renderColor("bg_alt", currentColor)
		currentColor = tempColor
	})

	function displayValues(){
		currentColorRGB = HSV2RGB(currentColor)
		currentColorHEX = RGB2HEX(currentColorRGB)
		valueDisplay.value = currentColorHEX
		currentColorDisplay.style.backgroundColor = currentColorHEX
		renderBorders(currentColorDisplay, currentColor, "0.1rem")
		activeButton.element.style.backgroundColor = currentColorHEX
		activeButton.setColor(currentColorRGB)
		if (activeButton.id==="Bg"){
			updateContainers()
			renderColor("bg", currentColor)
			renderColor("bg_alt", currentColor)
		}
		
		renderBorders(activeButton.element, currentColor, "0.2rem")
		
	}

	function updateContainers(){
		for (let i=0; i<containers.length; i++){
			let element = containers[i]
			element.style.backgroundColor = currentColorHEX
			renderBorders(element, currentColor, "0.1rem")
		}
		document.body.style.backgroundColor = currentColorHEX
		renderBorders(document.getElementsByTagName("header")[0], currentColor, "0.1rem")
		renderBorders(canvas, currentColor, "0.1rem")
		renderBorders(slider, currentColor, "0.1rem")
	}

	function updateCurrentColor(coords:Coords){
		currentColor.s = coords.x/canvas.clientWidth
		currentColor.v = (canvas.clientHeight-coords.y)/canvas.clientHeight
	}

	function getPosition(rawx:number, rawy:number, parent:HTMLElement):Coords{
		let boundingRect = parent.getBoundingClientRect()
		let initX = boundingRect.left
		let initY = boundingRect.top
		let width = parent.clientWidth
		let height = parent.clientHeight
		let x = Math.round((rawx-initX)/width*width)
		let y = Math.round((rawy-initY)/height*height)
		if (x >= width){
			x = width
		} else if (x <= 0){
			x = 0
		}
		if (y>= height){
			y = height
		} else if (y <= 0){
			y = 0
		}
		return {x:x, y:y}
	}

	function inputChange(e:Event){
		let target = e.target as HTMLInputElement
		currentColor = HEX2HSV(target.value)
		drawColorPicker(canvas, currentColor.h)
		updateCanvasThumb()
		updateSliderThumb()
		displayValues()
	}

	function drawColorPicker(canvas:HTMLCanvasElement, hue:number) {
		let clrCtx = canvas.getContext("2d");
		let gradient = clrCtx.createLinearGradient(0, 0, canvas.width, 0);
		gradient.addColorStop(0, "white");
		gradient.addColorStop(1, `hsl(${hue}, 100%, 50%)`);
		clrCtx.fillStyle = gradient;
		clrCtx.fillRect(0, 0, canvas.width, canvas.height);
		gradient = clrCtx.createLinearGradient(0, 0, 0, canvas.height);
		gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
		gradient.addColorStop(1, 'rgba(0, 0, 0, 1)');
		clrCtx.fillStyle = gradient;
		clrCtx.fillRect(0, 0, canvas.width, canvas.height);
	}

	window.addEventListener('mousemove', e => {
		if (activeButton.id !== previousActive.id){
			currentColor = RGB2HSV(activeButton.color)
			drawColorPicker(canvas, currentColor.h)
			updateCanvasThumb()
			updateSliderThumb()
			displayValues()
			previousActive = activeButton
		}
		if (isDrawing === true) {
			handleCanvasUpdate(e)
		}  else if (isDrawingSlider===true){
			let coords = getPosition(e.pageX, e.pageY, slider)
    		currentColor.h = (coords.x)/slider.clientWidth*360
    		slider.value = String(currentColor.h)
			handleSliderUpdate(e)
		}
	});

	window.addEventListener('mouseup', e => {
		if (isDrawing === true) {
			handleCanvasUpdate(e)
			isDrawing = false
		} else if (isDrawingSlider === true){
			handleSliderUpdate(e)
			isDrawingSlider = false
		}
	});

	window.addEventListener('resize', _ => {
		updateCanvasThumb()
		updateSliderThumb()
		displayValues()
	})

	function updateSliderThumb(){
		sliderThumb.updateThumbColor({h:currentColor.h, s:1, v:1})
		sliderThumb.moveThumbX(currentColor.h/360, slider)
	}

	function updateCanvasThumb(){
		canvasThumb.updateThumbColor(currentColor)
		canvasThumb.moveThumbX(currentColor.s, canvas)
		canvasThumb.moveThumbY(currentColor.v, canvas)
		renderBorders(canvasThumb.thumbElement, currentColor, "0.1rem")
	}

	function handleCanvasUpdate(event:any){
		let coords = getPosition(event.pageX, event.pageY-window.scrollY, canvas)
		updateCurrentColor(coords)
		updateCanvasThumb()
		displayValues()
		isDrawing = true
	}

	function handleSliderUpdate(event:any){
		drawColorPicker(canvas, currentColor.h)
		updateCanvasThumb()
		updateSliderThumb()
		displayValues()
		if (event.type == "mousedown"){
			isDrawingSlider= true
		}
	}

</script>

<div class="container clrPicker">
	<div class="clrPickerDisplay">
		<canvas class="clrPickerCanvas" bind:this={canvas} on:mousedown={handleCanvasUpdate}></canvas>
		<ControlThumb bind:thumb={canvasThumb} on:mousedown={handleCanvasUpdate}></ControlThumb>
	</div>
	
	<div class="slider">
		<input class="hueSlider" type="range" min="0" max="360" bind:this={slider} bind:value={currentColor.h} on:input={handleSliderUpdate}>
		<ControlThumb bind:thumb={sliderThumb} on:mousedown={handleSliderUpdate}></ControlThumb>
	</div>
	<div class="infoDisplay">
		<div class="colorDisplay" bind:this={currentColorDisplay}></div>
		<input class="colorValue container" bind:this={valueDisplay} on:change={inputChange}>
	</div>
</div>

<style lang="scss">

	.clrPicker{
		height: -moz-fit-content;
		height: fit-content;
		box-sizing: border-box;
		padding: 1rem;
		display: grid;
		grid-template-rows: auto auto auto;
		place-items: center;
		row-gap: 1rem;

		.clrPickerDisplay {
			position: relative;
			display: flex;
			min-height: 15rem;
			width: 100%;
			height: 100%;

			.clrPickerCanvas {
				width: 100%;
				height: 100%;
				border-radius: 0.5rem;
			}
		}

		
		.slider {
			width: 100%;
			position:relative;
			display: flex;
			flex-direction: row;
			align-items: center;

			.hueSlider {
				width: 100%;
				-webkit-appearance: none;
				height: 1rem;
				grid-row-start: 2;
				grid-row-end: 3;
				padding: 0px;
				margin: 0;
				background: -webkit-linear-gradient(left, rgb(255, 0, 0), rgb(255, 255, 0), rgb(0, 255, 0), rgb(0, 255, 255), rgb(0, 0, 255), rgb(255, 0, 255), rgb(255, 0, 0));
				outline: none;
				border: none;
				border-radius: 0.4rem;
			}

			.hueSlider::-webkit-slider-thumb {
				-webkit-appearance: none; 
				width: 1px;
				height: 1px;
				appearance: none; 
				opacity: 0;
				background: none; 
			}

			.hueSlider::-moz-range-thumb {
				background: none; 
				opacity: 0;
			}

		}

		.infoDisplay {
			position: relative;
			width: 100%;
			display:flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			color: white;

			.colorDisplay {
				width: 3rem;
				height: 2rem;
				background-color: white;
				border-radius: 0.5rem;
				box-shadow: 0rem 0rem 2rem #00000050;
			}

			.colorValue {
				width: 100%;
				padding: 0.5rem;
				color:white;
				margin: 0rem 0rem 0rem 1rem;
			}

		}
		
	} 

</style>