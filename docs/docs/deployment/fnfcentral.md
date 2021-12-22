---
sidebar_position: 5
---

# Install FNF Central

All the dependencies are now installed! Let's get FNF Central working!

## Adding The Chart

Go to the `Charts` tab `Apps & Marketplace`. Search for `FNF-Central-Chart`.

Then click the `Install` and set all the following values. Make sure to set the namespace to `fnfcentral`.

These are the options you need to set.

- `fnfcentral`
  - `database`
    - `domain` should be set to `postgresql-postgresql-ha-postgresql.fnfcentral-sql.svc.cluster.local`
    - `password` should be set to the PostgreSQL password you set earlier
  - `domain` should be the url of the base website
  - `jwt`
    - `secret` should be a super duper secret
  - `kratos`
    - `url` this will be removed soon
  - `ldap`
    - `bind`
      - `dn` the dn of the user to bind to
      - `pass` the password of the user to bind to
    - `search`
      - `base` the base to search users from
      - `filter` the filter to search for users with
    - `url` the url of the ldap server
  - `sslMode` probably should be `self` unless you know what you are doing
- `kratos`
  - `database`
    - `domain` should be set to `postgresql-postgresql-ha-postgresql.fnfcentral-sql.svc.cluster.local`
    - `password` should be set to the PostgreSQL password you set earlier
  - `domain` should be the url of the kratos website
  - `email`
    - `domain` the domain name of the email address
    - `name` the name of the email address
  - `smtps`
    - `domain` should be the domain of the smtps server
    - `password` should be the password of the user of the smtps server
    - `port` should be the port of the smtps server
    - `username` should be the username of the user of the smtps server
  - `sslMode` probably should be `self` unless you know what you are doing

## What Next?

Now that we have FNF Central running, let's get metrics working!
