<script lang="ts">
	import { onMount } from 'svelte'
	import ControlThumb from './controlThumb.svelte';
	import type { Thumb } from './controlThumb.svelte'
	import { activeButton, ColorButton } from './Colors.svelte'
	import { RGB2HSV, RGBColor } from '../scripts/colorConversion';
	import { HSV2RGB } from '../scripts/colorConversion';

	let canvas:HTMLCanvasElement;
	let slider:HTMLInputElement;

	let sliderThumb:Thumb;
	let canvasThumb:Thumb;

	let valueDisplay:HTMLElement
	let currentColorDisplay:HTMLElement
	let previousActive:ColorButton

	let isDrawingSlider = false;
	let isDrawing = false;

	export let currentColor = {
		h:0, s:1, v:1
	}

	interface Coords {
		x:number,
		y:number
	}

	onMount(() => {
		previousActive = activeButton
		slider.style.width = `${canvas.clientWidth}px`
		canvas.style.height = `${canvas.clientWidth}px`
		canvas.height = canvas.clientHeight
		canvas.width = canvas.clientWidth
		currentColor = RGB2HSV(activeButton.color)
		drawColorPicker(canvas, currentColor.h)
		updateCanvasThumb()
		updateSliderThumb()
		displayValues(HSV2RGB(currentColor))
	})

	function setZeros(text:string):string{
		let length = text.length
		let zeros = ""
		for (let amount = 2-length; amount>0; amount--){
			zeros+="0"
		}
		return zeros+text
	}

	function displayValues(color:RGBColor){
		let r = setZeros(Math.round(color.r).toString(16))
		let g = setZeros(Math.round(color.g).toString(16))
		let b = setZeros(Math.round(color.b).toString(16))
		valueDisplay.textContent = `#${r}${g}${b}`
		currentColorDisplay.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`
		activeButton.element.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`
	}

	function updateCurrentColor(coords:Coords){
		currentColor.s = coords.x/canvas.width
		currentColor.v = (canvas.height-coords.y)/canvas.height
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
			displayValues(HSV2RGB(currentColor))
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
		if (isDrawing||isDrawingSlider){
			displayValues(HSV2RGB(currentColor))
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
		displayValues(HSV2RGB(currentColor))
	});

	function updateSliderThumb(){
		sliderThumb.updateThumbColor({h:currentColor.h, s:1, v:1})
		sliderThumb.moveThumbX(currentColor.h/360, slider)
	}

	function updateCanvasThumb(){
		canvasThumb.updateThumbColor(currentColor)
		canvasThumb.moveThumbX(currentColor.s, canvas)
		canvasThumb.moveThumbY(currentColor.v, canvas)
	}

	function handleCanvasUpdate(event:any){
		let coords = getPosition(event.pageX, event.pageY, canvas)
		updateCurrentColor(coords)
		updateCanvasThumb()
		isDrawing = true
	}

	function handleSliderUpdate(event:any){
		drawColorPicker(canvas, currentColor.h)
		updateCanvasThumb()
		updateSliderThumb()
		isDrawingSlider= true
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
		<p class="colorValue" bind:this={valueDisplay}>#FF0000</p>
	</div>
</div>

<style lang="scss">

	.clrPicker{
		padding: 1rem;
		display: grid;
		grid-template-rows: auto auto auto;
		place-items: center;
		row-gap: 1rem;

		.clrPickerDisplay {
			position: relative;
			display: flex;

			.clrPickerCanvas {
				border-radius: 0.5rem;
			}
		}

		
		.slider {
			position:relative;
			display: flex;
			flex-direction: row;
			align-items: center;

			.hueSlider {
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
			justify-self: left;
			display:flex;
			flex-direction: row;
			align-items: center;
			color: white;

			.colorDisplay {
				width: 2rem;
				height: 2rem;
				background-color: white;
				border: white 0.15rem solid;
				border-radius: 0.5rem;
				box-shadow: 0rem 0rem 2rem #00000050;
			}

			.colorValue {
				margin-left: 1rem;
			}

		}
		
	} 

</style>