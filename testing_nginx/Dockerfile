FROM nginx

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# HTML
COPY ./nice_try.html /etc/nginx/html/nice_try.html

# Configs
COPY ./proxy.conf /etc/nginx/proxy.conf
COPY ./https.conf /etc/nginx/https.conf

# Certs
COPY ./certs/local.fnfcentral.com.crt /etc/nginx/certs/local.fnfcentral.com.crt
COPY ./certs/local.fnfcentral.com.key /etc/nginx/certs/local.fnfcentral.com.key