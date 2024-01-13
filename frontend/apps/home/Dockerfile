FROM node:alpine as builder
RUN npm i -g pnpm 

WORKDIR /app
COPY ./frontend/apps/home/package*.json /app/apps/home/
COPY ./frontend/pnpm-lock.yaml /app/
COPY ./frontend/package.json /app/
COPY ./frontend/pnpm-workspace.yaml /app/
COPY .env /app/apps/home/.env

RUN pnpm i 
ENV FRONTEND_HOME_APP_PORT $FRONTEND_HOME_APP_PORT
EXPOSE $FRONTEND_HOME_APP_PORT
CMD ["pnpm", "run", "home:dev"]
