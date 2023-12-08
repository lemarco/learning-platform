type EventHandler = () => void;
type RouteHandler = () => void;

type Route = [string, RouteHandler]; // path + func
export type AppSchema = {
  storage: {
    // redis expected to receive env variables names
    host: string;
    port: string;
  };
  queue: {
    connectionString; //rabbit expected to receive env variable name
  };
  database: {
    migrations: string; // expected to receive path.resolve() result on migrations folder
    schema;
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
    userAgent: boolean;
  };
  routes: {
    //expected to have global try-catch on each route  trycatch(routefunc())
    get?: Array<Route>;
    post?: Array<Route>;
    put?: Array<Route>;
    delete?: Array<Route>;
  };
  events: Record<string, EventHandler>;
  // expected to define cache mechanic for events that require results from other events
};
