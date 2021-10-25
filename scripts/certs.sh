#!/bin/sh

openssl req -x509 -new -newkey rsa:4096 -nodes -keyout ../testing_nginx/certs/myCA.key -sha256 -days 1825 -out ../testing_nginx/certs/myCA.pem -subj "/CN=Automation!"

openssl req -new -newkey rsa:4096 -nodes -keyout ../testing_nginx/certs/fnfcentral.com.key -out ../testing_nginx/certs/fnfcentral.com.csr -subj "/CN=FNFCentral FAKE"

openssl x509 -req -in ../testing_nginx/certs/fnfcentral.com.csr -CA ../testing_nginx/certs/myCA.pem -CAkey ../testing_nginx/certs/myCA.key -CAcreateserial -out ../testing_nginx/certs/fnfcentral.com.crt -days 825 -sha256 -extfile ../testing_nginx/certs/fnfcentral.com.ext
