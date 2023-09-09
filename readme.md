# YouCook-Backend

## Backend for YouCook application

this is the backend api for Youcook application

it's an express.js application to serve data for the angular frontend

### How to run on docker container
- clone repository 
- run `docker compose -f docker-compose.yml up` this will create 2 container in a network called `yc-backend` 
- run migration in the `migration` folder
- the express.js api is served at port 8039
