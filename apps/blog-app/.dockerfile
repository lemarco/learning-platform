FROM oven/bun:latest
WORKDIR /app
COPY package.json /app
RUN mkdir libs apps
VOLUME /app

RUN  bun i 
