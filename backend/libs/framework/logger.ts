import pino, { Logger as L, destination, stdTimeFunctions } from "pino";
// const fileTransport = loggerConstructor.transport({
//   target: 'pino/file',
//   options: { destination: `${__dirname}/app.log` },
// });

export const Logger = (serviceName: string) =>
  pino(
    pino.transport({
      target: "pino/file",
      options: { destination: `/app/logs/${serviceName}.log` },
    }),
  );

export type LoggerType = typeof Logger;

// destination({
//   dest: `/app/logs/${serviceName}.log`,
//   minLength: 4096,
//   sync: false
// })
// {
//   prettyPrint: {
//     colorize: true,
//     levelFirst: true,
//     translateTime: "yyyy-dd-mm, h:MM:ss TT",
//   },
// },
// pino.destination("./pino-logger.log")

//   {

//     level: 'info',
//     formatters: {
//       level: (label) => {
//         return { level: label.toUpperCase() };
//       },
//     },
//     timestamp: stdTimeFunctions.isoTime,
//   },
//   destination(`${serviceName}.log`)
// );

// export type LoggerType = typeof Logger;
// const pino = require('pino')
// const logger = pino(pino.destination({
//   dest: './my-file', // omit for stdout
//   minLength: 4096, // Buffer before writing
//   sync: false // Asynchronous logging
// }))
