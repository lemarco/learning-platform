# Services:

- [Docker](https://docs.docker.com/guides/get-started/) : containering.
- [Docker-compose](https://docs.docker.com/compose/): orchestration of docker containers for development environment.
- [Nginx](https://nginx.org/en/docs/?_ga=2.52200234.268259207.1701880029-1006676728.1701880029): reverse proxy. docker container.
- [Redis](<(https://redis.io/)>) : in memory storage. docker container. Used for auth tokens storing. Will be used for caching.
- [RabbitMQ](https://www.rabbitmq.com/documentation.html): messaging on backend.
- [PostgreSQL](https://www.postgresql.org/docs/current/index.html): main tech for databases. Will be many docker instances.
-

# Repo:

- [Pnpm](<(https://pnpm.io/)>): package manager
- [Nx](<(https://nx.dev/)>): monorepo management tool
- [Prettier](<(https://prettier.io/)>): code formatting tool
- [Eslint](<(https://eslint.org/)>): code linting tool
- [Jest](https://jestjs.io/): test framework

# Technologies and Libs:

- ## Languages:
  - [Typescript](https://www.typescriptlang.org/docs/)
  - [SQL](https://www.w3schools.com/sql/)
- ## Front:
  - [React](https://react.dev/learn): library for frontend. Bundled with Vite
    - [react-router-dom](https://reactrouter.com/en/main): for client side routing
  - [Next.JS](https://nextjs.org/docs): SSR(server side rendering) React framework
- ## Comunication:
  - [Websockets](https://en.wikipedia.org/wiki/WebSocket) using '[ws](https://github.com/websockets/ws)' npm package
  - Http using native '[fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)'
- ## Backend:
  - [nodejs](https://nodejs.org/en/learn/getting-started/introduction-to-nodejs): runtime for javascript code
  - [express](https://expressjs.com/): npm package for http server defining ( maybe will be removed with native http nodejs api )
  - [amqplib](https://amqp-node.github.io/amqplib/): npm package for rabbitMQ connection/setup/requests/subscription
  - [ioredis](https://github.com/redis/ioredis): npm package for rabbitMQ connection/setup/requests/subscription
  - [dotenv](https://github.com/motdotla/dotenv#readme): npm package for reading env files
  - [googleapis](https://github.com/googleapis/google-api-nodejs-client): npm package for comunication with google OATH2 server
  - [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken): npm package for utilizing JWT tokens while auth flow. An implementation of [JSON Web Tokens](https://jwt.io/).
  - [pino](https://getpino.io/#/): npm package for logging
  - [zod](https://zod.dev/): npm package for validating json objects in runtime
