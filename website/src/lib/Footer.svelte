<script>
    import Fa from "svelte-fa/src/fa.svelte";
    import { faMusic } from "@fortawesome/free-solid-svg-icons";
</script>

<div id="footer" class="footerBox">
    <div id="linkWall" class="flex flex-row justify-around">
        <div class="flex flex-col items-start">
            <b>Socials</b>
            <a
                href="https://twitter.com/FNFCentral"
                target="_blank"
                rel="noopener noreferrer">Twitter</a
            >
            <a
                href="https://www.youtube.com/channel/UCnylv0pz5HD8o-WQkoYJQ2Q"
                target="_blank"
                rel="noopener noreferrer">Youtube</a
            >
            <a
                href="https://github.com/FNFCentral"
                target="_blank"
                rel="noopener noreferrer">Github</a
            >
        </div>
        <div class="flex flex-col items-start">
            <b>Important Links</b>
            <a
                href="https://docs.fnfcentral.com"
                target="_blank"
                rel="noopener noreferrer">Docs</a
            >
        </div>
        <div class="flex flex-col items-start">
            <b>Info</b>
            <a href={"/faq"}>FAQ</a>
            <a href={"/credits"}>The Team</a>
        </div>
    </div>
    <div class="flex flex-row justify-start items-center bottomText">
        <p>FNF Central is made with&nbsp;</p>
        <Fa icon={faMusic} />
        <p>&nbsp;by&nbsp;</p>
        <a href="https://dualvs.com" target="_blank" rel="noopener noreferrer"
            >Dual Vipers LLC</a
        >
        <p>.</p>
    </div>
</div>

<style>
    .footerBox {
        background-color: #ff1cb0;
        color: #3643c3;
        font-family: domine;
        font-size: 16px;
    }

    .footerBox b {
        font-size: 20px;
    }

    .bottomText {
        padding-top: 10px;
        font-size: 12px;
        padding-left: 5px;
        padding-bottom: 5px;
    }
</style>
