deployment of application is done trough docker, the backend server image can be pulled with:

```bash
docker pull carnivuth/youcook-backend:latest
```

the db can be pulled with:

```bash
docker pull carnivuth/youcook-db:latest
```

the image expose the port `8039` in http

you need also to mount a `.env` file in `/usr/src/youcook-backend/.env` as showed [here](https://github.com/carnivuth/youcook-backend/blob/main/.env-dev) 

the best way to run it is to use a [docker compose file](https://github.com/carnivuth/youcook-backend/blob/main/docker-compose-dev.yaml)


