FROM node:14.17-alpine
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
COPY . .

ARG REDIS_URL

EXPOSE 8085

CMD [ "npm", "run", "dev" ]