<script lang="ts">

</script>

<div class="container preview">
    <div class="previewText">
        <p>This is text</p>
    </div>
</div>

<style lang="scss">
    .preview{
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-rows: 2rem 1fr;
        grid-template-areas: "tabs" "text";

        .previewText {
            padding: 1rem;
            grid-area: text;
            color: white;
        }

    }
</style>