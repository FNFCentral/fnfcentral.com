<script>
    import { url } from "@roxi/routify";
    import "./TailwindStyles.svelte";
</script>

<div id="header" class="fixed flex flex-row z-50">
    <div class="flex flex-row flex-none justify-start">
        <a href={$url("/")}>
            <img src="/logo.svg" alt="FNF Central" class="h-full" />
        </a>
    </div>
    <div class="flex-grow" />
    <div class="flex flex-row flex-none justify-end" />
</div>

<style>
    #header {
        width: 100%;
        height: 72px;
        background-color: #ff1cb0;
        color: #3643c3;
        font-family: aAnotherTag;
        font-size: 60px;
    }
</style>
