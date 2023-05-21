ssh-keygen -R '[localhost]:58222'
pkill -f "ssh -i $(pwd)/ssh_tunnel/tunnel_rsa tunnel@localhost -p 58222"
docker stop node_express_postgresql_sequelize
docker rm node_express_postgresql_sequelize
docker rmi --force node_express_postgresql_sequelize
docker stop node_express_postgresql_sequelize_ssh
docker rm node_express_postgresql_sequelize_ssh
docker rmi lscr.io/linuxserver/openssh-server:latest
docker system prune
docker volume prune