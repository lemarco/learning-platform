FROM oven/bun:latest
WORKDIR /app

COPY package.json /app
COPY .env /app/.env
COPY bun.lockb /app
COPY tsconfig.json /app/tsconfig.json
COPY apps/auth-query-service /app/apps/auth-query-service
COPY libs /app/libs
RUN bun i --ignore-scripts
