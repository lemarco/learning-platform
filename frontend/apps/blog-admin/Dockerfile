FROM node:alpine as builder
RUN npm i -g pnpm 

WORKDIR /app
COPY ./frontend/package*.json /app/
COPY .env /app/.env

RUN pnpm i 
ENV FRONTEND_FOOTER_APP_PORT $FRONTEND_FOOTER_APP_PORT
EXPOSE $FRONTEND_FOOTER_APP_PORT
CMD ["pnpm", "run", "dev:blog-admin"]
