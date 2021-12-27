---
slug: 0.0.5-and-outages
title: 0.0.5 Release and First Outage
authors: jred
---

## 0.0.5

This is mostly a QoL update, with a few new nice features. Nothing groundbreaking, as I am currently on Holiday vacation in a totally different state.

## The Outage

<!--truncate-->

At approximately 23:50 UTC on the 23rd, one of the worker nodes went offline. Within 5 minuets the entire cluster had collapsed, as there are only two worker nodes in the Canary. The server was back online 00:19 on the 24th.

![Boyfriend Miss](./DoBetter.gif)

Thanks to some late notice from Linode, I learned that this was a hardware failure that forced them to relocate my node which was running one of the two workers, bringing it offline for about 30 minuets. Why it took that long, don't ask me. All this really proved was that the official cluster will be at least three nodes.

## Changes in The Update

### New Features

- Account Recovery (Yes I Know Email Still Does Not Work On the Canary)
- Added Error Page
- Added Dashboard (Kinda)

### Changes

- Added Output for Registration and Login
- Removed FNF OG From Home Page As It Longer Is Supported

### Bug Fixes

- Fixed Weird Bug That Rarely Happens On Game Page
