FROM node:alpine as builder
RUN npm i -g pnpm 

WORKDIR /app
COPY ./frontend/libs/components/package*.json /app/libs/components/
COPY ./frontend/tailwind.config.base.js /app/tailwind.config.base.js
COPY ./frontend/pnpm-lock.yaml /app/
COPY ./frontend/package.json /app/
COPY ./frontend/pnpm-workspace.yaml /app/




RUN pnpm i 


CMD ["pnpm", "run", "components:dev"]





