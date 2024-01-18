FROM node:alpine as builder
RUN npm i -g pnpm 

WORKDIR /app
COPY ./frontend/libs/components/package*.json /app/libs/components/
COPY ./frontend/apps/blog/package*.json /app/apps/blog/
COPY ./frontend/tailwind.config.base.js /app/tailwind.config.base.js
COPY ./frontend/pnpm-lock.yaml /app/
COPY ./frontend/package.json /app/
COPY ./frontend/pnpm-workspace.yaml /app/
COPY .env /app/apps/blog/.env

RUN pnpm i 
ENV FRONTEND_BLOG_APP_PORT $FRONTEND_BLOG_APP_PORT
EXPOSE $FRONTEND_BLOG_APP_PORT
CMD ["pnpm", "run", "blog:dev"]


