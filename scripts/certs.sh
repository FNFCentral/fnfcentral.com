#!/bin/sh

cd ../testing_nginx/certs

openssl genrsa -des3 -out myCA.key 2048 && openssl req -x509 -new -nodes -key myCA.key -sha256 -days 1825 -out myCA.pem

openssl genrsa -out fnfcentral.com.key 2048

openssl req -new -key fnfcentral.com.key -out fnfcentral.com.csr

openssl x509 -req -in fnfcentral.com.csr -CA myCA.pem -CAkey myCA.key -CAcreateserial -out fnfcentral.com.crt -days 825 -sha256 -extfile fnfcentral.com.ext
