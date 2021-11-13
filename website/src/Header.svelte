<script>
    import { onMount } from "svelte";

    import identityStore from "./Auth/identityStore.js";
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

    onMount(() => {
        identityStore.refresh();
    });
</script>

<div id="header" class="flex flex-row z-50">
    <div class="flex flex-row flex-none justify-start">
        <a href={"/"}>
            <img
                src="/logo.svg"
                alt="FNF Central"
                style="max-width: none;"
                class="h-full"
            />
        </a>
    </div>
    <div class="flex-grow" />
    <div class="flex flex-row flex-none justify-end items-center">
        {#if $identityStore}
            <p style="padding-right: 10px;">{$identityStore.traits.tag}</p>
            <img
                class="profilePicture"
                alt="pp"
                style="padding-right: 10px;"
                src="https://static.wikia.nocookie.net/fridaynightfunking/images/c/cc/Ron_2.png"
            />
        {:else}
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
        {/if}
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

    .profilePicture {
        width: 40px;
        height: 40px;
        object-fit: cover;
        border-radius: 50%;
    }

    p {
        font-family: domine;
        font-size: 20px;
    }
</style>
