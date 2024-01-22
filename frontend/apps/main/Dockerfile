FROM oven/bun:slim
WORKDIR /app


RUN mkdir -p ./frontend/apps
RUN mkdir -p ./frontend/libs
RUN mkdir -p ./backend/apps
RUN mkdir -p ./backend/libs

COPY ./frontend/tailwind.config.base.js /app/frontend/tailwind.config.base.js
COPY ./frontend/apps/main/package*.json /app/frontend/apps/main/
COPY ./frontend/apps/main/tailwind.config.ts /app/frontend/apps/main/
COPY ./frontend/apps/main/tsconfig.json /app/frontend/apps/main/
COPY ./frontend/apps/main/next.config.mjs /app/frontend/apps/main/
COPY ./frontend/apps/main/postcss.config.js /app/frontend/apps/main/



COPY ./package.json /app/





COPY .env /app/.env

RUN bun i 
ENV PUBLIC_FRONTEND_MAIN_APP_PORT $PUBLIC_FRONTEND_MAIN_APP_PORT

CMD ["bun", "run", "front:dev"]