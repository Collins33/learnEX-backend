# get base image
FROM node:10-alpine

WORKDIR /usr/src/app

MAINTAINER collins njau <collins.muru@andela.com>

COPY package*.json ./
RUN npm install


CMD ["npm", "start"]