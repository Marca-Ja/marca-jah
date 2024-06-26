FROM node:alpine

WORKDIR /app


COPY . .
COPY  ./.env-docker ./.env
COPY package*.json ./

RUN npm i --quiet --no-optional --no-fund --loglevel=error

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
