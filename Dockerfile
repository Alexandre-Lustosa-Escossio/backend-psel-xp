FROM node:alpine

WORKDIR /BACKEND-XP

COPY package.json .

RUN npm install

COPY . .

CMD ["node", "./src/index.js"]
