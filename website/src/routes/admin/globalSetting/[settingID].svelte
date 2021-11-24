<script>
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";

    import axios from "axios";
    import Swal from "sweetalert2";

    let globalSetting = {};

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

        globalSetting = responseJSON.globalSettings.find(
            (tempGlobalSetting) =>
                tempGlobalSetting.globalSettingID == $page.params.settingID
        );
    });

    const save = async () => {
        Swal.fire({
            title: "Saving",
            text: "Saving!\nPlease wait a moment!",
            showConfirmButton: false,
        });

        try {
            const response = await axios.put(
                "/api/a/globalSetting/update",
                globalSetting,
                {
                    withCredentials: true,
                }
            );

            if (!response.data.globalSetting)
                throw new Error(response.statusText);

            await Swal.fire({
                title: `Saved ${response.data.globalSetting.globalSettingID}!`,
                text: "Updated!",
                icon: "success",
            });

            goto("/admin/globalSettings");
        } catch (error) {
            Swal.showValidationMessage(`Saving Failed: ${error}`);
        }
    };
</script>

<div class="block">
    {#if globalSetting.globalSettingID}
        <label> Name: <input bind:value={globalSetting.name} /></label>
    {/if}

    <button
        type="button"
        class="addButton rounded-lg p-2"
        on:click={() => save()}
    >
        Save
    </button>
</div>

<style>
    label {
        display: block;
    }

    input {
        width: 350px;
    }

    .addButton {
        background-color: blanchedalmond;
        color: green;
        font-size: 50%;
    }
</style>
