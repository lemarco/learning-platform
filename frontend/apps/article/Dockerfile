FROM node:alpine as builder
RUN npm i -g pnpm 

WORKDIR /app
COPY ./frontend/apps/article/package*.json /app/apps/article/
COPY ./frontend/pnpm-lock.yaml /app/
COPY ./frontend/package.json /app/
COPY ./frontend/pnpm-workspace.yaml /app/
COPY .env /app/apps/article/.env
RUN pnpm i 

ENV FRONTEND_ARTICLE_APP_PORT $FRONTEND_ARTICLE_APP_PORT
EXPOSE $FRONTEND_ARTICLE_APP_PORT
CMD ["pnpm", "run", "article:dev"]





