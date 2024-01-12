FROM node:alpine as builder
RUN npm i -g pnpm 

WORKDIR /app
COPY ./frontend/package*.json /app/
COPY .env /app/.env

RUN pnpm i 
ENV PUBLIC_FRONTEND_INFO_PORT $PUBLIC_FRONTEND_INFO_PORT
EXPOSE $FRONTEND_HOME_APP_PORT
CMD ["pnpm", "run", "dev:editor"]
