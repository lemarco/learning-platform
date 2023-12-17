FROM oven/bun:latest
WORKDIR /app

# RUN bun i -g node-gyp 
# RUN bun i sharp --ignore-scripts
COPY package.json /app
COPY . /app/
RUN bun i --unsafe-perm --ignore-scripts
# RUN bun i sharp --ignore-scripts


# COPY .env /app/.env
# COPY bun.lockb /app
# COPY tsconfig.json /app/tsconfig.json
# COPY apps/auth-command-service /app/apps/auth-command-service
# COPY libs /app/libs

