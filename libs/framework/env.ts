import { logger } from './logger';
import z from 'zod';
const data: Record<string, string> = {};

type AnySchema = z.ZodObject<{ [k: string]: z.ZodTypeAny }, any, any>;
const validateObjectAgainstSchema = <T>(
  data: Record<string, string>,
  schema: AnySchema
): boolean => {
  try {
    schema.parse(data);

    return true;
  } catch (error: any) {
    logger.error('Validation failed:', JSON.stringify(error));
    return false;
  }
};

export const createEnvStore = (schema: AnySchema) => {
  const names = schema.keyof()._def.values as string[];

  if (!names.length || Object.keys(data).length) {
    return {};
  }

  names.forEach((name: string) => {
    const variable = process.env[name];
    if (variable) {
      data[name] = variable;
    } else {
      throw new Error(`Variable ${name} must be defined in env file.`);
    }
  });
  console.log('data = ', JSON.stringify(data, null, 4));
  if (!validateObjectAgainstSchema(data, schema)) {
    throw new Error(`Env variables formats failed`);
  }
  logger.info('ENV reading success');
  logger.debug('ENV:' + JSON.stringify(data));

  return data;
};

export const getEnv = <T = string | number>(name: string) => {
  return data[name] as T;
};
