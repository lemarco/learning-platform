import { toUpperCamel } from "./strings";

export const jsonParse = (buffer: Buffer) => {
  if (buffer.length === 0) return null;
  try {
    return JSON.parse(buffer.toString());
  } catch {
    return null;
  }
};

export const toBuffer = (obj: Record<string, unknown>): Buffer => {
  return Buffer.from(JSON.stringify(obj));
};
export const isHashObject = (o: unknown) => typeof o === "object" && o !== null && !Array.isArray(o);

export const flatObject = (source: Record<string, unknown>, fields: string[] = []) => {
  const target: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(source)) {
    if (!isHashObject(value)) {
      target[key] = value;
      continue;
    }
    if (fields.length > 0 && !fields.includes(key)) {
      target[key] = { ...(value as Record<string, unknown>) };
      continue;
    }
    //@ts-ignore
    for (const [childKey, childValue] of Object.entries(value)) {
      const combined = `${key}${toUpperCamel(childKey)}`;
      if (source[combined] !== undefined) {
        const error = `Can not combine keys: key "${combined}" already exists`;
        throw new Error(error);
      }
      target[combined] = childValue;
    }
  }
  return target;
};

export const unflatObject = (source: Record<string, unknown>, fields: string[]) => {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(source)) {
    const prefix = fields.find((name) => key.startsWith(name));
    if (prefix) {
      if (Object.prototype.hasOwnProperty.call(source, prefix)) {
        throw new Error(`Can not combine keys: key "${prefix}" already exists`);
      }
      const newKey = key.substring(prefix.length).toLowerCase();
      const section = result[prefix];
      //@ts-ignore
      if (section) section[newKey] = value;
      else result[prefix] = { [newKey]: value };
      continue;
    }
    result[key] = value;
  }
  return result;
};
export const projection = (source: Record<string, unknown>, fields: string[]) => {
  const entries = [];
  for (const key of fields) {
    if (Object.hasOwn(source, key)) {
      const value = source[key];
      entries.push([key, value]);
    }
  }
  return Object.fromEntries(entries);
};
