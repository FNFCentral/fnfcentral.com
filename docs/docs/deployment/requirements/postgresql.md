---
sidebar_position: 2
---

# Setting Up PostgreSQL

First we have to set up the primary database, PostgreSQL.

## Adding The Chart

Go to the `Charts` tab `Apps & Marketplace`. Search for `postgresql`. There should be two charts that show up, a standard chart and high availability chart. You can use either, though we recommend the high availability chart for production.

Then click the `Install` and set all the following values. Make sure to set the namespace to `fnfcentral-sql`.

- `global.postgresql.password` should be set to the desired SQL root password
- `global.storageClass` should be set to `longhorn` (This can be skipped, though NOT recommended)
- `metrics.enabled` should be `true`
- `metrics.serviceMonitor.enabled` should be `true`
