<script>
    export let modalClose;
</script>

<div
    id="modal_holder"
    class="w-screen h-screen flex justify-center content-center bg-opacity-20"
>
    <div id="modal" class="self-center rounded-lg p-2 flex justify-center">
        <div id="centered_internal_modal" class="self-center">
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
</style>
