<script lang="ts">
    import Tab from './Tab.svelte';
    import { buttons, ColorButton } from './Colors.svelte'
    import { onMount } from 'svelte';
    import { renderColor } from '../scripts/rendering';
    import { RGB2HSV } from '../scripts/colorUtils';

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
</script>

<div class="container preview">
    <div class="tabs Bg_alt">
        <Tab name="Terminal"></Tab>
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