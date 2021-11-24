<script>
    import { onMount } from "svelte";

    let mods = [];

    onMount(async () => {
        const response = await fetch("/api/a/mod/all", {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            redirect: "manual",
            credentials: "include",
        });

        if (!response.ok) return;

        const responseJSON = await response.json();

        mods = responseJSON.mods;

        console.log("Mods: " + JSON.stringify(mods));
    });
</script>

<div class="block">
    {#each mods as mod}
        <a href="/admin/mod/{mod.modID}">{mod.modID} - {mod.name}</a>
    {/each}
    <a href="/admin/mod/new"><b>Create New Mod</b></a>
</div>

<style>
    a {
        display: block;
    }
</style>
