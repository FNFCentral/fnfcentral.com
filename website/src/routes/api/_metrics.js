const client = require("prom-client");

const register = new client.Registry();

register.setDefaultLabels({
    app: "fnf-central",
});

client.collectDefaultMetrics({ register });

const scoresProcessed = new client.Counter({
    name: "fnfcentral_scores_processed_total",
    help: "The number of scores processed, total",
});

register.registerMetric(scoresProcessed);

const extraInfoChangesProcessed = new client.Counter({
    name: "fnfcentral_extra_info_changes_processed_total",
    help: "The number of extra info changes processed, total",
});

register.registerMetric(extraInfoChangesProcessed);

const settingChangesProcessed = new client.Counter({
    name: "fnfcentral_setting_changes_processed_total",
    help: "The number of setting changes processed, total",
});

register.registerMetric(settingChangesProcessed);

export {
    register,
    scoresProcessed,
    extraInfoChangesProcessed,
    settingChangesProcessed,
};
