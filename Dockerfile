FROM node:alpine3.10

ENV SRV_REDIS_NOMBRE=redis \
    SRV_REDIS_PUERTO=6379 \
    SRV_MONGO_NOMBRE=mongodb \
    SRV_MONGO_PUERTO=27017 \
    SRV_MONGOO_USUARIO=admin \
    SRV_MONGO_CONTRAS=password

RUN mkdir -p /home/cloud-containers-app/cloud-containers-app
WORKDIR /home/cloud-containers-app/cloud-containers-app
COPY . ./
CMD ["node", "index.js"]