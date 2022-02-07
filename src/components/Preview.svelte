<script lang="ts">
    import Tab from './Tab.svelte';

    function focusEditor(e:Event){
        (e.target as HTMLElement).focus()
    }
</script>

<div class="container preview">
    <div class="tabs bg_alt">
        <Tab name="terminal"></Tab>
        <Tab name="python"></Tab>
    </div>
    
    <div class="previewTextContainer" >
        <p class="previewText" on:click={focusEditor} contenteditable>This is text</p>
    </div>
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