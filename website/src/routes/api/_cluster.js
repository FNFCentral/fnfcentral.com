import axios from "axios";

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

export { pinCID, unpinCID };
