<script context="module">
    /** @type {import('@sveltejs/kit').ErrorLoad} */
    export function load({ error, status }) {
        return {
            props: {
                message: `${status}: ${error.message}`,
            },
        };
    }
</script>

<script>
    export let message;
</script>

<svelte:head>
    <title>{message}</title>
    <meta name="robots" content="noindex" />
</svelte:head>

<div class="flex flex-col justify-start items-center" style="width: 100%;">
    <img src="/DoBetter.gif" alt="Error BF" style="max-width: 400px;" />

    <h1>{message}</h1>
</div>
