<script context="module" lang="ts">
    import type { RGBColor } from "../scripts/colorConversion";
    export class ColorButton{
        element:HTMLElement
        color:RGBColor
        id:string

        constructor(index:number){
            this.id = `color${index}`
        }

        setElementColor(){
            this.element.style.backgroundColor = `rgb(${this.color.r}, ${this.color.g}, ${this.color.b})`
        }
    }
    export let activeButton:ColorButton;
    
</script>

<script lang="ts">
    import { onMount } from "svelte";
    import { HEX2RGB } from "../scripts/colorConversion"

    let buttonCount = 20

    export let buttons = [];

    //one half theme
    let defaultColors = ["#383a42", "#e45649", "#50a14f", "#c18401", "#0184bc", "#a626a4", "#0997b3", "#fafafa", "#383a42", "#fafafa",
                        "#282c34", "#e06c75", "#98c379", "#e5c07b", "#61afef", "#c678dd", "#56b6c2", "#dcdfe4", "#dcdfe4", "#282c34"]

    for (let i=0; i<buttonCount; i++){
        buttons[i] = new ColorButton(i)
        buttons[i].color = HEX2RGB(defaultColors[i])
    }

    activeButton = buttons[0]

    onMount(()=> {
        buttons.forEach(function(value){
            value.setElementColor()
        })
        select(0)
    })


    function select(id:number){
        activeButton = buttons[id]
        let activeStyle = "white 0.2rem solid"
        let inactiveStyle = "none"
        buttons.forEach(function(value:ColorButton, key){
            if (key === id){
                activeButton.element.style.border = activeStyle
            } else {
                value.element.style.border = inactiveStyle
            }
        })

    }

    function hover(id:number, entry:boolean){
        let button = buttons[id].element
        console.log(button)
        if (entry){
            button.style.filter = "brightness(50%)"
        } else {
            button.style.filter = "brightness(100%)"
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

        .clrButton{
            background-color: #fafafa;
            border: none;
            border-radius: 0.5rem;
        }

    }
</style>