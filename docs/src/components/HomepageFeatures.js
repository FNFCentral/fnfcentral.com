import React from "react";
import clsx from "clsx";
import styles from "./HomepageFeatures.module.css";

const FeatureList = [
    {
        title: "Game API",
        ImgFile: require("../../static/img/boyfriend/bfanim.gif").default,
        description: (
            <>
                Want to integrate the FNF Central API into your mod? Well just
                go to the <code>SuperSickAPI</code> docs! We outline how to add
                it to any engine, along with step by steps for major engines!
            </>
        ),
    },
    {
        title: "HTTP API",
        ImgFile: require("../../static/img/boyfriend/bf.png").default,
        description: (
            <>
                FNF Central has an api that is split into three chunks. The API
                documentation is generated from an OpenAPI file. You can find
                that file in the github repository.
            </>
        ),
    },
    {
        title: "Deployment",
        ImgFile: require("../../static/img/boyfriend/bfpixelanim.gif").default,
        description: (
            <>
                You can use docker compose to deploy a local version of the
                website. But to deploy the canary and official websites, we have
                an extremely easy tutorial! (This was really made for internal
                uses, so take a peek if you dare)
            </>
        ),
    },
];

function Feature({ ImgFile, title, description }) {
    return (
        <div className={clsx("col col--4")}>
            <div className="text--center">
                <img src={ImgFile} className={styles.featureImg} alt={title} />
            </div>
            <div className="text--center padding-horiz--md">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    );
}

export default function HomepageFeatures() {
    return (
        <section className={styles.features}>
            <div className="container">
                <div className="row">
                    {FeatureList.map((props, idx) => (
                        <Feature key={idx} {...props} />
                    ))}
                </div>
            </div>
        </section>
    );
}
