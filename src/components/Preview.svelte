<script lang="ts">
    import Tab from './Tab.svelte';
    import { buttons, ColorButton } from './Colors.svelte'
    import { onMount } from 'svelte';
    import { renderColor } from '../scripts/rendering';
    import { contrast, HEX2RGB, RGB2HSV } from '../scripts/colorUtils';

    let copyButton:HTMLButtonElement

    function focusEditor(e:Event){
        (e.target as HTMLElement).focus()
    }

    onMount(()=>{
        for (let button of buttons){
            renderColor(button.id, RGB2HSV(button.color))
            if (button.id==="Bg"){
			    renderColor("Bg_alt", RGB2HSV(button.color))
		    }
        }
    })

    function hover(entry:boolean){
        if (entry){
            let colorString = copyButton.style.backgroundColor.replaceAll("rgb(", "").replaceAll(")", "").split(",")
            let contrastBlack = contrast({r:parseInt(colorString[0]), g:parseInt(colorString[1]), b:parseInt(colorString[2])}, {r:0, g:0, b:0})
            let contrastWhite = contrast({r:parseInt(colorString[0]), g:parseInt(colorString[1]), b:parseInt(colorString[2])}, {r:255, g:255, b:255})
            let filter = (contrastBlack>contrastWhite) ? "brightness(70%)" : "brightness(120%)"
            copyButton.style.filter = filter
        } else {
            copyButton.style.filter = "brightness(100%)"
        }
        
    }

    function copy2Clipboard(){
        navigator.clipboard.writeText(window.location.href);
    }
</script>

<div class="container preview">
    <div class="tabs Bg_alt">
        <Tab name="Terminal"></Tab>
        <button class="copy Bg" bind:this={copyButton} on:click={copy2Clipboard} on:mouseleave={() => {hover(false)}} on:mouseenter={() => {hover(true)}}>Copy Link</button>
        <!-- <Tab name="python"></Tab> -->
    </div>
    <div class="ansiColorPreview">
        {#each buttons as b}
            {#if b.index>9}
                <div class="colorColumn {b.id}">
                    {#each [...Array(buttons.length/2).keys()] as i}
                        <p class="{buttons[i].id}">Text</p>
                        <p class="{buttons[i+10].id}">Text</p>
                    {/each}
                </div>
            {/if}
        {/each}
    </div>
    <!-- <div class="previewTextContainer" > -->
        <!-- <p class="previewText" on:click={focusEditor} contenteditable>This is text</p> -->
    <!-- </div> -->
</div>

<style lang="scss">

    .tabs {
        display: flex;
        flex-direction: row;
        padding-left: 1rem;
        border-radius: inherit;
        border-bottom-left-radius: 0rem;
        border-bottom-right-radius: 0rem;

        .copy {
            align-self: center;
            margin-right: 1rem;
            margin-left: auto;
            font-size: 0.6rem;
            padding: 00.3rem;
            border-radius: 00.5rem;
            border-color: #00000000;
        }
    }

    .preview{
        min-width: 0;
        min-height: 0;
        box-sizing: border-box;
        display: grid;
        grid-template-rows: 2.4rem 1fr;
        grid-template-areas: "tabs" "text";

        .ansiColorPreview {
            display: flex;
            grid-area: text;
            flex-direction: row;

            .colorColumn {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-around;
                width: 10%;
                margin: 1rem;
                padding: 0.5rem;
                border-radius: 0.2rem;

                p {
                    margin:0px;
                    font-size: 0.7rem;
                }
            }
        }

        .previewTextContainer {
            padding: 2rem;
            grid-area: text;
            color: white;
            overflow: auto;

            .previewText {
                box-sizing: content-box;
                margin: 0rem;
                height: 100%;
                overflow: auto;
                overflow-wrap: normal;
            }
        }

    }

    [contenteditable] {
        outline: 0px solid transparent;
    }
</style>