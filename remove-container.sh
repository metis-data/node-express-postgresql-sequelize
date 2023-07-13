ssh-keygen -R '[localhost]:58222'
pkill -f "ssh -i $(pwd)/ssh_tunnel/tunnel_rsa tunnel@localhost -p 58222"
docker stop node_express_postgresql_sequelize -t 1
docker rm --force node_express_postgresql_sequelize
docker rmi --force node_express_postgresql_sequelize
docker stop node_express_postgresql_sequelize_ssh -t 1
docker rm --force node_express_postgresql_sequelize_ssh
docker rmi --force node_express_postgresql_sequelize_ssh
docker rmi --force public.ecr.aws/o2c0x5x8/community-images-backup:lscr.io-linuxserver-openssh-server
docker rmi --force public.ecr.aws/o2c0x5x8/application-base:node-express-postgres-sequelize
docker system prune
docker volume prune