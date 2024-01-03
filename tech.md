
# Infra:
- [Docker](https://docs.docker.com/guides/get-started/) : containering.
- [Docker-compose](https://docs.docker.com/compose/): orchestration of docker containers for development environment.

# Services:
- [Nginx](https://nginx.org/en/docs/?_ga=2.52200234.268259207.1701880029-1006676728.1701880029): reverse proxy. docker container.
- [Redis](<(https://redis.io/)>) : in memory storage. docker container. Used for auth tokens storing. Will be used for caching.
- [Kafka](https://kafka.apache.org/): messaging on backend.
- [PostgreSQL](https://www.postgresql.org/docs/current/index.html): main tech for databases. Will be many docker instances.
- [Filebeat](https://www.elastic.co/beats/filebeat) Lightweight shipper for logs
- [Elasticsearch](https://www.elastic.co/elasticsearch) Elasticsearch is a distributed, RESTful search and analytics engine. Used as logs store.
- [Kibana](https://www.elastic.co/kibana) Frontend for elasticsearch
- [Metricbeat](https://www.elastic.co/beats/metricbeat) Lightweight shipper for metrics

# Repo:

- [Pnpm](<(https://pnpm.io/)>): package manager
- [Nx](<(https://nx.dev/)>): monorepo management tool(frontend)
- [Bun](https://bun.sh/docs/install/workspaces) monorepo management tool(backend)
- [Prettier](<(https://prettier.io/)>): code formatting tool
- [Eslint](<(https://eslint.org/)>): code linting tool

# Technologies and Libs:

- ## Languages:
  - [Typescript](https://www.typescriptlang.org/docs/)
  - [SQL](https://www.w3schools.com/sql/)
- ## Front:
  - [Qwik](https://qwik.builder.io/tutorial/welcome/overview/): library for frontend. Bundled with [Vite](https://vitejs.dev/)

- ## Comunication:
  - [Websockets](https://en.wikipedia.org/wiki/WebSocket) using '[ws](https://github.com/websockets/ws)' npm package
  - [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)'
  
- ## Backend:

  - [bun](bun.sh): runtime for javascript code
  - [elysiajs](https://elysiajs.com/): npm package for http + ws server defining 
  - [kafkajs](https://kafka.js.org/): npm package for kafka connection/setup/requests/subscription
  - [ioredis](https://github.com/redis/ioredis): npm package for redis connection/setup/requests/subscription
  - [dotenv](https://github.com/motdotla/dotenv#readme): npm package for reading env files
  - [googleapis](https://github.com/googleapis/google-api-nodejs-client): npm package for comunication with google OATH2 server
  - [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken): npm package for utilizing JWT tokens while auth flow. An implementation of [JSON Web Tokens](https://jwt.io/).
  - [pino](https://getpino.io/#/): npm package for logging
  - [zod](https://zod.dev/): npm package for validating json objects in runtime
