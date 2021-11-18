<script lang="ts">
    import Tab from './Tab.svelte';
</script>

<div class="container preview">
    <div class="container tabs">
        <Tab name="terminal"></Tab>
        <Tab name="python"></Tab>
    </div>
    
    <div class="previewText">
        <p>This is text</p>
    </div>
</div>

<style lang="scss">

    .tabs {
        display: flex;
        flex-direction: row;
        padding-left: 1rem;
        border-bottom-left-radius: 0rem;
        border-bottom-right-radius: 0rem;
    }

    .preview{
        display: grid;
        grid-template-rows: 2.4rem 1fr;
        grid-template-areas: "tabs" "text";

        .previewText {
            padding: 1rem;
            grid-area: text;
            color: white;
        }

    }
</style>