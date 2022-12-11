FROM node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY ./dist .

EXPOSE 3000

CMD ["node","index.js"]