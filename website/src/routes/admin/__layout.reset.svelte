<script>
    import Swal from "sweetalert2";

    const login = async (e) => {
        e.preventDefault();

        const result = await Swal.fire({
            title: " Admin Login",
            html:
                '<input id="username" type="text" class="swal2-input" placeholder="Username">' +
                '<input id="password" type="password" class="swal2-input" placeholder="Password">',
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: "Login",
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                let username = document.getElementById("username").value;
                let password = document.getElementById("password").value;

                const body = {
                    username,
                    password,
                };

                try {
                    const response = await fetch("/api/a/login", {
                        method: "POST",
                        mode: "cors",
                        cache: "no-cache",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(body),
                        redirect: "manual",
                        credentials: "include",
                    });

                    console.log(
                        "Login Submit Response:" +
                            JSON.stringify(await response.json())
                    );

                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }

                    return { username };
                } catch (error) {
                    Swal.showValidationMessage(`Login failed: ${error}`);
                }
            },
        });

        if (result.isConfirmed) {
            Swal.fire({
                title: `Welcome Back ${result.value.username}!`,
                text: "Make Sure To Have Fun!",
                icon: "success",
            });
        } else {
            Swal.fire({
                title: "Login Failure",
                icon: "error",
                text: `Login Failed`,
            });
        }
    };
</script>

<div class="flex flex-row items-center masterBar">
    <p class="notSoUgly">FNF Central Admin Pages</p>
    <a href="/admin" class="notSoUgly">Directory</a>
    <button
        type="button"
        class="self-center rounded-lg p-2 mx-2 notSoUgly"
        on:click={login}>Log In</button
    >
    <div class="flex-grow" />
</div>

<div class="p-4">
    <slot />
</div>

<style>
    .notSoUgly {
        padding: 10px;
        color: green;
    }

    .masterBar {
        background-color: blanchedalmond;
    }
</style>
