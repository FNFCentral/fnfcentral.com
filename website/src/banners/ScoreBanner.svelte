<script>
    import { onMount } from "svelte";

    import axios from "axios";
    import { DateTime } from "luxon";
    import Fa from "svelte-fa/src/fa.svelte";
    import { faSpinner } from "@fortawesome/free-solid-svg-icons";

    export let imageURL;
    const height = 50;
    const width = 600;
    export let songData = {};

    // Generate From ID
    export let ID;

    onMount(async () => {
        if (ID) {
            const reponse = await axios.get(
                "https://api.fnfcentral.com/v0/score/byID",
                {
                    params: {
                        scoreID: ID,
                    },
                    withCredentials: true,
                }
            );
            const data = reponse.data.score;

            songData = {
                score: data.score,
                diff: data.diff.name,
                song: data.diff.song.name,
                mod: data.diff.song.mod.name,
                time: DateTime.fromISO(data.time)
                    .toRelativeCalendar()
                    // All This Just For Title Case!
                    .replace(
                        /\w\S*/g,
                        (txt) =>
                            txt.charAt(0).toUpperCase() +
                            txt.substr(1).toLowerCase()
                    ),
            };

            if (!imageURL)
                imageURL =
                    "https://raw.fnfcentral.com/" + data.diff.song.iconCID;
        }
    });
</script>

<div
    style="height: {height}px; max-width: {width}px;"
    class="flex flex-row items-center rounded bannerHolder"
>
    <div class="flex flex-row flex-none justify-start items-center">
        <!-- svelte-ignore a11y-missing-attribute -->
        {#if imageURL}
            <img
                style="width: {height - 10}px; height: {height - 10}px;"
                class="squareImage"
                src={imageURL}
            />
        {:else}
            <div style="width: {height - 10}px; height: {height - 10}px;">
                <Fa icon={faSpinner} class="w-full !h-full" spin />
            </div>
        {/if}
        <div class="flex flex-col items-center" style="margin-left: 5px;">
            <div class="flex flex-row items-end">
                {#if songData.song}
                    <p class="large">{songData.song}</p>
                {:else}
                    <b class="large">Loading...</b>
                {/if}

                {#if songData.mod}
                    <p class="small">&nbsp;From: {songData.mod}</p>
                {:else}
                    <p class="small">&nbsp;Loading...</p>
                {/if}
            </div>
            <div class="flex flex-row items-start">
                {#if songData.diff}
                    <p class="small">{songData.diff}</p>
                {:else}
                    <p class="small">Loading...</p>
                {/if}
                {#if songData.time}
                    <p class="small grey">&nbsp;{songData.time}</p>
                {:else}
                    <p class="small grey">&nbsp;Loading...</p>
                {/if}
            </div>
        </div>
    </div>
    <div class="flex-grow" />
    <div
        class="flex flex-row flex-none justify-end"
        style="padding-right: 10px;"
    >
        {#if songData.score}
            <p class="large">{songData.score}</p>
        {:else}
            <div style="height: 2em;">
                <Fa icon={faSpinner} class="w-full !h-full" spin />
            </div>
        {/if}
    </div>
</div>

<style>
    .bannerHolder {
        background-color: #3643c3;
        margin: 5px;
        padding: 5px;
    }

    .squareImage {
        object-fit: cover;
    }

    p {
        font-family: zenKurenaido;
        color: #ffffff;
    }

    .small {
        font-size: 14px;
        line-height: 1em;
    }

    .large {
        font-size: 20px;
        line-height: calc(1em + 1px);
    }

    .grey {
        color: #c0c0c0;
    }
</style>
