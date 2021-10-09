<script>
    import { onMount } from "svelte";
    import { url } from "@roxi/routify";

    import registerPopup from "./Auth/register.js";
    import loginPopup from "./Auth/login.js";

    const register = (e) => {
        e.preventDefault();

        registerPopup();
    };

    const login = (e) => {
        e.preventDefault();

        loginPopup();
    };
</script>

<div id="header" class="fixed flex flex-row z-50">
    <div class="flex flex-row flex-none justify-start">
        <a href={$url("/")}>
            <img src="/logo.svg" alt="FNF Central" class="h-full" />
        </a>
    </div>
    <div class="flex-grow" />
    <div class="flex flex-row flex-none justify-end">
        <button
            type="button"
            class="authButton self-center rounded-lg p-2 mx-2"
            on:click={register}>Register</button
        >
        <button
            type="button"
            class="authButton self-center rounded-lg p-2 mx-2"
            on:click={login}>Log In</button
        >
    </div>
</div>

<style>
    #header {
        width: 100%;
        height: 72px;
        background-color: #ff1cb0;
        color: #3643c3;
        font-family: aAnotherTag;
        font-size: 60px;
    }

    .authButton {
        background-color: #3643c3;
        color: #ff1cb0;
        font-size: 50%;
    }
</style>
