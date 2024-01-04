// TODO: implement extended errors
type HttpExceptionTypes = "Unauthorized" | "Bad Request";

export class DomainError extends Error {
  constructor(code: unknown, options = {}) {
    const hasCode = typeof code !== "object";
    const opt = hasCode ? { ...options, code } : code;
    super("Domain error", opt);
  }
}
export class HttpException extends Error {}
type InternalExceptionypes = "Connection Drop" | "DB Query fail";
export class InternalException extends Error {}

export const isError = (err: unknown) => err?.constructor?.name?.includes("Error") || false;
