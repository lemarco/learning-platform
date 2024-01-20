FROM oven/bun:slim
WORKDIR /app


RUN mkdir -p ./frontend/apps
RUN mkdir -p ./frontend/libs
RUN mkdir -p ./backend/apps
RUN mkdir -p ./backend/libs

COPY ./frontend/tailwind.config.base.js /app/frontend/tailwind.config.base.js
COPY ./frontend/apps/main/package*.json /app/frontend/apps/main/
COPY ./frontend/apps/main/tsconfig.json /app/frontend/apps/main/
COPY ./frontend/apps/main/vite.config.ts /app/frontend/apps/main/
COPY ./frontend/apps/main/tailwind.config.js /app/frontend/apps/main/
COPY ./frontend/apps/main/postcss.config.cjs /app/frontend/apps/main/



COPY ./package.json /app/




# components lib staff
COPY ./frontend/libs/components/package.json /app/frontend/libs/components/
COPY ./frontend/libs/components/tsconfig.json /app/frontend/libs/components/
COPY ./frontend/libs/components/vite.config.ts /app/frontend/libs/components/
COPY ./frontend/libs/components/tailwind.config.js /app/frontend/libs/components/
COPY ./frontend/libs/components/postcss.config.cjs /app/frontend/libs/components/

COPY .env /app/.env

RUN bun i 
ENV PUBLIC_FRONTEND_MAIN_APP_PORT $PUBLIC_FRONTEND_MAIN_APP_PORT

CMD ["bun", "run", "front-with-components:dev"]
