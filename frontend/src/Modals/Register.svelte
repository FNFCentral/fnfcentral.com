<script>
    import { onMount } from "svelte";

    import Modal from "./Modal.svelte";

    export let modalClose;

    let formData;
    let registrationData;

    const handleRegistration = (e) => {
        e.preventDefault();

        submitRegistration(e);
    };

    const submitRegistration = async (e) => {
        if (registrationData) {
            const formData = new FormData(e.target);

            if (formData.get("password") != formData.get("confirm_password")) {
                return;
            }

            const body = {
                method: "password",
                password: formData.get("password"),
                csrf_token: formData.get("csrf_token"),
                traits: {
                    tag: formData.get("tag"),
                    email: formData.get("email"),
                },
            };

            const response = await fetch(registrationData.ui.action, {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
                redirect: "manual",
                credentials: "include",
            });

            console.log(
                "Registration Submit Response:" +
                    JSON.stringify(response.json())
            );
        }
    };

    onMount(async () => {
        registrationData = await (
            await fetch(
                "https://user.fnfcentral.com/self-service/registration/browser",
                {
                    method: "GET",
                    mode: "cors",
                    cache: "no-cache",
                    headers: {
                        Accept: "application/json",
                    },
                    redirect: "manual",
                    credentials: "include",
                }
            )
        ).json();

        console.log(
            "Registration Init Response:" + JSON.stringify(registrationData)
        );

        formData = registrationData.ui.nodes;
    });
</script>

<Modal {modalClose}>
    <div id="formHolder" class="text-center">
        {#if registrationData}
            <div id="registration_text"><h3>Register</h3></div>
            <form
                action=""
                id="registrationForm"
                on:submit={handleRegistration}
            >
                <div id="csrf_token_holder">
                    <input
                        name="csrf_token"
                        id="csrf_token_input"
                        type="hidden"
                        value={registrationData.ui.nodes[0].attributes.value}
                        hidden
                    />
                </div>
                <div id="tag_holder">
                    <label for="tag">Tag: </label>
                    <input
                        name="tag"
                        id="tag_input"
                        type="text"
                        placeholder="Boyfriend"
                    />
                </div>
                <div id="email_holder">
                    <label for="email">Email: </label>
                    <input
                        name="email"
                        id="email_input"
                        type="email"
                        placeholder="bf@fnfcentral.com"
                    />
                </div>
                <div id="password_holder">
                    <label for="password">Password: </label>
                    <input
                        name="password"
                        id="password_input"
                        type="password"
                        placeholder="password"
                    />
                </div>
                <div id="password_confirm_holder">
                    <label for="confirm_password">Password: </label>
                    <input
                        name="confirm_password"
                        id="confirm_password_input"
                        type="password"
                        placeholder="password"
                    />
                </div>
                <div id="register_holder">
                    <input
                        name="register"
                        id="register_input"
                        type="submit"
                        value="Register"
                    />
                </div>
            </form>
        {:else}
            <p>Please Wait While We Set Things Up!</p>
        {/if}
    </div>
</Modal>
