---
sidebar_position: 3
---

# Setting Up QuestDB

First we have to set up the time series database, QuestDB.

## Adding The Chart

Go to the `Charts` tab `Apps & Marketplace`. Search for `questdb`.

Then click the `Install` and set all the following values. Make sure to set the namespace to `fnfcentral-questdb`.

- `service.expose.influxdb.enabled` should be set to `true`
- `service.expose.postgresql.enabled` should be set to `true`
