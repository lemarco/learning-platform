import z from "zod";

const data: Record<string, string> = {};

type AnySchema = z.ZodObject<{ [k: string]: z.ZodTypeAny }, any, any>;
const validateObjectAgainstSchema = <T>(data: Record<string, string>, schema: AnySchema, logger: any) => {
  const res = schema.safeParse(data);
  if (!res.success) {
    logger.error(res.error.issues);

    process.exit();
  }
};

export const createEnvStore = (schema: AnySchema, logger: any) => {
  const names = schema.keyof()._def.values as string[];

  if (!names.length) {
    return {};
  }
  for (const name of names) {
    const variable = process.env[name];
    if (variable) {
      data[name] = variable;
    } else {
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
