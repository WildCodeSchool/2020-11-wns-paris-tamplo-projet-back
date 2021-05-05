# PROD Dockerfile
# this is the stage one , also know as the build step
FROM node:alpine AS stage

WORKDIR /app

COPY package.json package.json
COPY tsconfig.json tsconfig.json

RUN npm i

COPY src src

RUN npm run build

# this is stage two, where the app actually runs
FROM node:alpine

WORKDIR /app

COPY package.json package.json

RUN npm install --only=production

COPY --from=stage /app/build ./build

CMD npm run start