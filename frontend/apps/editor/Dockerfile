FROM node:alpine as builder
RUN npm i -g pnpm 

WORKDIR /app
COPY ./frontend/apps/editor/package*.json /app/apps/editor/
COPY ./frontend/pnpm-lock.yaml /app/
COPY ./frontend/package.json /app/
COPY ./frontend/pnpm-workspace.yaml /app/
COPY .env /app/apps/editor/.env

RUN pnpm i 
ENV PUBLIC_FRONTEND_EDITOR_PORT $PUBLIC_FRONTEND_EDITOR_PORT
EXPOSE $PUBLIC_FRONTEND_EDITOR_PORT
CMD ["pnpm", "run", "editor:dev"]


