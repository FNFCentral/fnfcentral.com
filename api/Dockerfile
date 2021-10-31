FROM node

WORKDIR /api

COPY ./package.json /api/package.json

COPY ./package-lock.json /api/package-lock.json

RUN npm ci --include=dev

COPY ./ /api/

RUN npm run generate

CMD [ "npm", "run", "start" ] 