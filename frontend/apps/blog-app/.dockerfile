FROM oven/bun:slim
WORKDIR /app
COPY . /app/
# RUN mkdir -p src/front-apps src/front-libs src/shared-libs src/server-apps src/server-libs

# COPY src/front-apps/blog-app/package.json /app/src/front-apps/blog-app/
# COPY src/front-libs/styling-config/package.json /app/src/front-libs/styling-config/
VOLUME /app

# RUN bun i sharp
RUN bun i 
