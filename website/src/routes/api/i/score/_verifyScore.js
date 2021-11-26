import prisma from "../../_database";

export default async (diffID, userID, score) => {
    const diff = await prisma.diff.findUnique({ where: { diffID } });

    if (!diff) return false;

    if (diff.maxScore == 0) {
        console.log(
            `${userID} sent in score for ${diffID} that had no max score.`
        );
        return true;
    }

    if (score >= diff.maxScore) {
        console.log(
            `${userID} sent in score of ${score} for ${diffID} that was higher than the allowed score of ${diff.maxScore}.`
        );
        return false;
    }

    console.log(
        `${userID} sent in score of ${score} for ${diffID} that was okay with the allowed score of ${diff.maxScore}.`
    );

    return true;
};
