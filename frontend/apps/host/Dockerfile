FROM node:alpine as builder
RUN npm i -g pnpm 

WORKDIR /app
COPY ./frontend/package*.json /app/
COPY .env /app/.env

RUN pnpm i 
ENV PUBLIC_FRONTEND_HOST_APP_PORT $PUBLIC_FRONTEND_HOST_APP_PORT
# EXPOSE $PUBLIC_FRONTEND_HOST_APP_PORT
CMD ["pnpm", "run", "dev:host"]