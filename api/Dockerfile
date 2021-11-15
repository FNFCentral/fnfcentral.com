FROM node

WORKDIR /api

COPY ./package.json /api/package.json

COPY ./package-lock.json /api/package-lock.json

RUN npm ci --include=dev

COPY ./prisma/ /api/prisma/

RUN npm run generate

COPY ./ /api/

CMD [ "npm", "run", "start" ] 