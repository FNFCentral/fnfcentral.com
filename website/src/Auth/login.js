import Swal from "sweetalert2";

import identityStore from "./identityStore";

export default () => {
    Swal.fire({
        title: "Log In",
        text: "Setting Things Up!\nPlease wait a moment!",
        showConfirmButton: false,
    });

    fetch("https://user.fnfcentral.com/self-service/login/browser", {
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
                "Login Init Response:" + JSON.stringify(initResponseJSON)
            );

            Swal.fire({
                title: "Login",
                html:
                    `<input id="csrf_token" type="hidden" hidden value=${initResponseJSON.ui.nodes[0].attributes.value}>` +
                    '<input id="login-tag" type="text" class="swal2-input" placeholder="Boyfriend">' +
                    '<input id="login-password" type="password" class="swal2-input" placeholder="password">',
                focusConfirm: false,
                showCancelButton: true,
                confirmButtonText: "Login",
                showLoaderOnConfirm: true,
                preConfirm: () => {
                    let csrf_token =
                        document.getElementById("csrf_token").value;
                    let tag = document.getElementById("login-tag").value;
                    let password =
                        document.getElementById("login-password").value;

                    const body = {
                        method: "password",
                        password,
                        csrf_token,
                        password_identifier: tag,
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
                        .then((response) => {
                            console.log(
                                "Login Submit Response:" +
                                    JSON.stringify(response.json())
                            );

                            if (!response.ok) {
                                throw new Error(response.statusText);
                            }

                            return { tag: tag };
                        })
                        .catch((error) => {
                            Swal.showValidationMessage(
                                `Login failed: ${error}`
                            );
                        });
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: `Welcome Back ${result.value.tag}!`,
                        text: "Make Sure To Have Fun!",
                        icon: "success",
                    });
                    identityStore.refresh();
                }
            });
        })
        .catch((error) => {
            Swal.fire({
                title: "Login Failure",
                icon: "error",
                text: `Login Failed: ${error}`,
            });
        });
};
