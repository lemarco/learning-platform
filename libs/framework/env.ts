import { logger } from './logger';
import z from 'zod';
const data: Record<string, string> = {};

type AnySchema = z.ZodObject<{ [k: string]: z.ZodTypeAny }, any, any>;
const validateObjectAgainstSchema = <T>(
  data: Record<string, string>,
  schema: AnySchema
) => {
  const res = schema.safeParse(data);
  if (!res.success) {
    console.log(res.error.issues);
    // console.log('Env variables checking failed');
    process.exit();
  }
};

export const createEnvStore = (schema: AnySchema) => {
  const names = schema.keyof()._def.values as string[];

  if (!names.length) {
    return {};
  }
  for (const name of names) {
    const variable = process.env[name];
    if (variable) {
      data[name] = variable;
    } else {
      // logger.info(`Variable ${name} must be defined in env file.`);
      process.exit();
    }
  }

  //console.log('data = ', JSON.stringify(data, null, 4));
  validateObjectAgainstSchema(data, schema);

  // logger.info('ENV reading success');
  // logger.debug('ENV:' + JSON.stringify(data));

  return data;
};

export const getEnv = <T = string | number>(name: string) => {
  return data[name] as T;
};
