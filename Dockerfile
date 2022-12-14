FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm i -g @nestjs/cli

COPY . .

CMD [ "npm", "run", "start", "dev" ]

EXPOSE 3000