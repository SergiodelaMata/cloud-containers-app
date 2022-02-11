FROM node:alpine3.10

#App directory creation
WORKDIR /usr/src/cloud-containers-app

#Maven dependencies installation for the app
COPY package*.json ./

RUN npm install

#Bundle app source
COPY . .

EXPOSE 3000
CMD ["npm", "start"]