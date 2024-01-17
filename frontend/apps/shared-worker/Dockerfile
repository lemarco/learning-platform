FROM oven/bun:slim







WORKDIR /app
COPY ./frontend/apps/shared-worker/package*.json /app/apps/shared-worker/



WORKDIR /app/apps/shared-worker/
COPY .env /app/apps/shared-worker/.env
RUN  bun i 
ENV SHARED_WORKER_PORT $SHARED_WORKER_PORT
EXPOSE $SHARED_WORKER_PORT
CMD [ "bun", "--watch" , "./"]


