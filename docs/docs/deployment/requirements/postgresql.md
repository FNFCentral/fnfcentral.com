---
sidebar_position: 2
---

# Setting Up PostgreSQL

First we have to set up the primary database, PostgreSQL.

## Adding The Chart

Go to the `Charts` tab `Apps & Marketplace`. Search for `postgresql`. There should be two charts that show up, a standard chart and high availability chart. You can use either, though we recommend the regular chart as it is way less likely to have issues.

Then click the `Install` and set all the following values. Make sure to set the namespace to `fnfcentral-sql`.

- `global.postgresql.postgresqlPassword` should be set to the desired SQL root password
- `global.postgresql.postgresqlDatabase` should be set to `postgres`
- `global.storageClass` should be set to `longhorn` (This can be skipped, though NOT recommended)
- `metrics.enabled` should be `true`
- `metrics.serviceMonitor.enabled` should be `true`
