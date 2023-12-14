FROM mysql:latest
COPY . .
COPY *.sql /docker-entrypoint-initdb.d/
WORKDIR /data
EXPOSE 3306
 
CMD [ "mysqld" ]