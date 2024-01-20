FROM oven/bun:slim
WORKDIR /app


RUN mkdir -p ./frontend/apps
RUN mkdir -p ./frontend/libs
RUN mkdir -p ./backend/apps
RUN mkdir -p ./backend/libs
COPY ./package.json /app/
COPY ./backend/libs/framework/package.json /app/backend/libs/framework/
COPY ./backend/libs/schemas/package.json /app/backend/libs/schemas/
COPY ./backend/libs/utils/package.json /app/backend/libs/utils/
COPY .env /app/backend/apps/articles-query-service/.env
COPY ./backend/apps/articles-query-service/package.json /app/backend/apps/articles-query-service/
COPY ./backend/apps/articles-query-service/tsconfig.json /app/backend/apps/articles-query-service/


RUN bun i
CMD ["bun","run","articles-query-service:dev"]