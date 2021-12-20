<script>
    import Fa from "svelte-fa/src/fa.svelte";
    import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

    import { local, canary } from "$lib/modeData";
</script>

<div id="warning" class="warningBox">
    <div id="top">
        <Fa icon={faExclamationTriangle} style="display: inline" />
        <b>Warning!</b>
    </div>
    <div id="text">
        {#if local}
            <p>
                This site is a local site, run by an individual. Many features
                may not work or not be implemented. DO NOT ENTER ANY REAL
                CREDENTIALS!
            </p>
        {:else if canary}
            <p>
                This site is a canary site, run as a test. Many features may not
                work or not be implemented. Expect consistant deletion of data.
                Your real credentials will not work here. Out of an abundence of
                caution, please use a password you do not use anywhere else (you
                should already do that!)
            </p>
        {/if}
    </div>
</div>

<style>
    .warningBox {
        background-color: #ffcc00;
        color: #000000;
        font-family: domine;
        font-size: 16px;
    }

    .warningBox b {
        font-size: 20px;
    }
</style>
