FROM node:alpine

RUN mkdir /app
WORKDIR /app

COPY package.json package.json
COPY tsconfig.json tsconfig.json

RUN npm i

COPY src src

CMD npm start