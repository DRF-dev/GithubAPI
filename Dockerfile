FROM node:alpine

WORKDIR /app
COPY . .
EXPOSE 4000
RUN npm i

CMD [ "npm", "start" ]
