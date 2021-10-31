<script>
    import { onMount } from "svelte";
    import { params, metatags } from "@roxi/routify";

    import axios from "axios";
    import Fa from "svelte-fa/src/fa.svelte";
    import { faExpand } from "@fortawesome/free-solid-svg-icons";

    import submitScore from "../../api/submitScorce";
    import getCurUserTopScores from "../../api/getCurUserTopScores";

    $: {
        metatags.title = "Playing " + mod;
    }

    $: modID = $params.modID;
    let modData = { name: "", songs: [] };
    $: mod = modData.name;

    // Fullscreen Crap
    function makeFullscreen() {
        let elem = document.getElementById("game");

        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
            /* Safari */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
            /* IE11 */ // I kinda copy pasted this.  This site does NOT like IE.
            elem.msRequestFullscreen();
        }
    }

    onMount(async () => {
        const rawData = (
            await axios.get("https://api.fnfcentral.com/v0/mod/allData", {
                params: {
                    modID,
                },
            })
        ).data;

        console.log("Found Data On Mod: " + JSON.stringify(rawData));

        if (!rawData.mod) return;

        const songs = [];

        rawData.mod.songs.forEach((song) => {
            const diffs = [];

            song.diffs.forEach((diff) => {
                diffs.push({
                    diffID: diff.diffID,
                    internalNumber: diff.internalNumber,
                });
            });

            songs.push({
                songID: song.songID,
                intenalName: song.internalName,
                diffs,
            });
        });

        modData.name = rawData.mod.name;
        modData.songs = songs;
    });

    // Game Interaction
    $: gameScore = 0;
    $: gameCombo = 0;
    $: gameLog = [];

    window.addEventListener(
        "message",
        async (event) => {
            console.log(JSON.stringify(event.data) + " from " + event.origin);

            switch (event.data.purpose) {
                case "register":
                    event.source.postMessage(
                        {
                            purpose: "set_ID_data",
                            songs: modData.songs,
                            topScores: await getCurUserTopScores({ modID }),
                        },
                        event.origin
                    );
                    break;

                case "song_start":
                    gameScore = 0;
                    gameCombo = 0;
                    gameLog = [
                        "Song Started!  SongID: " +
                            event.data.songID +
                            " DiffID: " +
                            event.data.diffID,
                    ];
                    break;

                case "song_pass":
                    gameLog = [
                        "Song Passed!  Score: " +
                            event.data.score +
                            " SongID: " +
                            event.data.songID +
                            " DiffID: " +
                            event.data.diffID,
                        ...gameLog,
                    ];
                    submitScore({
                        modID,
                        songID: event.data.songID,
                        diffID: event.data.diffID,
                        score: event.data.score,
                        pass: true,
                    });
                    break;

                case "song_fail":
                    gameLog = [
                        "Song Failed.  :C  Score: " +
                            event.data.score +
                            " SongID: " +
                            event.data.songID +
                            " DiffID: " +
                            event.data.diffID,
                        ...gameLog,
                    ];
                    submitScore({
                        modID,
                        songID: event.data.songID,
                        diffID: event.data.diffID,
                        score: event.data.score,
                        pass: false,
                    });
                    break;

                case "hit":
                    gameLog = [
                        "Note Hit!  Note Time: " +
                            event.data.noteTime +
                            " Delay: " +
                            event.data.delay +
                            " Combo: " +
                            event.data.combo +
                            " Score: " +
                            event.data.currentScore,
                        ...gameLog,
                    ];
                    gameScore = event.data.currentScore;
                    gameCombo = event.data.combo;
                    break;

                case "miss":
                    gameLog = [
                        "Note Missed.  :C  Note Time: " +
                            event.data.noteTime +
                            " Combo: " +
                            event.data.combo +
                            " Score: " +
                            event.data.currentScore,
                        ...gameLog,
                    ];
                    gameScore = event.data.currentScore;
                    gameCombo = event.data.combo;
                    break;
            }
        },
        false
    );
</script>

<p>Playing Game {mod}</p>

<div id="gameContainer">
    <div
        id="fullscreenButtonContainer"
        class="absolute bottom-0 right-0 z-20"
        on:click={makeFullscreen}
    >
        <Fa icon={faExpand} color="#ff1cb0" class="w-full !h-full" />
    </div>
    <iframe
        id="game"
        src="https://raw.fnfcentral.com/{modID}"
        allowfullscreen
        allow="fullscreen"
        loading="lazy"
        title="Game {modID}"
        class="z-0"
    />
</div>

<div id="holder_stats">
    <p>Current Score: {gameScore}</p>
    <p>Current Combo: {gameCombo}</p>
    <p>Game Log:</p>
    <ul class="list-disc list-inside">
        {#each gameLog as event}
            <li>{event}</li>
        {/each}
    </ul>
</div>

<style>
    #gameContainer {
        position: relative;
        overflow: hidden;
        width: 70%;
        padding-top: calc(
            56.25% * 0.7
        ); /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */
    }

    #fullscreenButtonContainer {
        width: 5%;
    }

    iframe {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 100%;
    }
</style>
