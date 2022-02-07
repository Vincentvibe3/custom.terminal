<script lang="ts">
    export let name;
    function clickHandler(){
        console.log("clicked tab")
    }
</script>

<button class="tab bg" on:click={clickHandler}>{name}</button>

<style lang="scss">
    .tab {
        width: fit-content;
        height: 100%;
        padding-right: 2rem;
        margin-left: 0rem;
        background-color: white;
        border: none;
        border-radius: 0.4rem 0.4rem 0rem 0rem;
        text-align: left;
        text-indent: 1rem;
        font-size: 0.8rem;
    
    }
</style>