import { writable } from "svelte/store";

import getCurUser from "../api/getCurUser";

const createAuthStore = () => {
    const { subscribe, set, update } = writable(undefined);

    return {
        subscribe,
        refresh: async () => {
            const newIdentity = await getCurUser();
            update(() => {
                console.log("Identity Updating To " + newIdentity.id);
                return newIdentity;
            });
        },
        reset: () => set(undefined),
    };
};

export default createAuthStore();
