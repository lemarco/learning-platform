type EventHandler = () => void;
type RouteHandler = () => void;

type Route = [string, RouteHandler]; // path + func
export type RoutingSchema = {
  storage: {
    // redis expected to receive env variables names
    host: string;
    port: string;
  };
  queue: {
    connectionString; //rabbit expected to receive env variable name
  };
  database: {
    migrations: string; // expected to receive path.resolve() result
    credentias: {
      // expected to receive env variables names
      host: string;
      port: string;
      password: string;
      name: string;
    };
  };

  server: {
    // expected to receive env variables names
    port: string;
    host: string;
  };
  routes: {
    get?: Array<Route>;
    post?: Array<Route>;
    put?: Array<Route>;
    delete?: Array<Route>;
  };
  events: Record<string, EventHandler>;
};
