FROM node:alpine as builder
RUN npm i -g pnpm nx
# ENV PNPM_HOME="/pnpm"
# ENV PATH="$PNPM_HOME:$PATH"
# RUN corepack enable



WORKDIR /app
COPY ./frontend/package*.json /app/
# COPY ./env /app/.env

# RUN mkdir -p src/front-apps src/front-libs src/shared-libs src/server-apps src/server-libs

# COPY src/front-apps/blog-app/package.json /app/src/front-apps/blog-app/
# COPY src/front-libs/styling-config/package.json /app/src/front-libs/styling-config/
VOLUME /app

# RUN bun i sharp
RUN pnpm i 

# COPY . /app
# WORKDIR /app


# WORKDIR /app/builder
# COPY . .
# RUN npm i --legacy-peer-deps

# FROM base AS prod-deps
# RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

# FROM base AS build
# RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
# RUN pnpm run build

# FROM base
# COPY --from=prod-deps /app/node_modules /app/node_modules
# COPY --from=build /app/dist /app/dist
# EXPOSE 8000
# CMD [ "pnpm", "start" ]