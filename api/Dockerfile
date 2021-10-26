FROM node

WORKDIR /api

COPY ./ /api/

RUN npm ci

ENTRYPOINT [ "npm", "run", "start" ] 