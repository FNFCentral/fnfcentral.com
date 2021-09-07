# FNFCentral.com Is Open Source BABY

## Setup

Run the docker-compose.yml to set everything up.

WARNING:

You must redirect all fnfcentral.com required addresses to localhost as they are all hardcoded. Follow the instructions for your system below.

### Gitpod

It should just work! Yay automation!

### Windows

Add the line `127.0.0.1 fnfcentral.com analytics.fnfcentral.com api.fnfcentral.com metrics.fnfcentral.com raw.fnfcentral.com` to `C:\Windows\System32\drivers\etc\hosts`. You do need admin privileges to edit this file.

### Mac and Linux

Add the line `127.0.0.1 fnfcentral.com analytics.fnfcentral.com api.fnfcentral.com metrics.fnfcentral.com raw.fnfcentral.com` to `/etc/hosts`. You do need admin privileges or sudo to edit this file.
