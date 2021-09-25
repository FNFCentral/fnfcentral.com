<script>
    import { onMount } from "svelte";

    import Modal from "./Modal.svelte";

    export let modalClose;

    let formData;
    let loginData;

    const handleLogin = (e) => {
        e.preventDefault();

        submitLogin(e);
    };

    const submitLogin = async (e) => {
        if (loginData) {
            const formData = new FormData(e.target);

            const body = {
                method: "password",
                password: formData.get("password"),
                csrf_token: formData.get("csrf_token"),
                password_identifier: formData.get("tag"),
            };

            const response = await fetch(loginData.ui.action, {
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
                "Login Submit Response:" + JSON.stringify(response.json())
            );
        }
    };

    onMount(async () => {
        loginData = await (
            await fetch(
                "https://user.fnfcentral.com/self-service/login/browser",
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

        console.log("Login Init Response:" + JSON.stringify(loginData));

        formData = loginData.ui.nodes;
    });
</script>

<Modal {modalClose}>
    <div id="formHolder" class="text-center">
        {#if loginData}
            <div id="registration_text"><h3>Register</h3></div>
            <form action="" id="registrationForm" on:submit={handleLogin}>
                <div id="csrf_token_holder">
                    <input
                        name="csrf_token"
                        id="csrf_token_input"
                        type="hidden"
                        value={loginData.ui.nodes[0].attributes.value}
                        hidden
                    />
                </div>
                <div id="tag_holder">
                    <label for="tag">Tag: </label>
                    <input
                        name="tag"
                        id="tag_input"
                        type="text"
                        placeholder="MyTag"
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
