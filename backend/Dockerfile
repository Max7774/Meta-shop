FROM node:21.5.0

WORKDIR /backend_meta_shop

COPY package*.json yarn.lock ./

RUN yarn install

COPY . .

RUN npx prisma generate

RUN yarn build

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && yarn seed && yarn start"]