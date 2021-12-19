---
sidebar_position: 4
---

# Setting Up Cert Manager

Now, we have to add cert-manager, which generates certificates automatically.

## Adding The Chart

Go to the `Charts` tab `Apps & Marketplace`. Search for `cert-manager`.

Then click the `Install` and set all the following values. Make sure to set the namespace to `fnfcentral-cert-manager`. (You can optionally set cert-manager to a namespace in System for easier organization in a multi project cluster)

- `installCRDs` should be set to `true`
- `metrics.serviceMonitor.enabled` should be set to `true`

## That's all

Well that's all the dependencies! Let's install the real deal!
