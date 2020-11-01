FROM node:alpine AS base

WORKDIR /app
COPY package.json .
COPY tsconfig.json .
ADD ./src ./src
RUN npm i && npm i -g typescript && tsc

FROM node:15-alpine

WORKDIR /app
COPY package.json .
COPY --from=base /app/dist/ .
RUN npm i --only=production
EXPOSE 4000

CMD node index.js