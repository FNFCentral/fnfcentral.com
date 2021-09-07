/** @type {import("snowpack").SnowpackUserConfig } */
export default {
    mount: {
        public: "/",
        src: "/dist",
        ".routify": "/.routify",
    },
    plugins: [
        "@snowpack/plugin-postcss",
        "@snowpack/plugin-svelte",
        "@snowpack/plugin-sass",
    ],
    routes: [
        {
            match: "routes",
            src: ".*",
            dest: "/index.html",
        },
    ],
    optimize: {
        /* Example: Bundle your final build: */
        // "bundle": true,
    },
    packageOptions: {
        /* ... */
    },
    devOptions: {
        tailwindConfig: "./tailwind.config.js",
    },
    buildOptions: {
        /* ... */
    },
};
