<script>
    import { goto } from "$app/navigation";

    import axios from "axios";
    import Swal from "sweetalert2";

    const content = {};

    const create = async () => {
        Swal.fire({
            title: "Creating",
            text: "Creating!\nPlease wait a moment!",
            showConfirmButton: false,
        });

        try {
            const response = await axios.post(
                "/api/a/globalSetting/create",
                content,
                {
                    withCredentials: true,
                }
            );

            if (!response.data.globalSetting)
                throw new Error(response.statusText);

            await Swal.fire({
                title: `Saved ${response.data.globalSetting.globalSettingID}!`,
                text: "Created!",
                icon: "success",
            });

            goto("/admin/globalSettings");
        } catch (error) {
            Swal.showValidationMessage(`Creation Failed: ${error}`);
        }
    };
</script>

<div class="block">
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
