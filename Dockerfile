FROM node:latest
WORKDIR /usr/src/youcook-backend
COPY package.json .
RUN npm install
COPY . .
EXPOSE ${API_PORT}
CMD [ "node", "index.js" ]