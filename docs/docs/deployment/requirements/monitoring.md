---
sidebar_position: 1
---

# Setting Up Monitoring

Now, we have to add Monitoring, which adds prometheus, grafana, and more to your cluster.

## Adding The Chart

Go to the `Charts` tab `Apps & Marketplace`. Search for `Monitoring`.

Click `Install` and move through the menus. Make sure to set the project to `Monitoring`.

Under `Prometheus` click on the box labeled `Persistent Storage for Prometheus`. Set the `Storage Class Name` to `longhorn`.
