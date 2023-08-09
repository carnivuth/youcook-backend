FROM node:20
WORKDIR /usr/src/youcook-backend
COPY package.json .
RUN npm install
COPY . .
EXPOSE 8039
CMD [ "node", "index.js" ]