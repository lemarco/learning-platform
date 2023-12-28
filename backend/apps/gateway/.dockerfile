FROM oven/bun:alpine
WORKDIR /app
COPY package.json /app
RUN mkdir -p src/front-apps src/front-libs src/shared-libs src/server-apps src/server-libs
COPY src/server-apps/gateway/package.json /app/src/server-apps/gateway/
VOLUME /app

RUN  bun i 
