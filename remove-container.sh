docker stop node_express_postgresql_sequelize
docker rm node_express_postgresql_sequelize
docker rmi --force node_express_postgresql_sequelize
docker stop node_express_postgresql_sequelize_ssh
docker rm node_express_postgresql_sequelize_ssh
docker rmi lscr.io/linuxserver/openssh-server:latest
docker rmi --force node-express-postgresql-sequelize
docker system prune
docker volume prune