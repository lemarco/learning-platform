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
COPY .env /app/backend/apps/auth-events-service/.env
COPY ./backend/apps/auth-events-service/package.json /app/backend/apps/auth-events-service/
COPY ./backend/apps/auth-events-service/tsconfig.json /app/backend/apps/auth-events-service/


RUN bun i

CMD ["bun","run","auth-events-service:dev"]