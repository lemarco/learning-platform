import pino from "pino";

export const Logger = (serviceName: string) =>
  pino(
    pino.transport({
      target: "pino/file",
      options: { destination: `/app/logs/${serviceName}.log` },
    }),
  );

export type L = {
  error: (arg: unknown) => void;
  info: (arg: unknown) => void;
  debug: (arg: unknown) => void;
};
