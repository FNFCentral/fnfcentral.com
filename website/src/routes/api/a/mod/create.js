import adminAuth from "../../_adminAuth";
import prisma from "../../_database";

import generateModData from "../../_generateModData";

/** @type {import('@sveltejs/kit').RequestHandler} */
export const post = async (request) => {
    const authResponse = await adminAuth(request);

    if (!authResponse) {
        return { status: 401 };
    }

    const body = request.body;

    const modData = generateModData(body);

    const mod = await prisma.mod.create({
        data: modData,
    });

    return { body: { mod } };
};
