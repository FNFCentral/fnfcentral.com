FROM node

WORKDIR /api

COPY ./package.json /api/package.json

COPY ./package-lock.json /api/package-lock.json

RUN npm ci --include=dev

COPY ./ /api/

RUN npx prisma generate

CMD [ "npm", "run", "start" ] 