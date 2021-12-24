import Swal from "sweetalert2";

import { userURL } from "../modeData";
import identityStore from "./identityStore";

export default () => {
    Swal.fire({
        title: "Register",
        text: "Setting Things Up!\nPlease wait a moment!",
        showConfirmButton: false,
    });

    fetch("https://" + userURL + "/self-service/registration/browser", {
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
                "Registration Init Response:" + JSON.stringify(initResponseJSON)
            );

            Swal.fire({
                title: "Register",
                html:
                    `<input id="csrf_token" type="hidden" hidden value=${initResponseJSON.ui.nodes[0].attributes.value}>` +
                    '<input id="register-tag" type="text" class="swal2-input" placeholder="Boyfriend">' +
                    '<input id="register-email" type="email" class="swal2-input" placeholder="bf@fnfcentral.com">' +
                    '<input id="register-password" type="password" class="swal2-input" placeholder="password">' +
                    '<input id="register-confirm-password" type="password" class="swal2-input" placeholder="password">',
                focusConfirm: false,
                showCancelButton: true,
                confirmButtonText: "Register",
                showLoaderOnConfirm: true,
                preConfirm: () => {
                    let csrf_token =
                        document.getElementById("csrf_token").value;
                    let tag = document.getElementById("register-tag").value;
                    let email = document.getElementById("register-email").value;
                    let password =
                        document.getElementById("register-password").value;
                    let confirm_password = document.getElementById(
                        "register-confirm-password"
                    ).value;

                    if (confirm_password !== password) {
                        Swal.showValidationMessage("Passwords Do Not Match");
                        return false;
                    }

                    const body = {
                        method: "password",
                        password,
                        csrf_token,
                        traits: {
                            tag,
                            email,
                        },
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
                                "Registration Submit Response:" +
                                    JSON.stringify(responseJSON)
                            );

                            if (!response.ok) {
                                switch (response.status) {
                                    case (400):
                                        if (responseJSON.ui.messages) {
                                            throw new Error(responseJSON.ui.messages[0].text);
                                        }
                                        const errorNodes = responseJSON.ui.nodes.filter(node => node.messages.length > 0);
                                        if (errorNodes.length > 0) {
                                            throw new Error(errorNodes[0].messages[0].text);
                                        } else {
                                            throw new Error();
                                        }
                                    case (422):
                                        throw new Error(responseJSON.reason);
                                    case (500):
                                        throw new Error(responseJSON.error.reason);
                                    default:
                                        throw new Error();
                                }
                            }

                            return { tag: tag };
                        })
                        .catch((error) => {
                            if (!error.message) {
                                error.message = "Unknown Error"
                            }

                            Swal.showValidationMessage(
                                `Registration failed: ${error.message}`
                            );
                        });
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: `Welcome To FNF Central ${result.value.tag}!`,
                        text: "Make Sure To Confirm Your Email!  Check You Spam Folder If You Do Not See The Verification Email!",
                        icon: "success",
                    });
                    identityStore.refresh();
                }
            });
        })
        .catch((error) => {
            Swal.fire({
                title: "Registration Failure",
                icon: "error",
                text: `Registration Failed: ${error}`,
            });
        });
};
