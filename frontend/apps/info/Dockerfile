FROM node:alpine as builder
RUN npm i -g pnpm 

WORKDIR /app
COPY ./frontend/apps/info/package*.json /app/apps/info/
COPY ./frontend/pnpm-lock.yaml /app/
COPY ./frontend/package.json /app/
COPY ./frontend/pnpm-workspace.yaml /app/
COPY .env /app/apps/info/.env

RUN pnpm i 
ENV PUBLIC_FRONTEND_INFO_PORT $PUBLIC_FRONTEND_INFO_PORT
EXPOSE $PUBLIC_FRONTEND_INFO_PORT
CMD ["pnpm", "run", "info:dev"]
