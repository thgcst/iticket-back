FROM node:alpine

RUN apk add --no-cache tzdata
ENV TZ America/Sao_Paulo
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /usr/app

COPY package.json yarn.lock ./
RUN yarn

COPY . .

RUN yarn build

EXPOSE 5000

CMD ["yarn", "start"]