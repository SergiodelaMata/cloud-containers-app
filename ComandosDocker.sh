docker run -d -p 6379:6379 --name redisservice redis:6.0.9-alpine

docker run -it --detach --name cloud-containers-mysql -p 3308:3306 -v mysql-volume:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=CloudContainers202122 -d mysql:latest

docker network create mongodb-net
docker run -d -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=password --name mongodb --net mongodb-net mongo
docker run -d -p 8082:8081 -e ME_CONFIG_MONGODB_ADMINUSERNAME=admin -e ME_CONFIG_MONGODB_ADMINPASSWORD=password -e ME_CONFIG_MONGODB_SERVER=mongodb --name mongo-express --net mongodb-net mongo-express

docker logs mongo-express
docker-compose up -f mongo-docker-compose.yaml
docker-compose down -f mongo-docker-compose.yaml

docker stop $(docker ps -aq)

docker login -u sergiomata99
docker image tag aplicacion sergiomata99/aplicacion
docker push sergiomata99/aplicacion