FROM node as buildStage

ARG MODE

WORKDIR /website

COPY ./package.json /website/package.json

COPY ./package-lock.json /website/package-lock.json

RUN npm ci

COPY ./prisma/ /website/prisma/

RUN npm run generate

COPY ./ /website/

RUN npm run build

FROM node

WORKDIR /website

COPY ./package.json /website/package.json

COPY ./package-lock.json /website/package-lock.json

COPY --from=buildStage /website/node_modules/ /website/node_modules/

COPY --from=buildStage /website/prisma/ /website/prisma/

COPY --from=buildStage /website/build/ /website/build/

CMD [ "node", "build" ]