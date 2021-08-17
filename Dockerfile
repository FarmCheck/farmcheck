FROM node:14-buster-slim AS builder

WORKDIR /app

COPY package.json .
COPY internals internals

RUN yarn install

COPY . .

RUN yarn build

FROM nginx:1.19-alpine

COPY --from=builder /app/build /usr/share/nginx/html

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
