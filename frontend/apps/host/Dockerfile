FROM node:alpine as builder
RUN npm i -g pnpm 

WORKDIR /app

COPY ./frontend/apps/host/package*.json /app/apps/host/
COPY ./frontend/pnpm-lock.yaml /app/
COPY ./frontend/package.json /app/
COPY ./frontend/pnpm-workspace.yaml /app/
COPY .env /app/apps/host/.env

RUN pnpm i 
ENV PUBLIC_FRONTEND_HOST_APP_PORT $PUBLIC_FRONTEND_HOST_APP_PORT
# EXPOSE $PUBLIC_FRONTEND_HOST_APP_PORT
CMD ["pnpm", "run", "host:dev"]