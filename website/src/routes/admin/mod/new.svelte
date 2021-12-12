<script>
    import { goto } from "$app/navigation";

    import axios from "axios";
    import Swal from "sweetalert2";

    const content = {
        songs: [],
        extraInfos: [],
        settings: [],
        globalSettingMaps: [],
    };

    const create = async () => {
        Swal.fire({
            title: "Creating",
            text: "Creating!\nPlease wait a moment!",
            showConfirmButton: false,
        });

        try {
            const response = await axios.post("/api/a/mod/create", content, {
                withCredentials: true,
            });

            if (!response.data.mod) throw new Error(response.statusText);

            await Swal.fire({
                title: `Saved ${response.data.mod.modID}!`,
                text: "Created!",
                icon: "success",
            });

            goto("/admin/mods");
        } catch (error) {
            Swal.showValidationMessage(`Creation Failed: ${error}`);
        }
    };
</script>

<div class="block">
    <label> Mod ID: <input bind:value={content.modID} /></label>
    <label> Name: <input bind:value={content.name} /></label>

    <button
        type="button"
        class="addButton rounded-lg p-2"
        on:click={() => create()}
    >
        Create
    </button>
</div>

<style>
    label {
        display: block;
    }

    input {
        width: 350px;
    }

    .addButton {
        background-color: blanchedalmond;
        color: green;
        font-size: 50%;
    }
</style>
