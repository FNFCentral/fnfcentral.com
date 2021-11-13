FROM node as buildStage

WORKDIR /website

COPY ./package.json /website/package.json

COPY ./package-lock.json /website/package-lock.json

RUN npm ci

COPY ./ /website/

RUN npm run build

FROM node

WORKDIR /website

COPY ./package.json /website/package.json

COPY ./package-lock.json /website/package-lock.json

COPY --from=buildStage /website/build/ /website/build/

CMD [ "node", "build" ]