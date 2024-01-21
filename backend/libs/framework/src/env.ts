import z from "zod";
import type { UnknownKeysParam, ZodTypeAny } from "zod";
import type { L } from "./logger";
const data: Record<string, string> = {};

type AnySchema = z.ZodObject<{ [k: string]: z.ZodTypeAny }, UnknownKeysParam, ZodTypeAny>;
const validateObjectAgainstSchema = <T>(data: Record<string, string>, schema: AnySchema, logger: L) => {
  const res = schema.safeParse(data);
  if (!res.success) {
    logger.error(res.error.issues);
    console.log(res.error.issues);
    process.exit();
  }
};

export const createEnvStore = (schema: AnySchema, logger: L) => {
  const names = schema.keyof()._def.values as string[];

  if (!names.length) {
    return {};
  }

  for (const name of names) {
    const variable = process.env[name];
    if (variable) {
      data[name] = variable;
    } else {
      console.error(`Variable ${name} must be defined in env file.`);
      logger.error(`Variable ${name} must be defined in env file.`);
      process.exit();
    }
  }

  validateObjectAgainstSchema(data, schema, logger);

  return data;
};

export const getEnv = <T = string | number>(name: string) => {
  return data[name] as T;
};
