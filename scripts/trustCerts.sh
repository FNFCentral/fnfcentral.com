#!/bin/sh

cp ../testing_nginx/certs/myCA.pem /usr/local/share/ca-certificates/myCA.pem

update-ca-certificates