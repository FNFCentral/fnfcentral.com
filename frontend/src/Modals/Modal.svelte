<script>
    import Fa from "svelte-fa/src/fa.svelte";
    import { faTimes } from "@fortawesome/free-solid-svg-icons";

    export let modalClose;
</script>

<div
    id="modal_holder"
    class="w-screen h-screen flex justify-center content-center bg-opacity-20"
>
    <div
        id="modal"
        class="self-center rounded-lg p-2 flex relative justify-center"
    >
        <div
            id="close_button_container"
            class="absolute top-2 right-2"
            on:click={modalClose}
        >
            <Fa icon={faTimes} color="#ff0000" class="w-full !h-full" />
        </div>
        <div id="centered_internal_modal" class="">
            <slot />
        </div>
    </div>
</div>

<style lang="scss">
    #modal_holder {
        background-color: rgba($color: #ff1cb0, $alpha: 0.2);
        z-index: 100;
        position: absolute;
        top: 0;
        left: 0;
    }

    #modal {
        background-color: white;
        min-height: 40%;
    }

    #close_button_container {
        width: 10%;
    }
</style>
