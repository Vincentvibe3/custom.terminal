<script lang="ts">
    export let name;
    function clickHandler(){
        console.log("clicked")
    }
</script>

<button class="tab bg_alt" on:click={clickHandler}>{name}</button>

<style lang="scss">
    .tab {
        width: 10rem;
        height: 100%;
        padding: 0.2rem;
        margin-left: 0.2rem;
        background-color: white;
        border: none;
        border-radius: 0.4rem 0.4rem 0rem 0rem;
    
    }
</style>