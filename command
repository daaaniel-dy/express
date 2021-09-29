- pm2 log not to refresh
pm2 start main.js --watch --ignore-watch="data/* sessions/*"  --no-daemon

- turn off pm2
pm2 kill

- MariaDB
cd C:/Bitnami/wampstack-8.0.11-0/mariadb/bin

- MariaDB execute
./mysql -uroot -p

- master
D:/workspace/nodejs_web