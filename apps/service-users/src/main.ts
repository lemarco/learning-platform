import { createEnvStore, getEnv } from '@learning-platform-monorepo/env';
import { createServer } from 'http';

// console.log("getEnv('USERS_SERVICE_PORT')= ", getEnv('USERS_SERVICE_PORT'));
// console.log('environment = ', environment);

const httpHandler = (req, res) => {
  console.log('req.url= ' + req.url);
  res.end();
};

const bootstrap = async () => {
  createEnvStore(['USERS_SERVICE_HOST', 'USERS_SERVICE_PORT']);
  const environment = {
    host: getEnv('USERS_SERVICE_HOST'),
    port: +getEnv('USERS_SERVICE_PORT'),
  };
  const server = createServer(httpHandler);
  server.listen(environment.port);
};
bootstrap();
