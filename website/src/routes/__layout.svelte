<script>
    import Header from "$lib/Header.svelte";
    import Footer from "$lib/Footer.svelte";
    import Warning from "$lib/Warning.svelte";

    import { local, canary } from "$lib/modeData";

    import "../app.css";
    import "../sweetAlert.scss";
</script>

<div class="flex flex-col hScreenPlus">
    <div class="justify-self-start"><Header /></div>

    {#if local || canary}
        <div class="justify-self-start"><Warning /></div>
    {/if}

    <div class="flex-grow justify-self-start"><slot /></div>

    <div class="justify-self-end"><Footer /></div>
</div>

<style>
    .hScreenPlus {
        height: calc(100vh + 1px);
    }
</style>
