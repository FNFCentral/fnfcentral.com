const axios = require("axios");
const AdmZip = require("adm-zip");
const { create } = require("ipfs-http-client");
const path = require("path");

const ipfs = create("http://" + process.env.IPFS_CLIENT_API);

const addFile = async (buffer) => {
    const file = await ipfs.add(buffer);

    const cid = file.cid.toString();

    console.log(cid);

    return pinCID(cid);
};

const addDir = async (zipBuffer) => {
    const zippedFiles = new AdmZip(zipBuffer);

    const unfilteredFiles = [];

    zippedFiles.getEntries().forEach((entry) => {
        unfilteredFiles.push({
            path: "/" + entry.entryName,
            content: entry.getData(),
        });
    });

    const files = unfilteredFiles.filter(
        (file) => path.extname(file.path).length > 0
    );

    files.forEach((file) => console.log(file.path + " " + file.content.length));

    console.log("Uploading: " + files);

    const whyDoIHaveToMakeThisAnObjectToBeGlobalJS = { cid: null };

    for await (const file of ipfs.addAll(files, {
        wrapWithDirectory: true,
        fileImportConcurrency: process.env.IPFS_FILE_IMPORT_CONCURRENCY || 1,
        progress: (bytes, progressFile) => {
            console.log(`File progress ${progressFile} ${bytes}`);
        },
    })) {
        console.log(`Added File: ${file.path} ${file.cid}`);
        if (file.path == "") {
            whyDoIHaveToMakeThisAnObjectToBeGlobalJS.cid = file.cid;
        }
    }

    // Don't know why I have to do this even with the await
    while (!whyDoIHaveToMakeThisAnObjectToBeGlobalJS.cid);

    const cid = whyDoIHaveToMakeThisAnObjectToBeGlobalJS.cid.toString();

    console.log(cid);

    return pinCID(cid);
};

const pinCID = async (cid) => {
    console.log("Pinning: " + cid);
    const response = await axios.post(
        "http://" +
            process.env.IPFS_CLUSTER_API +
            "/pins/" +
            cid +
            "?mode=recursive&name=&replication-max=0&replication-min=0&shard-size=0&user-allocations="
    );

    return response.data.cid["/"];
};

const unpinCID = async (cid) => {
    await axios.delete(
        "http://" + process.env.IPFS_CLUSTER_API + "/pins/" + cid
    );

    return cid;
};

module.exports = { addFile, addDir, pinCID, unpinCID };
