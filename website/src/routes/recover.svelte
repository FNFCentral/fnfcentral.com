<script>
    import Swal from "sweetalert2";

    import { onMount } from "svelte";

    import { userURL } from "$lib/modeData";

    onMount(async () => {
        Swal.fire({
            title: "Reset Password",
            text: "Setting Things Up!\nPlease wait a moment!",
            showConfirmButton: false,
        }).then(() => {
            if (result.dismiss) {
                window.location.href = "/dashboard";
                return;
            }
        });

        fetch("https://" + userURL + "/self-service/settings/browser", {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            headers: {
                Accept: "application/json",
            },
            redirect: "manual",
            credentials: "include",
        })
            .then((initResponse) => {
                if (!initResponse.ok) {
                    throw new Error(initResponse.statusText);
                }

                return initResponse.json();
            })
            .then((initResponseJSON) => {
                console.log(
                    "Reset Password Init Response:" +
                        JSON.stringify(initResponseJSON)
                );

                Swal.fire({
                    title: "Reset Password",
                    html:
                        `<input id="csrf_token" type="hidden" hidden value=${initResponseJSON.ui.nodes[0].attributes.value}>` +
                        '<input id="reset-password" type="password" class="swal2-input" placeholder="password">' +
                        '<input id="reset-confirm-password" type="password" class="swal2-input" placeholder="password">',
                    focusConfirm: false,
                    showCancelButton: true,
                    confirmButtonText: "Reset Password",
                    showLoaderOnConfirm: true,
                    preConfirm: () => {
                        let csrf_token =
                            document.getElementById("csrf_token").value;
                        let password =
                            document.getElementById("reset-password").value;
                        let confirm_password = document.getElementById(
                            "reset-confirm-password"
                        ).value;

                        if (confirm_password !== password) {
                            Swal.showValidationMessage(
                                "Passwords Do Not Match"
                            );
                            return false;
                        }

                        const body = {
                            method: "password",
                            password,
                            csrf_token,
                        };

                        return fetch(initResponseJSON.ui.action, {
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
                        })
                            .then(async (response) => {
                                let responseJSON = await response.json();

                                console.log(
                                    "Reset Password Submit Response:" +
                                        JSON.stringify(responseJSON)
                                );

                                if (!response.ok) {
                                    switch (response.status) {
                                        case 400: {
                                            if (responseJSON.ui.messages) {
                                                throw new Error(
                                                    responseJSON.ui.messages[0].text
                                                );
                                            }
                                            const errorNodes =
                                                responseJSON.ui.nodes.filter(
                                                    (node) =>
                                                        node.messages.length > 0
                                                );
                                            if (errorNodes.length > 0) {
                                                throw new Error(
                                                    errorNodes[0].messages[0].text
                                                );
                                            } else {
                                                throw new Error();
                                            }
                                        }
                                        case 422:
                                            throw new Error(
                                                responseJSON.reason
                                            );
                                        case 500:
                                            throw new Error(
                                                responseJSON.error.reason
                                            );
                                        default:
                                            throw new Error();
                                    }
                                }
                            })
                            .catch((error) => {
                                if (!error.message) {
                                    error.message = "Unknown Error";
                                }

                                Swal.showValidationMessage(
                                    `Reset Password failed: ${error.message}`
                                );
                            });
                    },
                }).then((result) => {
                    if (result.dismiss) {
                        window.location.href = "/dashboard";
                        return;
                    }

                    if (result.isConfirmed) {
                        Swal.fire({
                            title: `Your Password Has Been Reset!`,
                            text: "Click Dashboard To Return To Your Dashboard!",
                            icon: "success",
                            confirmButtonText: "Dashboard",
                        }).then(async () => {
                            window.location.href = "/dashboard";
                        });
                    }
                });
            })
            .catch((error) => {
                Swal.fire({
                    title: "Reset Password Failure",
                    icon: "error",
                    text: `Reset Password Failed: ${error}`,
                    showConfirmButton: false,
                }).then(async (result) => {
                    if (result.dismiss) {
                        window.location.href = "/dashboard";
                        return;
                    }
                });
            });
    });
</script>

<svelte:head>
    <title>Recovery - FNF Central</title>
    <meta name="robots" content="noindex" />
</svelte:head>
