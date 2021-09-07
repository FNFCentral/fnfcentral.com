FROM node as buildStage

WORKDIR /frontend

COPY ./package.json /frontend/package.json

COPY ./package-lock.json /frontend/package-lock.json

RUN npm ci

COPY ./ /frontend/

RUN npm run build

FROM nginx

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=buildStage /frontend/build /usr/share/nginx/html