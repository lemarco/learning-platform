FROM oven/bun:1.0.19-slim
WORKDIR /app
COPY package.json /app
RUN mkdir libs apps
VOLUME /app

RUN bun i sharp
RUN  bun i 
