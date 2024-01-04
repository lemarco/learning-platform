FROM node:alpine as builder
RUN npm i -g pnpm 
WORKDIR /app
COPY ./frontend/package*.json /app/
VOLUME /app
RUN pnpm i 
