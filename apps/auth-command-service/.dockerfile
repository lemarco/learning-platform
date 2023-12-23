FROM oven/bun:1.0-alpine
WORKDIR /app
COPY package.json /app
RUN mkdir libs apps
VOLUME /app
WORKDIR /app
RUN  bun i 