FROM oven/bun:slim
WORKDIR /app
COPY ./package.json /app/

VOLUME /app
RUN mkdir apps libs
# RUN bun i sharp
RUN bun i 
