// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: "FNF Central Docs",
    tagline: "The Super Awesome Docs For Everything FNF Central",
    url: "https://docs.fnfcentral.com",
    baseUrl: "/",
    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "warn",
    favicon: "img/favicon.ico",
    organizationName: "fnfcentral",
    projectName: "fnfcentral.com",

    presets: [
        [
            "@docusaurus/preset-classic",
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: require.resolve("./sidebars.js"),
                    editUrl:
                        "https://github.com/fnfcentral/fnfcentral.com/edit/main/docs/",
                },
                blog: {
                    showReadingTime: true,
                    editUrl:
                        "https://github.com/fnfcentral/fnfcentral.com/edit/main/docs/blog/",
                },
                theme: {
                    customCss: require.resolve("./src/css/custom.css"),
                },
            }),
        ],
    ],

    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            navbar: {
                title: "FNF Central Docs",
                logo: {
                    alt: "FNF Central Logo",
                    src: "img/logo.svg",
                },
                items: [
                    {
                        type: "doc",
                        docId: "SuperSickAPI/intro",
                        position: "left",
                        label: "SuperSickAPI",
                    },
                    {
                        type: "doc",
                        docId: "httpAPI/intro",
                        position: "left",
                        label: "HttpAPI",
                    },
                    {
                        type: "doc",
                        docId: "deployment/intro",
                        position: "left",
                        label: "Deployment",
                    },
                    { to: "/blog", label: "Blog", position: "left" },
                    {
                        href: "https://github.com/fnfcentral/fnfcentral.com",
                        label: "GitHub",
                        position: "right",
                    },
                ],
            },
            footer: {
                style: "dark",
                links: [
                    {
                        title: "FNF Central",
                        items: [
                            {
                                label: "Website",
                                to: "https://fnfcentral.com",
                            },
                        ],
                    },
                    {
                        title: "Community",
                        items: [
                            {
                                label: "Discord",
                                href: "https://discord.gg/daq9Q4hYWM",
                            },
                            {
                                label: "Twitter",
                                href: "https://twitter.com/fnfcentral",
                            },
                        ],
                    },
                    {
                        title: "More",
                        items: [
                            {
                                label: "Blog",
                                to: "/blog",
                            },
                            {
                                label: "GitHub",
                                href: "https://github.com/fnfcentral/fnfcentral.com",
                            },
                        ],
                    },
                ],
                copyright: `Copyright © ${new Date().getFullYear()} Dual Vipers LLC. Built with Docusaurus.`,
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,
            },
        }),
};

module.exports = config;
