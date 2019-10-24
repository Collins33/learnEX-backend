# get base image
FROM node:10-alpine

MAINTAINER collins njau <collins.muru@andela.com>

COPY package*.json ./
RUN npm install


CMD ["npm", "start"]