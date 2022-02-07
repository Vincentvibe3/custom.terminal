<script context="module" lang="ts">
    import { RGB2HSV, RGBColor, contrast } from "../scripts/colorUtils"

    export class ColorButton{
        element:HTMLElement
        color:RGBColor
        id:string
        index:number

        constructor(index:number){
            this.index = index
            if (index==9){
                this.id = "Fg"
            } else if (index == 19){
                this.id = "Bg"
            } else {
                this.id = `Color_${index+1}`
            }
            
        }

        setColor(color:RGBColor){
            this.color = color
            this.setLabelColor()
        }

        setElementLabel(){
            this.element.innerHTML = this.id
            this.setLabelColor()
        }

        setLabelColor(){
            let contrastBlack = contrast(this.color, {r:0, g:0, b:0})
            let contrastWhite = contrast(this.color, {r:255, g:255, b:255})
            let labelColor = (contrastBlack>contrastWhite) ? "#161616" : "#ffffff"
            this.element.style.color = labelColor
        }

        setElementColor(){
            this.element.style.backgroundColor = `rgb(${this.color.r}, ${this.color.g}, ${this.color.b})`
        }
    }

    export let activeButton:ColorButton;
    export let buttons:ColorButton[] = [];
    let buttonCount = 20

    //one half theme
    let defaultColors = ["#383a42", "#e45649", "#50a14f", "#c18401", "#0184bc", "#a626a4", "#0997b3", "#fafafa", "#383a42", "#fafafa",
                        "#282c34", "#e06c75", "#98c379", "#e5c07b", "#61afef", "#c678dd", "#56b6c2", "#dcdfe4", "#dcdfe4", "#282c34"]

    for (let i=0; i<buttonCount; i++){
        buttons[i] = new ColorButton(i)
        buttons[i].color = HEX2RGB(defaultColors[i])
    }
    
</script>

<script lang="ts">
    import { onMount } from "svelte";
    import { HEX2RGB } from "../scripts/colorUtils";
    import { renderBorders } from "../scripts/rendering";

    activeButton = buttons[0]

    onMount(()=> {
        buttons.forEach(function(value){
            value.setElementColor()
            value.setElementLabel()
        })
        select(0)
    })


    function select(id:number){
        activeButton = buttons[id]
        buttons.forEach(function(value:ColorButton, key){
            if (key === id){
                renderBorders(value.element, RGB2HSV(value.color), "0.2rem")
            } else {
                renderBorders(value.element, RGB2HSV(value.color), "0.1rem")
            }
        })

    }

    function hover(id:number, entry:boolean){
        let button = buttons[id]
        let element = buttons[id].element
        if (entry){
            let contrastBlack = contrast(button.color, {r:0, g:0, b:0})
            let contrastWhite = contrast(button.color, {r:255, g:255, b:255})
            let filter = (contrastBlack>contrastWhite) ? "brightness(80%)" : "brightness(120%)"
            element.style.filter = filter
        } else {
            element.style.filter = "brightness(100%)"
        }
        
    }

</script>

<div class="container colors">
    {#each [...Array(buttonCount).keys()] as i}
        <button class="clrButton" id="button{i.toString()}" on:click={() => {select(i)}} on:mouseenter={() => {hover(i, true)}} on:mouseleave={() => {hover(i, false)}} bind:this="{buttons[i].element}"></button>
    {/each}
</div>

<style lang="scss">
    .colors {
        display: grid;
        padding: 1rem;
        grid-template-columns: repeat(10, 1fr);
        grid-template-rows: 1fr 1fr;
        gap: 0.5rem 0.5rem;

        .clrButton{
            margin: 0px;
            background-color: #fafafa;
            border: none;
            border-radius: 0.5rem;
            font-size: 0.7rem;
            font-weight: 500;
        }

    }
</style>