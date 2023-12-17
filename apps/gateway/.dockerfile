FROM oven/bun:latest
WORKDIR /app

COPY package.json /app
COPY .env /app/.env
COPY bun.lockb /app
COPY tsconfig.json /app/tsconfig.json
COPY apps/gateway /app/apps/gateway
COPY libs /app/libs
RUN bun i --ignore-scripts
