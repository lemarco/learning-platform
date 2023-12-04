import { WebSocket, WebSocketServer, Server } from 'ws';
import { Event } from '@learning-platform-monorepo/events';
import { logger } from '@learning-platform-monorepo/logger';
export type VerifyMiddleware = (info: unknown, cb: unknown) => void;
export type WSGatewayArgs = {
  port: number;
  verifyClient: VerifyMiddleware;
};
export type WSGatewayListenArgs = {
  handler: (data: unknown, connectionId: string) => void;
  connectionMessage: string;
};

type WSGateway = {
  server?: Server;
  connections: Map<string, WebSocket>;
};
const instance: WSGateway = {
  server: undefined,
  connections: new Map(),
};
const createConnectionId = () => Math.random().toString(36).substring(7);
export const createServer = ({
  port,
  verifyClient,
  handler,
  connectionMessage,
  onSetup,
}) => {
  if (instance.server) {
    return;
  }
  logger.info(`Server options : `, {
    port,
    verifyClient,
    noServer: true,
  });
  instance.server = new WebSocketServer({
    port,
    verifyClient,
  });

  instance.server.on('connection', function connection(ws: WebSocket) {
    const connectionId = createConnectionId();
    instance.connections.set(connectionId, ws);

    ws.on('message', (data) => handler(data, connectionId));
    ws.send(connectionMessage);
  });

  onSetup();
  return instance;
};
export const killServer = () => {
  instance.server.close();
};

export const pushFront = (event: Event<unknown>): WSGateway => {
  const socket = instance.connections.get(event.connectionId);
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(Buffer.from(JSON.stringify(event)));
  }
  return instance;
};
export const broadcastFront = (event: Event<unknown>): WSGateway => {
  instance.server.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(Buffer.from(JSON.stringify(event)));
    }
  });
  return instance;
};
