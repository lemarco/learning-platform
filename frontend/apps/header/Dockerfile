FROM node:alpine as builder
RUN npm i -g pnpm 

WORKDIR /app
COPY ./frontend/apps/header/package*.json /app/apps/header/
COPY ./frontend/libs/modal/package*.json /app/libs/modal/
COPY ./frontend/libs/icons/package*.json /app/libs/icons/
COPY ./frontend/pnpm-lock.yaml /app/
COPY ./frontend/package.json /app/
COPY ./frontend/pnpm-workspace.yaml /app/
COPY .env /app/apps/header/.env

RUN pnpm i 
ENV FRONTEND_HEADER_APP_PORT $FRONTEND_HEADER_APP_PORT
EXPOSE $FRONTEND_HEADER_APP_PORT
CMD ["pnpm", "run", "header:dev"]
