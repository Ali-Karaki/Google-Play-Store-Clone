FROM node:16-alpine

WORKDIR /server

COPY package*.json ./

RUN npm install

COPY . .

ENV MONGO_URI=${MONGO_URI}

EXPOSE 3001

CMD ["npm", "start"]
