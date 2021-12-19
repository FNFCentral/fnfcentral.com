---
sidebar_position: 3
---

# Data Storage

To store data for stateful software we will use [Longhorn](https://longhorn.io). This adds a ton of safety.

:::tip Using Cloud Host

If you are using a cloud hosted Kubernetes provider or followed the Linode steps earlier, you can skip this one!

:::

## Installation

Installing Longhorn with Rancher is super easy.

First, go to `Charts` under `Apps & Marketplace`. Search for Longhorn and click it, then click `Install`.

On the first menu select `Longhorn` as the project.

On the second menu select the options you want. We recommend the following at changes though:

- In production enter a `Backup Target` on stable clusters under `Longhorn Default Settings` (Click the `Customize Default Settings` to see the textbox) (Create A Secret Store First)
- Make sure `Default Storage Class Replica Count` under `Longhorn Storage Class Settings` is not higher than the number of nodes in the cluster.
