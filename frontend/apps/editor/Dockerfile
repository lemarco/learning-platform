FROM node:alpine as builder
RUN npm i -g pnpm 

WORKDIR /app
COPY ./frontend/libs/components/package*.json /app/libs/components/
COPY ./frontend/tailwind.config.base.js /app/tailwind.config.base.js
COPY ./frontend/apps/editor/package*.json /app/apps/editor/
COPY ./frontend/pnpm-lock.yaml /app/
COPY ./frontend/package.json /app/
COPY ./frontend/pnpm-workspace.yaml /app/
COPY .env /app/apps/editor/.env

RUN pnpm i 
ENV FRONTEND_FOOTER_APP_PORT $FRONTEND_FOOTER_APP_PORT
EXPOSE $FRONTEND_FOOTER_APP_PORT
CMD ["pnpm", "run", "editor:dev"]
