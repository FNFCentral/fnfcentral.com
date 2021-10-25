#!/bin/sh

cd ../testing_nginx/certs

openssl req -x509 -new -newkey rsa:4096 -nodes -keyout myCA.key -sha256 -days 1825 -out myCA.pem -subj "/CN=Automation!"

openssl req -new -newkey rsa:4096 -nodes -keyout fnfcentral.com.key -out fnfcentral.com.csr -subj "/CN=FNFCentral FAKE"

openssl x509 -req -in fnfcentral.com.csr -CA myCA.pem -CAkey myCA.key -CAcreateserial -out fnfcentral.com.crt -days 825 -sha256 -extfile ../fnfcentral.com.ext
