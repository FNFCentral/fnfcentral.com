# Setup

There are a few steps you have to complete before you can run a self hosted version of FNF Central. Just follow the steps and you'll be fine.

## HTTPS Certification

HTTPS is also hard coded for security reasons. Don't worry, its really easy to set up.

WARNING: You may have to restart your browser and/or computer.

### Gitpod

It should just work! Yay automation!

### Already Have A Root Cert

1. First, go to the `testing_nginx/certs` folder. `cd ./testing_nginx/certs`

2. Now, generate the certs key and CSR. `openssl genrsa -out local.fnfcentral.com.key 2048` `openssl req -new -key local.fnfcentral.com.key -out local.fnfcentral.com.csr`

3. Let's generate that certificate! Any options that pop are yours to fill! `openssl x509 -req -in local.fnfcentral.com.csr -CA CHANGE_TO_CA_PEM_PATH -CAkey CHANGE_TO_CA_KEY_PATH -CAcreateserial -out local.fnfcentral.com.crt -days 825 -sha256 -extfile local.fnfcentral.com.ext`

### All Platforms

1. First, go to the `testing_nginx/certs` folder. `cd ./testing_nginx/certs`

2. Next generate a root private key and root certificate (make sure you have openssl). If options show up, use anything you want! `openssl genrsa -des3 -out myCA.key 2048 && openssl req -x509 -new -nodes -key myCA.key -sha256 -days 1825 -out myCA.pem`

3. Now, generate the certs key and CSR. `openssl genrsa -out local.fnfcentral.com.key 2048` `openssl req -new -key local.fnfcentral.com.key -out local.fnfcentral.com.csr`

4. Finally, let's generate that certificate! Any options that pop are yours to fill! `openssl x509 -req -in local.fnfcentral.com.csr -CA myCA.pem -CAkey myCA.key -CAcreateserial -out local.fnfcentral.com.crt -days 825 -sha256 -extfile local.fnfcentral.com.ext`

5. Well, we generated the certificate. What's left? You still have to make you device trust the certificate. Look below for you platform on how to do that!

#### Windows

Just run `certutil -addstore -f "ROOT" myCA.pem` in the terminal in `testing_nginx/certs` as an admin.

#### Mac

Just run `sudo security add-trusted-cert -d -r trustRoot -k "/Library/Keychains/System.keychain" myCA.pem`

#### Linux

This is a very distro specific process. Please look up the steps for your specific distro.
