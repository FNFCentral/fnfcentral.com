<script>
    import { url } from "@roxi/routify";
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
                href="https://twitter.com/FNFCentral"
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
            <p>Test</p>
        </div>
        <div class="flex flex-col items-start">
            <b>Info</b>
            <a href={$url("/faq")}>FAQ</a>
            <a href={$url("/credits")}>The Team</a>
        </div>
    </div>
    <div class="flex flex-row justify-start bottomText">
        <p>FNF Central is owned and operated by&nbsp;</p>
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
        margin-top: 10px;
        font-size: 12px;
    }
</style>
