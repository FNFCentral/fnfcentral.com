<script>
    import { params, metatags } from "@roxi/routify";

    $: {
        metatags.title = "Play " + gameID;
    }

    $: gameID = $params.gameID;

    // Game Interaction
    $: gameScore = 0;
    $: gameCombo = 0;
    $: gameLog = [];

    window.addEventListener(
        "message",
        (event) => {
            console.log(JSON.stringify(event.data) + " from " + event.origin);

            switch (event.data.purpose) {
                case "register":
                    event.source.postMessage(
                        {
                            purpose: "set_ID_data",
                            songIDs: new Map([
                                ["Tutorial", 0],
                                ["Bopeebo", 1],
                                ["Fresh", 2],
                                ["Dadbattle", 3],
                                ["Spookeez", 4],
                                ["South", 5],
                                ["Monster", 6],
                                ["Pico", 7],
                                ["Philly", 8],
                                ["Blammed", 9],
                                ["Satin-Panties", 10],
                                ["High", 11],
                                ["Milf", 12],
                                ["Cocoa", 13],
                                ["Eggnog", 14],
                                ["Winter-Horrorland", 15],
                                ["Senpai", 16],
                                ["Roses", 17],
                                ["Thorns", 18],
                            ]),
                            difficultyIDs: new Map([
                                [0, 0],
                                [1, 1],
                                [2, 2],
                            ]),
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

<p>Playing Game {gameID}</p>

<div class="gameContainer">
    <iframe
        src="http://raw.fnfcentral.com/{gameID}"
        allowfullscreen
        allow="fullscreen"
        loading="lazy"
        title="Game {gameID}"
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
    .gameContainer {
        position: relative;
        overflow: hidden;
        z-index: 50;
        width: 70%;
        padding-top: calc(
            56.25% * 0.7
        ); /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */
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
