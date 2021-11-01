FROM node

WORKDIR /ipfs

ADD https://dist.ipfs.io/ipfs-cluster-ctl/v0.14.1/ipfs-cluster-ctl_v0.14.1_linux-amd64.tar.gz /ipfs/

RUN tar -zxvf ipfs-cluster-ctl_v0.14.1_linux-amd64.tar.gz

WORKDIR /api

COPY ./package.json /api/package.json

COPY ./package-lock.json /api/package-lock.json

RUN npm ci --include=dev

COPY ./prisma/ /api/prisma/

RUN npm run generate

COPY ./ /api/

CMD [ "npm", "run", "start" ] 