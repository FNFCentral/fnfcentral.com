<script>
    import { onMount } from "svelte";
    import { url } from "@roxi/routify";

    import RegisterModal from "./Modals/Register.svelte";
    import LoginModal from "./Modals/Login.svelte";

    let modalOpen = false;
    let modalRegister = false;
    let modalLogIn = false;

    const registerSpawn = () => {
        if (modalOpen) return;
        modalRegister = true;
        modalLogIn = false;
        modalOpen = true;
    };

    const logInSpawn = () => {
        if (modalOpen) return;
        modalRegister = false;
        modalLogIn = true;
        modalOpen = true;
    };

    const modalClose = () => {
        modalOpen = false;
        modalRegister = false;
        modalLogIn = false;
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
            on:click={registerSpawn}>Register</button
        >
        <button
            type="button"
            class="authButton self-center rounded-lg p-2 mx-2"
            on:click={logInSpawn}>Log In</button
        >
    </div>
</div>

{#if modalOpen}
    {#if modalRegister}
        <RegisterModal open={modalOpen} />
    {:else if modalLogIn}
        <LoginModal open={modalOpen} />
    {:else}
        <script>
            console.log("Something Wrong With The Modal!");
        </script>
    {/if}
{/if}

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
