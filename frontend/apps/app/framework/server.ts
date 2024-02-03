import { ServerArgs, config } from "./config";
import { RequestHandler } from "./handler";

export const Run = async (args: ServerArgs) => {
  await config(args);
  Bun.serve({
    port: 3000,
    fetch: RequestHandler,
  });
};
