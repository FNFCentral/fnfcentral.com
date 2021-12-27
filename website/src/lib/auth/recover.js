import Swal from "sweetalert2";

import { userURL } from "../modeData";

export default () => {
    Swal.fire({
        title: "Recovery",
        text: "Setting Things Up!\nPlease wait a moment!",
        showConfirmButton: false,
    });

    fetch("https://" + userURL + "/self-service/recovery/browser", {
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
                "Recovery Init Response:" + JSON.stringify(initResponseJSON)
            );

            Swal.fire({
                title: "Recovery",
                html:
                    `<input id="csrf_token" type="hidden" hidden value=${initResponseJSON.ui.nodes[0].attributes.value}>` +
                    '<input id="recovery-email" type="email" class="swal2-input" placeholder="bf@fnfcentral.com">',
                focusConfirm: false,
                showCancelButton: true,
                confirmButtonText: "Recovery",
                showLoaderOnConfirm: true,
                preConfirm: () => {
                    let csrf_token =
                        document.getElementById("csrf_token").value;
                    let email = document.getElementById("recovery-email").value;

                    const body = {
                        method: "link",
                        csrf_token,
                        email,
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
                                "Recovery Submit Response:" +
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
                                    case 500:
                                        throw new Error(
                                            responseJSON.error.reason
                                        );
                                    default:
                                        throw new Error();
                                }
                            }

                            return { email: email };
                        })
                        .catch((error) => {
                            if (!error.message) {
                                error.message = "Unknown Error";
                            }

                            Swal.showValidationMessage(
                                `Recovery failed: ${error.message}`
                            );
                        });
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: `Recovery Email Sent To ${result.value.email}!`,
                        text: "If you do not see it, please check your spam folder and wait a few minuets.",
                        icon: "success",
                    });
                }
            });
        })
        .catch((error) => {
            Swal.fire({
                title: "Recovery Failure",
                icon: "error",
                text: `Recovery Failed: ${error}`,
            });
        });
};
