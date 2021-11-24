<script>
    import { onMount } from "svelte";

    let globalSettings = [];

    onMount(async () => {
        const response = await fetch(`/api/a/globalSetting/all`, {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            redirect: "manual",
            credentials: "include",
        });

        if (!response.ok) return;

        const responseJSON = await response.json();

        console.log(
            "Global Settings: " + JSON.stringify(responseJSON.globalSettings)
        );

        globalSettings = responseJSON.globalSettings;
    });
</script>

<div class="block">
    {#each globalSettings as globalSetting}
        <a href="/admin/globalSetting/{globalSetting.globalSettingID}">
            {globalSetting.name}
        </a>
    {/each}
    <a href="/admin/globalSetting/new"><b>Create New Global Setting</b></a>
</div>

<style>
    a {
        display: block;
    }
</style>
