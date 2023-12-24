// TODO: implement extended errors

type HttpExceptionTypes = "Unauthorized" | "Bad Request";

export class DomainError extends Error {
  constructor(code: any, options = {}) {
    const hasCode = typeof code !== "object";
    const opt = hasCode ? { ...options, code } : code;
    super("Domain error", opt);
  }
}
export class HttpException extends Error {
  constructor(type: HttpExceptionTypes) {
    super(type);
  }
}
type InternalExceptionypes = "Connection Drop" | "DB Query fail";
export class InternalException extends Error {
  constructor(type: InternalExceptionypes) {
    super(type);
  }
}

export const isError = (err: unknown) => err?.constructor?.name?.includes("Error") || false;
