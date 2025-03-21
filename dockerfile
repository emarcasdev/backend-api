FROM node:16-bullseye

WORKDIR /api/index

COPY . .

RUN npm install

EXPOSE 5000

CMD [ "npm", "start"]

