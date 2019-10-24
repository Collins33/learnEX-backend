# get base image
FROM node:10

# create directory to hold the application code
WORKDIR /usr/src/app

MAINTAINER collins njau <collins.muru@andela.com>

# install app dependencies
# the wildcard ensures that both package.json and package-lock.json are copied
COPY package*.json ./

RUN npm install

# Bundle app source code inside the Docker image
COPY . .

EXPOSE 3000

CMD ["npm", "start"]