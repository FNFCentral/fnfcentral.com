<script context="module">
    /** @type {import('@sveltejs/kit').Load} */
    export async function load({ page, fetch }) {
        const res = await fetch(
            `/api/v0/mod/allData?modID=${page.params.modID}`,
            {
                method: "GET",
                credentials: "include",
            }
        );

        if (!res.ok) {
            return {
                status: res.status,
                error: new Error(`Mod does not exist ${page.params.modID}`),
            };
        }

        const rawData = await res.json();

        console.log("Found Data On Mod: " + JSON.stringify(rawData));

        if (!rawData.mod)
            return {
                status: 404,
                error: new Error(`Mod does not exist ${page.params.modID}`),
            };

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
                internalName: song.internalName,
                diffs,
            });
        });

        const extraInfos = [];

        rawData.mod.extraInfos.forEach((extraInfo) => {
            extraInfos.push({
                extraInfoID: extraInfo.extraInfoID,
                internalName: extraInfo.internalName,
            });
        });

        const settings = [];

        rawData.mod.settings.forEach((setting) => {
            settings.push({
                settingID: setting.settingID,
                internalName: setting.internalName,
                global: false,
            });
        });

        rawData.mod.globalSettingMaps.forEach((setting) => {
            settings.push({
                settingID: setting.globalSettingID,
                internalName: setting.internalName,
                global: true,
                value: null,
            });
        });

        return {
            props: {
                modID: rawData.mod.modID,
                modData: { songs, extraInfos, settings },
                mod: rawData.mod.name,
            },
        };
    }
</script>

<script>
    import Fa from "svelte-fa/src/fa.svelte";
    import { faExpand } from "@fortawesome/free-solid-svg-icons";

    import ScoreBanner from "$lib/banners/ScoreBanner.svelte";
    import submitScore from "$lib/api/submitScorce";
    import saveUserExtraInfo from "$lib/api/saveUserExtraInfo";
    import getCurUserTopScores from "$lib/api/getCurUserTopScores";
    import getUserExtraInfos from "$lib/api/getUserExtraInfos";
    import getUserSettings from "$lib/api/getUserSettings";
    import saveUserSetting from "$lib/api/saveUserSetting";
    import identityStore from "$lib/auth/identityStore";
    import { rawURL } from "$lib/modeData";

    export let modID = "";
    export let modData = { songs: [], extraInfos: [], settings: [] };
    export let mod = "";

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

    // Game Interaction
    $: gameScore = 0;
    $: gameCombo = 0;
    $: gameLog = [];
    $: scoreIDs = [];

    $: {
        if ($identityStore) {
            console.log(
                "Game Data Updating From Player " +
                    $identityStore.id +
                    "'s Data"
            );

            sendInformation(
                document.getElementById("game").contentWindow,
                "https://games." + rawURL
            );
        }
    }

    const sendInformation = async (targetWindow, origin) => {
        targetWindow.postMessage(
            {
                purpose: "set_mod_data",
                songs: modData.songs,
                extraInfos: modData.extraInfos,
                settings: modData.settings,
            },
            origin
        );
        targetWindow.postMessage(
            {
                purpose: "set_score_data",
                topScores: await getCurUserTopScores({ modID }),
            },
            origin
        );
        targetWindow.postMessage(
            {
                purpose: "set_extra_info",
                userExtraInfos: await getUserExtraInfos({ modID }),
            },
            origin
        );
        targetWindow.postMessage(
            {
                purpose: "set_settings",
                userSettings: await getUserSettings({ modID }),
            },
            origin
        );
    };

    const handleMessage = async (event) => {
        console.log(JSON.stringify(event.data) + " from " + event.origin);

        if (event.origin != "https://games." + rawURL) return;

        switch (event.data.purpose) {
            case "register": {
                await sendInformation(event.source, event.origin);
                break;
            }

            case "song_start": {
                gameScore = 0;
                gameCombo = 0;
                gameLog = ["Song Started!  DiffID: " + event.data.diffID];
                break;
            }

            case "song_pass": {
                gameLog = [
                    "Song Passed!  Score: " +
                        event.data.score +
                        " DiffID: " +
                        event.data.diffID,
                    ...gameLog,
                ];
                console.log(gameLog);
                const response = await submitScore({
                    diffID: event.data.diffID,
                    score: event.data.score,
                    pass: true,
                });
                if (response) {
                    scoreIDs = [
                        {
                            entry: scoreIDs.length,
                            scoreID: response.data.scoreID,
                        },
                        ...scoreIDs,
                    ];
                }
                break;
            }

            case "song_fail": {
                gameLog = [
                    "Song Failed.  :C  Score: " +
                        event.data.score +
                        " DiffID: " +
                        event.data.diffID,
                    ...gameLog,
                ];
                console.log(gameLog);
                submitScore({
                    diffID: event.data.diffID,
                    score: event.data.score,
                    pass: false,
                });
                break;
            }

            case "hit": {
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
            }

            case "miss": {
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

            case "save_extra_info": {
                saveUserExtraInfo({
                    extraInfoID: event.data.extraInfoID,
                    value: event.data.value,
                });
                break;
            }

            case "save_setting": {
                saveUserSetting({
                    settingID: event.data.settingID,
                    global: event.data.global,
                    value: event.data.value,
                });
                break;
            }

            case "state": {
                console.log(
                    "State Update Recieved At Time " + event.data.currentTime
                );
                break;
            }
        }
    };
</script>

<svelte:head>
    <title>{mod} - FNF Central</title>
</svelte:head>

<svelte:window on:message={handleMessage} />

<p>Playing Mod {mod}</p>

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
        src="https://games.{rawURL}/{modID}"
        allowfullscreen
        allow="fullscreen gamepad"
        loading="lazy"
        title="Mod {mod}"
        class="z-0"
    />
</div>

<div id="scoreHolder">
    {#each scoreIDs as ID (ID.entry)}
        <ScoreBanner ID={ID.scoreID} />
    {/each}
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
