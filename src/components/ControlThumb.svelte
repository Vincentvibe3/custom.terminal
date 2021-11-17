<script context='module' lang="ts">

    import {HSVColor, HSV2RGB} from "../scripts/colorUtils"

    export class Thumb {

        thumbElement:HTMLElement;
        xTranslate = 0
        yTranslate = 0

        moveThumbX(val:number, parent:HTMLElement){
            //val is percentage described as a decimal value
            this.xTranslate = (val*parent.clientWidth)-this.thumbElement.clientWidth/2
            this.thumbElement.style.transform = `translate(${this.xTranslate}px, ${this.yTranslate}px)`
        }

        moveThumbY(val:number, parent:HTMLElement){        
            this.yTranslate = parent.clientHeight-(val*parent.clientHeight)-this.thumbElement.clientHeight/2
            this.thumbElement.style.transform = `translate(${this.xTranslate}px, ${this.yTranslate}px)`
        }

        updateThumbColor = function(color:HSVColor){
            let rgbColor = HSV2RGB(color)
            this.thumbElement.style.background = `rgb(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b})`
        }
    }
</script>

<script lang="ts">
    export let thumb = new Thumb();
</script>

<div class="controlThumb" bind:this={thumb.thumbElement} on:mousedown></div>

<style lang="scss">

    .controlThumb {
        position: absolute;
        left: 0%;
        transform: translateX(-50%);
        width: 0.5rem;
        height: 0.5rem;
        border: white 0.2rem solid;
        border-radius: 5rem;
        cursor: pointer;
    }

</style>