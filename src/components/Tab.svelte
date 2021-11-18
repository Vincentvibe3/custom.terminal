<script lang="ts">
    export let name;
    function clickHandler(){
        console.log("clicked")
    }
</script>

<button class="tab" on:click={clickHandler}>{name}</button>

<style lang="scss">
    .tab {
        width: 10rem;
        height: 100%;
        margin-left: 1rem;
        padding: 0.5rem;
        background-color: white;
        border: none;
    
    }
</style>