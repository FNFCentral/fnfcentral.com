<script>
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";

    import axios from "axios";
    import Swal from "sweetalert2";

    import { CollapsibleCard } from "svelte-collapsible";

    let content = {};
    let globalSettings = [];

    const getModContent = async () => {
        const response = await fetch(
            `/api/v0/mod/allData?modID=${$page.params.oldModID}`,
            {
                method: "GET",
                mode: "cors",
                cache: "no-cache",
                redirect: "manual",
                credentials: "include",
            }
        );

        if (!response.ok) return;

        const responseJSON = await response.json();

        console.log("Content: " + JSON.stringify(responseJSON.mod));

        return responseJSON.mod;
    };

    const getGlobalSettings = async () => {
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

        return responseJSON.globalSettings;
    };

    onMount(async () => {
        content = await getModContent();
        content.oldModID = $page.params.oldModID;
        globalSettings = await getGlobalSettings();
    });

    const addSong = () => {
        console.log("Adding Song");

        if (content.modID) {
            content.songs = [...content.songs, { diffs: [] }];
        }
    };

    const addDiff = (song) => {
        console.log("Adding Diff");

        if (content.modID) {
            song.diffs = [...song.diffs, {}];
            content.songs = content.songs;
        }
    };

    const addExtraInfo = () => {
        console.log("Adding Extra Info");

        if (content.modID) {
            content.extraInfos = [...content.extraInfos, {}];
        }
    };

    const addSetting = () => {
        console.log("Adding Setting");

        if (content.modID) {
            content.settings = [...content.settings, {}];
        }
    };

    const addGlobalSettingMap = () => {
        console.log("Adding Global Setting Map");

        if (content.modID) {
            content.globalSettingMaps = [...content.globalSettingMaps, {}];
        }
    };

    const save = async () => {
        Swal.fire({
            title: "Saving",
            text: "Saving!\nPlease wait a moment!",
            showConfirmButton: false,
        });

        try {
            const response = await axios.put("/api/a/mod/update", content, {
                withCredentials: true,
            });

            if (!response.data.mod) throw new Error(response.statusText);

            await Swal.fire({
                title: `Saved ${response.data.mod.modID}!`,
                text: "Updated!",
                icon: "success",
            });

            goto("/admin/mods");
        } catch (error) {
            Swal.showValidationMessage(`Saving Failed: ${error}`);
        }
    };
</script>

<div class="block">
    {#if content.modID}
        <label> Mod ID: <input bind:value={content.modID} /></label>
        <label> Name: <input bind:value={content.name} /></label>
        <label> CID: <input bind:value={content.cid} /></label>
        <CollapsibleCard>
            <b slot="header">Songs</b>
            <div slot="body" class="tabbed">
                {#each content.songs as song}
                    <CollapsibleCard open={false}>
                        <b slot="header">Song - {song.name}</b>
                        <div slot="body" class="tabbed">
                            <label>
                                Name: <input bind:value={song.name} /></label
                            >
                            <label>
                                Internal Name:
                                <input bind:value={song.internalName} />
                            </label>
                            <label>
                                Icon CID:
                                <input bind:value={song.iconCID} />
                            </label>
                            <CollapsibleCard>
                                <b slot="header">Diffs</b>
                                <div slot="body" class="tabbed">
                                    {#each song.diffs as diff}
                                        <CollapsibleCard open={false}>
                                            <b slot="header">
                                                Diff - {diff.name}
                                            </b>
                                            <div slot="body" class="tabbed">
                                                <label>
                                                    Name: <input
                                                        bind:value={diff.name}
                                                    /></label
                                                >
                                                <label>
                                                    Internal Number:
                                                    <input
                                                        type="number"
                                                        bind:value={diff.internalNumber}
                                                    />
                                                </label>
                                            </div>
                                        </CollapsibleCard>
                                    {/each}
                                    <button
                                        type="button"
                                        class="addButton rounded-lg p-2"
                                        on:click={() => addDiff(song)}
                                    >
                                        Add Diff
                                    </button>
                                </div>
                            </CollapsibleCard>
                        </div>
                    </CollapsibleCard>
                {/each}
                <button
                    type="button"
                    class="addButton rounded-lg p-2"
                    on:click={() => addSong()}
                >
                    Add Song
                </button>
            </div>
        </CollapsibleCard>
        <CollapsibleCard>
            <b slot="header">Extra Infos</b>
            <div slot="body" class="tabbed">
                {#each content.extraInfos as extraInfo}
                    <CollapsibleCard open={false}>
                        <b slot="header">
                            Extra Info - {extraInfo.internalName}
                        </b>
                        <div slot="body" class="tabbed">
                            <label>
                                Internal Name:
                                <input bind:value={extraInfo.internalName} />
                            </label>
                            <label>
                                Type:
                                <select bind:value={extraInfo.valueType}>
                                    <option value="STRING"> String </option>
                                    <option value="NUMBER"> Number </option>
                                    <option value="BOOL"> Boolean </option>
                                </select>
                            </label>
                        </div>
                    </CollapsibleCard>
                {/each}
                <button
                    type="button"
                    class="addButton rounded-lg p-2"
                    on:click={() => addExtraInfo()}
                >
                    Add Extra Info
                </button>
            </div>
        </CollapsibleCard>
        <CollapsibleCard>
            <b slot="header">Settings</b>
            <div slot="body" class="tabbed">
                {#each content.settings as setting}
                    <CollapsibleCard open={false}>
                        <b slot="header">Setting - {setting.name}</b>
                        <div slot="body" class="tabbed">
                            <label>
                                Name:
                                <input bind:value={setting.name} />
                            </label>
                            <label>
                                Internal Name:
                                <input bind:value={setting.internalName} />
                            </label>
                        </div>
                    </CollapsibleCard>
                {/each}
                <button
                    type="button"
                    class="addButton rounded-lg p-2"
                    on:click={() => addSetting()}
                >
                    Add Setting
                </button>
            </div>
        </CollapsibleCard>
        <CollapsibleCard>
            <b slot="header">Global Setting Maps</b>
            <div slot="body" class="tabbed">
                {#each content.globalSettingMaps as globalSettingMap}
                    <CollapsibleCard open={false}>
                        <b slot="header">
                            Global Setting Map - {globalSettingMap.internalName}
                        </b>
                        <div slot="body" class="tabbed">
                            <label>
                                Internal Name:
                                <input
                                    bind:value={globalSettingMap.internalName}
                                />
                            </label>
                            <label>
                                Global Setting:
                                <select
                                    bind:value={globalSettingMap.globalSettingID}
                                >
                                    {#each globalSettings as globalSetting}
                                        <option
                                            value={globalSetting.globalSettingID}
                                        >
                                            {globalSetting.name}
                                        </option>
                                    {/each}
                                </select>
                            </label>
                        </div>
                    </CollapsibleCard>
                {/each}
                <button
                    type="button"
                    class="addButton rounded-lg p-2"
                    on:click={() => addGlobalSettingMap()}
                >
                    Add Global Setting Map
                </button>
            </div>
        </CollapsibleCard>
        <button
            type="button"
            class="addButton rounded-lg p-2"
            on:click={() => save()}
        >
            Save
        </button>
    {/if}
</div>

<style>
    .tabbed {
        padding-left: 25px;
    }

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
