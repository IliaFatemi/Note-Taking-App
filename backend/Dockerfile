FROM node:14-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk add --no-cache openssl && \
    wget -q https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-alpine-linux-amd64-v0.6.1.tar.gz && \
    tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-v0.6.1.tar.gz && \
    rm dockerize-alpine-linux-amd64-v0.6.1.tar.gz

RUN npm install

COPY . .

EXPOSE 3000

CMD dockerize -wait tcp://db:5432 -timeout 60s node server.js
